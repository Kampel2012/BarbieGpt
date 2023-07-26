import { useEffect } from 'react';
/* import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';
import { useContext } from 'react'; */
import { getGptResponse, sendAudioFile } from '../../api/apiOpenAI';
import DownloadTextFile from '../DownloadTextFile';
import { useState } from 'react';
import styles from './DialogGPT.module.css';
import trash from '../../assets/icon/trash.svg';
import MessageGPT from './MessageGPT';
import TextInputGPT from './TextInputGPT';
import VoiceInputGPT from './VoiceInputGPT';
import EmptyDialogMessage from './EmptyDialogMessage';
import { useNavigate, useParams } from 'react-router-dom';

const DialogGPT = () => {
  const params = useParams();

  //TODO делаем запрос на сервер и получаем ответ data => {name: string, messages: []}

  let mediaRecorder;
  let audioChunks = [];
  const [messages, setMessages] = useState([]);
  /*   const dictionary = getDictionary();
  const language = useContext(LanguageContext); */
  const scrollStyle = styles.scrollbar;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('chats') !== null &&
      setMessages(
        JSON.parse(localStorage.getItem('chats')).find(
          (i) => i.id === parseInt(params.chatId)
        ).messages
      );
  }, [params]);

  function startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true }) // Запрашиваем доступ к микрофону
      .then(function (stream) {
        mediaRecorder = new MediaRecorder(stream); // Создаем объект MediaRecorder для записи аудио
        mediaRecorder.start(); // Начинаем запись

        mediaRecorder.addEventListener('dataavailable', function (e) {
          audioChunks.push(e.data); // Сохраняем части аудио в массив
        });
      })
      .catch(function (err) {
        console.error('Ошибка доступа к микрофону:', err);
      });
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop(); // Останавливаем запись

      mediaRecorder.addEventListener('stop', async function () {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' }); // Создаем Blob из массива аудио частей
        audioChunks = [];

        setIsLoading(true);
        const transcriptionFromOpenAi = await sendAudioFile(audioBlob); // Отправляем аудиофайл на сервер OpenAI
        console.log('Текст транскрипции:', transcriptionFromOpenAi);
        await askGPT(transcriptionFromOpenAi);
      });
    }
  }

  async function askGPT(promptText) {
    try {
      const newMessages = [
        {
          role: 'user',
          content: promptText,
        },
      ];
      const gptResponse = await getGptResponse([...messages, ...newMessages]);
      console.log('Ответ от GPT:', gptResponse);
      newMessages.push({ role: 'assistant', content: gptResponse });
      localStorage.setItem(
        'chats',
        JSON.stringify(
          JSON.parse(localStorage.getItem('chats')).map((item) =>
            item.id === parseInt(params.chatId)
              ? { ...item, messages: [...messages, ...newMessages] }
              : item
          )
        )
      );
      setMessages((prev) => [...prev, ...newMessages]);
      return gptResponse;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function clearStory() {
    console.log('Чистка истории сообщений');
    setMessages([]);
    navigate('/main');
    localStorage.setItem(
      'chats',
      JSON.stringify(
        JSON.parse(localStorage.getItem('chats')).filter(
          (i) => i.id !== parseInt(params.chatId)
        )
      )
    );
  }

  return (
    <div className="flex-grow bg-white py-6 px-8 ">
      <div className="border-b border-secondary border-opacity-30 flex justify-between px-6 py-4">
        <h2 className="text-2xl font-semibold">Лекции по матану</h2>
        <button type="button" onClick={clearStory}>
          <img src={trash} alt="Очистить историю сообщений" />
        </button>
      </div>

      <div
        className={`pt-6 mb-4 h-[calc(100vh-120px-68px)] overflow-y-auto ${scrollStyle}`}
      >
        <div className="h-full">
          {messages.length > 0 ? (
            messages.map((item, i) => <MessageGPT key={i} item={item} />)
          ) : (
            <EmptyDialogMessage />
          )}
          {isLoading && (
            <MessageGPT
              item={{
                role: 'assistant',
                content: 'Chatty AI обрабатывает запрос...',
              }}
            />
          )}
        </div>
      </div>

      <div className="flex items-center">
        <TextInputGPT />
        <VoiceInputGPT
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
        <DownloadTextFile messages={messages} />
      </div>
    </div>
  );
};

export default DialogGPT;

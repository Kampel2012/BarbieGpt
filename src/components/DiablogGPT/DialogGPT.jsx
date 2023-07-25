import { useEffect } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';
import { useContext } from 'react';
import { getGptResponse, sendAudioFile } from '../../api/apiOpenAI';
import DownloadTextFile from '../DownloadTextFile';
import { useState } from 'react';
import styles from './DialogGPT.module.css';

import MessageGPT from './MessageGPT';

const DialogGPT = () => {
  let mediaRecorder;
  let audioChunks = [];
  const [messages, setMessages] = useState([]);
  const dictionary = getDictionary();
  const language = useContext(LanguageContext);
  const scrollStyle = styles.scrollbar;

  useEffect(() => {
    localStorage.getItem('sessionGPT') !== null &&
      setMessages(JSON.parse(localStorage.getItem('sessionGPT')));
  }, []);

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

        const transcriptionFromOpenAi = await sendAudioFile(audioBlob); // Отправляем аудиофайл на сервер OpenAI
        console.log('Текст транскрипции:', transcriptionFromOpenAi);
        return transcriptionFromOpenAi;
      });
    }
  }

  async function onStopHandler() {
    const promptText = stopRecording();
    const newMessages = [
      {
        role: 'user',
        content: promptText,
      },
    ];
    const gptResponse = await askGPT(promptText);
    newMessages.push({ role: 'assistant', content: gptResponse });
    localStorage.setItem(
      'sessionGPT',
      JSON.stringify([...messages, ...newMessages])
    );
    setMessages((prev) => [...prev, ...newMessages]);
  }

  async function askGPT(newMessages) {
    try {
      const gptResponse = await getGptResponse([...messages, ...newMessages]);
      console.log('Ответ от GPT:', gptResponse);
      return gptResponse;
    } catch (error) {
      console.log(error);
    }
  }

  function clearStory() {
    console.log('Чистка истории сообщений');
    setMessages([]);
    localStorage.removeItem('sessionGPT');
  }

  return (
    <div className="flex-grow bg-white py-6 px-8 ">
      <div className="border-b border-secondary border-opacity-30">
        <h2 className="text-2xl font-semibold pl-6 py-4">Лекции по матану</h2>
      </div>

      <div
        className={`py-6 h-[calc(100vh-120px-68px)] overflow-y-auto ${scrollStyle}`}
      >
        <div>
          {messages?.map((item, i) => (
            <MessageGPT key={i} item={item} />
          ))}
        </div>
      </div>

      <div className="gap-5 px-8 py-4 border text-white font-semibold mt-4 container mx-auto bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="flex flex-wrap gap-5">
          <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={onStopHandler}
            className="hover:text-red-300"
          >
            {dictionary.btnStart[language] || 'Запись голоса'}
          </button>
          <button type="button" onClick={clearStory}>
            {dictionary.btnReset[language] || 'Очистить историю'}
          </button>
          <DownloadTextFile messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default DialogGPT;

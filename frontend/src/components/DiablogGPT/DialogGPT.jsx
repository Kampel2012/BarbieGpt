import { useEffect } from 'react';
import { getGptResponse, sendAudioFile } from '../../api/apiOpenAI';
import DownloadTextFile from '../DownloadTextFile';
import { useState } from 'react';
import styles from './DialogGPT.module.css';
import trash from '../../assets/icon/trash.svg';
import MessageGPT from './MessageGPT';
import TextInputGPT from './TextInputGPT';
import VoiceInputGPT from './VoiceInputGPT';
import EmptyDialogMessage from './EmptyDialogMessage';
import { useOutletContext, useParams } from 'react-router-dom';
import api from '../../api/api';
import { setCurrentChat } from '../../redux/slices/chatSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const DialogGPT = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const scrollStyle = styles.scrollbar;
  const deleteChat = useOutletContext();
  const { title } = useSelector((state) => state.chat.currentChat);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const chat = await api.getChatById(chatId);
      setMessages(chat.messages);
      dispatch(setCurrentChat(chat));
    })();
  }, [chatId, dispatch]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setIsBusy(true);
      recorder.addEventListener('dataavailable', handleDataAvailable);
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Ошибка доступа к микрофону:', err);
    }
  }

  useEffect(() => {
    (async () => {
      if (isBusy) return;
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const transcriptionFromOpenAi = await processAudioBlob(audioBlob);
      await askGPT(transcriptionFromOpenAi);
    })();
    // * Другие зависимости, предлагаемые линтом, не нужны и сломают работу приложения
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBusy]);

  function handleDataAvailable(e) {
    setAudioChunks((prevChunks) => [...prevChunks, e.data]);
    setIsBusy(false);
  }

  async function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }

  async function processAudioBlob(audioBlob) {
    if (audioBlob.size <= 10000) return;
    setIsLoading(true);
    const transcriptionFromOpenAi = await sendAudioFile(audioBlob);
    console.log('Текст транскрипции:', transcriptionFromOpenAi);
    setAudioChunks([]);
    setIsLoading(false);
    return transcriptionFromOpenAi;
  }

  async function askGPT(promptText) {
    if (!promptText) return;
    try {
      setIsLoading(true);
      const newMessages = [
        {
          role: 'user',
          content: promptText,
        },
      ];
      const gptResponse = await getGptResponse([...messages, ...newMessages]);
      console.log('Ответ от GPT:', gptResponse);
      newMessages.push({ role: 'assistant', content: gptResponse });
      const resUpdateChat = await api.updateChat({
        id: chatId,
        messages: [...messages, ...newMessages],
      });
      setMessages(resUpdateChat.messages);
      return gptResponse;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const messageLoading = (
    <MessageGPT
      item={{
        role: 'assistant',
        content: 'Chatty AI обрабатывает запрос...',
      }}
    />
  );

  return (
    <div className="flex-grow bg-white py-6 px-8">
      <div className="border-b border-secondary border-opacity-30 flex justify-between px-6 py-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <button type="button" onClick={() => deleteChat(chatId)}>
          <img src={trash} alt="Очистить историю сообщений" />
        </button>
      </div>

      <div
        className={`pt-6 mb-4 h-[calc(100vh-120px-68px)] overflow-y-auto ${scrollStyle}`}
      >
        <div className="h-full">
          {messages.length > 0 ? (
            messages.map((item, i) => <MessageGPT key={i} item={item} />)
          ) : isLoading ? (
            messageLoading
          ) : (
            <EmptyDialogMessage />
          )}
          {messages.length > 0 && isLoading && messageLoading}
        </div>
      </div>

      <div className="flex items-center">
        <TextInputGPT
          isLoading={isLoading}
          askGPT={askGPT}
          sendAudioFile={sendAudioFile}
        />

        <VoiceInputGPT
          startRecording={startRecording}
          stopRecording={stopRecording}
          isLoading={isLoading}
          isRecording={isRecording}
        />

        <DownloadTextFile messages={messages} />
      </div>
    </div>
  );
};

export default DialogGPT;

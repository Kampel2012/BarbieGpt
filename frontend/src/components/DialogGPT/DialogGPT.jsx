import { useEffect, useContext, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getModsGpt } from '../../utils/workingMods';
import { LanguageContext } from '../../context/LanguageContext';
import ErrorPopup from '../Popups/ErrorPopup';

const DialogGPT = () => {
  const { language } = useContext(LanguageContext);
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const scrollStyle = styles.scrollbar;
  const deleteChat = useOutletContext();
  const { title, mod } = useSelector((state) => state.chat.currentChat);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [showErrorPopup, setshowErrorPopup] = useState(false);
  const messagesEndRef = useRef(null);
  const mods = getModsGpt();

  useEffect(() => {
    (async () => {
      const chat = await api.getChatById(chatId);
      setMessages(chat.messages);
      dispatch(setCurrentChat(chat));
    })();
  }, [chatId, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      alert('Ошибка доступа к микрофону:', err);
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
    try {
      if (audioBlob.size <= 10000) return;
      setIsLoading(true);
      const transcriptionFromOpenAi = await sendAudioFile(audioBlob);
      console.log('Текст транскрипции:', transcriptionFromOpenAi);
      setAudioChunks([]);
      setIsLoading(false);
      return transcriptionFromOpenAi;
    } catch (error) {
      setshowErrorPopup(true);
    }
  }

  async function askGPT(promptText) {
    if (!promptText) return;

    try {
      if (messages.length <= 0)
        promptText =
          mods.find((item) => item.id === mod).request[language] + promptText;
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
      setshowErrorPopup(true);
    } finally {
      setIsLoading(false);
    }
  }

  const messageLoading = (
    <MessageGPT
      role={'assistant'}
      content={'Chatty AI обрабатывает запрос...'}
    />
  );

  const messageElems =
    messages.length > 0 ? (
      messages.map((item, i) => {
        if (i === 0 && mod !== 1) {
          const reg = new RegExp(
            mods.find((item) => item.id === mod).request[language]
          );
          let shadowContent = item.content.replace(reg, '');
          return (
            <MessageGPT key={i} role={item.role} content={shadowContent} />
          );
        }
        return <MessageGPT key={i} role={item.role} content={item.content} />;
      })
    ) : isLoading ? (
      messageLoading
    ) : (
      <EmptyDialogMessage />
    );

  return (
    <div className="flex-grow bg-white py-6 px-8">
      <div className="border-b border-secondary border-opacity-30 flex justify-between px-6 py-4">
        <h2 className="text-2xl font-semibold max-w-lg overflow-clip">
          {title}
        </h2>
        <button
          type="button"
          onClick={() => deleteChat(chatId)}
          className="hover:opacity-70"
        >
          <img src={trash} alt="Очистить историю сообщений" />
        </button>
      </div>

      <div
        className={`pt-6 mb-4 h-[calc(100vh-120px-68px)] overflow-y-auto ${scrollStyle}`}
      >
        <div className="h-full">
          {messageElems}
          {messages.length > 0 && isLoading && messageLoading}
          <div ref={messagesEndRef} />
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
      <ErrorPopup
        show={showErrorPopup}
        onClose={() => setshowErrorPopup(false)}
      />
    </div>
  );
};

export default DialogGPT;

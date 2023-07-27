import { useContext, useEffect, useState } from 'react';
import { sendAudioFile, getGptResponse } from '../api/apiOpenAI';
import { LanguageContext } from '../context/LanguageContext';
import { getDictionary } from '../utils/dictionary';
import DownloadTextFile from './DownloadTextFile';
import ReminderComponent from './ReminderComponent';

//! Компонент не задействован / оставлен как образец, удалю позже
// ? 1) вынести функционал запроса в API отдельно +++
// TODO 2) попробовать авторизовать пользователя через google id и сохранить полученный id в localStorage
// TODO 3) если получилось, то попробовать обратиться к гугл календарю и запланировать встречу(к гугл чему-то) / кнопка войти и выйти
// TODO 4) вставить тектовое поле (инпут) и привязать сабмит к запросу GPT и остальному функционалу(записать в messages, localStorage)
// TODO 5) сохранить всю историю в localStorage, но с ограничением в максимум 20 сообщений(когда приходит новое удаляется самое старое)
// TODO 6) Добавить режимы чтобы вместо запроса к GPT добавлял тудушку/устанавливает будильник, встречу и т.д.
// * 7) backend + tests в процессе Полина
// ? 8) Сделать мультиязычность RU/ENG может быть другие языки +++
// TODO 9) Светлая/темная тема ?
// TODO !! Сделать несколько вкладок с чатами.
// ? сделать выгрузку текстового файла с переводом ++
// TODO сделать 4-й режим где надо будет просто вернуть текст
// * уведомления - в процессе Тоша

const MainPage = () => {
  let mediaRecorder;
  let audioChunks = [];
  const [messages, setMessages] = useState([]);
  const language = useContext(LanguageContext);
  const dictionary = getDictionary();

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
        askGPT(transcriptionFromOpenAi);
      });
    }
  }

  async function askGPT(promptText) {
    const newMessages = [
      {
        role: 'user',
        content: promptText,
      },
    ];
    const gptResponse = await getGptResponse([...messages, ...newMessages]);
    newMessages.push({ role: 'assistant', content: gptResponse });
    localStorage.setItem(
      'sessionGPT',
      JSON.stringify([...messages, ...newMessages])
    );
    setMessages((prev) => [...prev, ...newMessages]);
    console.log('Ответ от GPT:', gptResponse);
  }

  function clearStory() {
    console.log('Чистка истории сообщений');
    setMessages([]);
    localStorage.removeItem('sessionGPT');
  }

  return (
    <div className="gap-5 px-8 py-4 border text-white font-semibold mt-4 container mx-auto bg-gradient-to-r from-blue-500 to-cyan-500">
      <div className="flex flex-wrap gap-5">
        <button
          type="button"
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          className="hover:text-red-300"
        >
          {dictionary.btnStart[language] || 'Запись голоса'}
        </button>
        <button type="button" onClick={clearStory}>
          {dictionary.btnReset[language] || 'Очистить историю'}
        </button>
        <DownloadTextFile messages={messages} />
      </div>
      <div>
        {messages?.map((item, i) => (
          <div key={i}>
            <p className="text-zinc-950">{item.role}</p>
            <p className="text-gray-200 max-w-md px-2">{item.content}</p>
          </div>
        ))}
      </div>
      <ReminderComponent />
    </div>
  );
};

export default MainPage;

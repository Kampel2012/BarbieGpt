import { useContext, useState } from 'react';
import mic from '../../assets/icon/mic.svg';
import plus from '../../assets/icon/plus.svg';
import Notification from './Notification';
import styles from './NotificationsList.module.css';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';
import { sendAudioFile, getGptResponse } from '../../api/apiOpenAI';
import { makeNotification } from '../../utils/notifications';

const NotificationsList = () => {
  const scrollStyle = styles.scrollbar;
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  const [notifications, setNotifications] = useState([]);

  const notificationsElems =
    notifications.length > 0 ? (
      notifications.map((item, i) => (
        <Notification key={i} text={item.text} time={item.time} />
      ))
    ) : (
      <div className="text-center flex flex-col grow justify-center">
        <h3 className="text-base font-semibold">
          {dictionary.noNotesTxt[language]}
        </h3>
      </div>
    );

  function createTextNotification() {
    const text = prompt('Введите текст уведомления');
    if (text <= 0) return;
    const time = parseInt(prompt('Введите количество секунд до уведомления'));
    if (time <= 0) return;
    makeNotification(text, +time * 1000);
    setNotifications((prev) => [...prev, { text, time }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((item) => item.text !== text));
    }, +time * 1000);
  }

  let mediaRecorder;
  let audioChunks = [];

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
        const gptResponse = await askGPT(
          `Преобразуй запрос в вид: Text: описание кратко, Time:  число в миллисекундах. ${transcriptionFromOpenAi}`
        );
        let params = gptResponse.split('Time');
        params = params.length > 1 ? params : params.split('\nTime');
        if (params.length <= 1) {
          console.warn('Ошибка неверный ответ от GPT'); //? сделать алерт?
          return;
        }
        params = params.map((item, i) => {
          if (i === 1) {
            const time = item.replace(': ', '');
            return parseInt(time);
          }
          return item.replace('Text: ', '');
        });
        const [text, time] = params;
        makeNotification(text, time);
        setNotifications((prev) => [...prev, { text, time: time / 1000 }]);
        setTimeout(() => {
          setNotifications((prev) => prev.filter((item) => item.text !== text));
        }, time);
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
    const gptResponse = await getGptResponse([...newMessages]);
    console.log('Ответ от GPT:', gptResponse);
    return gptResponse;
  }

  return (
    <div className="min-w-min border-l-2 border-secondary border-opacity-30 bg-white pt-4 px-6 ">
      <div className={`w-64 `}>
        <div className="flex justify-between mb-6 items-center">
          <h2 className="font-semibold text-2xl">
            {dictionary.notesTitle[language]}
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
            >
              <img src={mic} alt="Голосовой ввод"></img>
            </button>
            <button type="button" onClick={createTextNotification}>
              <img src={plus} alt="Текстовое добавление заметки"></img>
            </button>
          </div>
        </div>
        <div
          className={`flex flex-col gap-4 h-[calc(100vh-32px-32px-32px)] overflow-y-auto ${scrollStyle}`}
        >
          {notificationsElems}
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;

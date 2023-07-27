import { useContext, useEffect, useState } from 'react';
import { sendAudioFile, getGptResponse } from '../api/apiOpenAI';
import { getDictionary } from '../utils/dictionary';
import { LanguageContext } from '../context/LanguageContext';
import { makeNotification } from '../utils/notifications';

//! Компонент не задействован / оставлен как образец, удалю позже
function TabGPT() {
  let mediaRecorder;
  let audioChunks = [];
  const [messages, setMessages] = useState([]);
  const dictionary = getDictionary();
  const language = useContext(LanguageContext);

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
        // const gptResponse = await askGPT(transcriptionFromOpenAi);
        const gptResponse = await askGPT(
          `Преобразуй запрос в вид: Text: описание кратко, Time:  число в миллисекундах. ${transcriptionFromOpenAi}`
        );
        let a = gptResponse.split('Time');
        a = a.length > 1 ? a : a.split('\nTime');
        if (a.length <= 1) {
          console.warn('Ошибка неверный ответ от GPT'); //! сделать тут ошибку
          return;
        }
        a = a.map((item, i) => {
          if (i === 1) {
            const b = item.replace(': ', '');
            return parseInt(b);
          }
          return item.replace('Text: ', '');
        });
        console.log(a);
        makeNotification(a[0], a[1]);
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
    return gptResponse;
  }

  function clearStory() {
    console.log('Чистка истории сообщений');
    setMessages([]);
    localStorage.removeItem('sessionGPT');
  }

  return (
    <div>
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
        </div>
        <div>
          {messages?.map((item, i) => (
            <div key={i}>
              <p className="text-zinc-950">{item.role}</p>
              <p className="text-gray-200 max-w-md px-2">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabGPT;

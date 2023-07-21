import { useEffect, useState } from 'react';
import key from '../../../key';

// TODO 1) вынести функционал запроса в API отдельно
// TODO 2) попробовать авторизовать пользователя через google id и сохранить полученный id в localStorage
// TODO 3) если получилось, то попробовать обратиться к гугл календарю и запланировать встречу(к гугл чему-то) / кнопка войти и выйти
// TODO 4) вставить тектовое поле (инпут) и привязать сабмит к запросу GPT и остальному функционалу(записать в messages, localStorage)
// TODO 5) сохранить всю историю в localStorage, но с ограничением в максимум 20 сообщений(когда приходит новое удаляется самое старое)
// TODO 6) на 75 строке(красное) сделать проверку на команды, например (Установи, Напомни еще... ) то вместо запроса к GPT
// TODO добавляет тудушку/устанавливает будильник, встречу и т.д.
// TODO 7) backend + tests

const MainPage = () => {
  let mediaRecorder;
  let audioChunks = [];
  let newMessages = []; // TODO 0) подумать оставить или нет
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    localStorage.getItem('sessionGPT') !== null &&
      setMessages(JSON.parse(localStorage.getItem('sessionGPT')));
  }, []);

  const apiKey = key;

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

      mediaRecorder.addEventListener('stop', function () {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' }); // Создаем Blob из массива аудио частей
        audioChunks = [];

        sendAudioFile(audioBlob); // Отправляем аудиофайл на сервер OpenAI
      });
    }
  }

  function sendAudioFile(audioBlob) {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    formData.append('model', 'whisper-1');

    fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при отправке аудиофайла');
        }
      })
      .then(function (data) {
        const transcription = data.text;
        console.log('Текст распознанной речи:', transcription);
        //! проверка на команды
        getGptResponse(transcription);
      })
      .catch(function (error) {
        console.error('Ошибка:', error);
      });
  }

  function getGptResponse(promptText) {
    newMessages.push({
      role: 'user',
      content: promptText,
    });
    setMessages((prev) => [...prev, { role: 'user', content: promptText }]);
    localStorage.setItem('sessionGPT', messages);

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: newMessages,
        max_tokens: 100,
        temperature: 0.7,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при получении ответа от API GPT');
        }
      })
      .then(function (data) {
        const gptResponse = data.choices[0].message.content;
        newMessages.push({ role: 'assistant', content: gptResponse });
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: gptResponse },
        ]);
        console.log('Ответ от GPT:', gptResponse);
      })
      .then(() => {
        localStorage.setItem(
          'sessionGPT',
          JSON.stringify([...messages, ...newMessages])
        );
        console.log(JSON.parse(localStorage.getItem('sessionGPT')));
      })
      .catch(function (error) {
        console.error('Ошибка:', error);
      });
  }

  function clearStory() {
    console.log('Чистка истории сообщений');
    newMessages = [];
    setMessages([]);
    localStorage.removeItem('sessionGPT');
  }

  return (
    <div>
      <button
        type="button"
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
      >
        Запись голоса
      </button>
      <button type="button" onClick={clearStory}>
        Очистка истории
      </button>
      <div>
        {messages?.map((item, i) => (
          <div key={i}>
            <p>{item.role}</p>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;

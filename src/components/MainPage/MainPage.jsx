import { useState } from 'react';

const MainPage = () => {
  let mediaRecorder;
  let audioChunks = [];
  let messages = [];
  const [messagess, setMessagess] = useState([]);
  const apiKey = '';

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
        getGptResponse(transcription);
      })
      .catch(function (error) {
        console.error('Ошибка:', error);
      });
  }

  function getGptResponse(promptText) {
    messages.push({
      role: 'user',
      content: promptText,
    });
    setMessagess((prev) => [...prev, { role: 'user', content: promptText }]);

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
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
        messages.push({ role: 'assistant', content: gptResponse });
        setMessagess((prev) => [
          ...prev,
          { role: 'assistant', content: gptResponse },
        ]);
        console.log('Ответ от GPT:', gptResponse);
      })
      .catch(function (error) {
        console.error('Ошибка:', error);
      });
  }

  function clearStory() {
    console.log('Чистка истории сообщений');
    messages = [];
    setMessagess([]);
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
        {messagess?.map((item, i) => (
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

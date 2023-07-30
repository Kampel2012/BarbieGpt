import axios from 'axios';
import apiKey from '../../key';

export async function sendAudioFile(audioBlob) {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.wav');
  formData.append('model', 'whisper-1');

  const { data } = await axios.post(
    'https://api.openai.com/v1/audio/transcriptions',
    formData,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return data?.text;
}

export async function getGptResponse(messages) {
  const { data } = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 300,
      temperature: 0.7,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const gptResponse = data.choices[0].message.content;
  return gptResponse;
}

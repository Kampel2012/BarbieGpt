import PropTypes from 'prop-types';
import attachments from '../../assets/icon/attachments.svg';

const InputFileGPT = ({ askGPT, sendAudioFile, isLoading }) => {
  const allowedFormats = 'text/plain, audio/wav, audio/mp3, audio/mpeg,';

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const fileType = file.type;
    if (fileType === 'text/plain' && file.name.endsWith('.txt')) {
      // Если выбран .txt файл, выполнить askGPT
      const text = await readFileAsText(file);
      askGPT(text);
    } else if (allowedFormats.includes(fileType)) {
      if (file.size < 10000) return;
      // Если выбран аудиофайл, выполнить sendAudioFile
      const text = await sendAudioFile(file);
      askGPT(text);
    } else {
      alert(
        'Неверный формат файла. Пожалуйста, выберите .txt, .wav, .mp3, или .mpeg файл.'
      );
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        resolve(text);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  return (
    <div className="flex mr-3 shrink-0">
      <label
        htmlFor="fileInputGPT"
        className="rounded cursor-pointer leading-3"
      >
        <img src={attachments} alt="Прикрепить файл" />
      </label>
      <input
        disabled={isLoading}
        type="file"
        id="fileInputGPT"
        accept={allowedFormats}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

InputFileGPT.propTypes = {
  isLoading: PropTypes.bool,
  askGPT: PropTypes.func,
  sendAudioFile: PropTypes.func,
};

export default InputFileGPT;

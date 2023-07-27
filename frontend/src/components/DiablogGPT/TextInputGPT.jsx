import PropTypes from 'prop-types';
import sendicon from '../../assets/icon/sendicon.svg';
import { useState } from 'react';
import InputFileGPT from './InputFileGPT';

const TextInputGPT = ({ isLoading, askGPT, sendAudioFile }) => {
  const [text, setText] = useState('');

  function handlerSubmitText(e) {
    e.preventDefault();
    askGPT(text);
    setText('');
  }

  return (
    <div className="grow">
      <form
        onSubmit={handlerSubmitText}
        className="border border-secondary border-opacity-30 rounded-xl overflow-hidden flex items-center"
      >
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          placeholder="Задайте вопрос нейросети"
          className="px-4 py-3 leading-snug focus:outline-none grow font-semibold"
          value={text}
        />
        <InputFileGPT
          isLoading={isLoading}
          askGPT={askGPT}
          sendAudioFile={sendAudioFile}
        />
        <button className="bg-seagreen py-3 px-3 shrink-0" disabled={isLoading}>
          <img src={sendicon} alt="Отправить запрос" />
        </button>
      </form>
    </div>
  );
};

TextInputGPT.propTypes = {
  isLoading: PropTypes.bool,
  askGPT: PropTypes.func,
  sendAudioFile: PropTypes.func,
};

export default TextInputGPT;

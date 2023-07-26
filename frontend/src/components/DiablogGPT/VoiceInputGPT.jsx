import PropTypes from 'prop-types';
import mic from '../../assets/icon/mic.svg';

const VoiceInputGPT = ({ startRecording, stopRecording }) => {
  return (
    <button
      type="button"
      onMouseDown={startRecording}
      onMouseUp={stopRecording}
      className="flex items-center border border-secondary border-opacity-30 bg-seagreen rounded-xl px-4 py-3 ml-3 mr-3 font-semibold"
    >
      {'Начать диктовку'}
      <img src={mic} alt="Голосовой ввод" className="ml-2" />
    </button>
  );
};

VoiceInputGPT.propTypes = {
  startRecording: PropTypes.func.isRequired,
  stopRecording: PropTypes.func.isRequired,
};

export default VoiceInputGPT;

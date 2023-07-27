import PropTypes from 'prop-types';
import mic from '../../assets/icon/mic.svg';
import record from '../../assets/icon/record.svg';

const VoiceInputGPT = ({
  startRecording,
  stopRecording,
  isLoading,
  isRecording,
}) => {
  return (
    <>
      {isRecording ? (
        <button
          type="button"
          onClick={stopRecording}
          className="flex items-center border border-secondary border-opacity-30 bg-seagreen rounded-xl px-4 py-3 ml-3 mr-3 font-semibold"
        >
          {'Закончить диктовку'}
          <img src={record} alt="Голосовой ввод закончить" className="ml-2" />
        </button>
      ) : (
        <button
          type="button"
          onClick={startRecording}
          disabled={isLoading}
          className="flex items-center border border-secondary border-opacity-30 bg-seagreen rounded-xl px-4 py-3 ml-3 mr-3 font-semibold "
        >
          {'Начать диктовку'}
          <img src={mic} alt="Голосовой ввод начать" className="ml-2" />
        </button>
      )}
    </>
  );
};

VoiceInputGPT.propTypes = {
  startRecording: PropTypes.func,
  stopRecording: PropTypes.func,
  isRecording: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default VoiceInputGPT;

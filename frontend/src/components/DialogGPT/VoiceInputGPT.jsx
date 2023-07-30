import { useContext } from 'react';
import PropTypes from 'prop-types';
import mic from '../../assets/icon/mic.svg';
import record from '../../assets/icon/record.svg';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';

const VoiceInputGPT = ({
  startRecording,
  stopRecording,
  isLoading,
  isRecording,
}) => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  return (
    <>
      {isRecording ? (
        <button
          type="button"
          onClick={stopRecording}
          className="flex items-center border border-secondary border-opacity-30 bg-seagreen rounded-xl px-4 py-3 ml-3 mr-3 font-semibold"
        >
          {dictionary.recordingBtn.stop[language]}
          <img src={record} alt="Голосовой ввод закончить" className="ml-2" />
        </button>
      ) : (
        <button
          type="button"
          onClick={startRecording}
          disabled={isLoading}
          className="flex items-center border border-secondary border-opacity-30 bg-btnActive rounded-xl px-4 py-3 ml-3 mr-3 font-semibold "
        >
          {dictionary.recordingBtn.start[language]}
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

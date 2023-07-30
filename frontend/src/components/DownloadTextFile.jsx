import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import downloadIcon from '../assets/icon/download.svg';

DownloadTextFile.propTypes = {
  messages: PropTypes.array,
};

function DownloadTextFile({ messages }) {
  const text = messages
    .map((item, i) => {
      return `${i + 1}) ${item.role === 'user' ? 'User' : 'GPT'}: ${
        item.content
      }`;
    })
    .join('\n');

  const handleClick = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'Transcription.txt');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-4 py-3 border border-secondary border-opacity-30 rounded-xl shrink-0 hover:border-opacity-100"
    >
      <img src={downloadIcon} />
    </button>
  );
}

export default DownloadTextFile;

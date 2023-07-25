import PropTypes from 'prop-types';
import logoSizeSm from '../../assets/icon/logoSizeSm.svg';

MessageGPT.propTypes = {
  item: PropTypes.object.isRequired,
};

function MessageGPT({ item }) {
  const { role, content } = item;
  const isUser = role === 'user';
  const authorElem = isUser ? (
    <p className="text-secondary text-right px-4 font-medium text-sm leading-snug">
      Вы
    </p>
  ) : (
    <img src={logoSizeSm} alt="Лого компании" className="mr-4" />
  );

  return (
    <div
      className={`rounded-xl pt-4 pb-8 mb-5 mr-2 ${
        isUser ? 'bg-chatBlue' : 'bg-chatGray'
      }`}
    >
      <div className="flex justify-between">
        <p className="text-sm px-4 text-secondary">25 июля</p>
        {authorElem}
      </div>
      <p className="text-primary pl-8 pr-16 font-medium text-sm leading-snug pt-4">
        {content}
      </p>
    </div>
  );
}

export default MessageGPT;

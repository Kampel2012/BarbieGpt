import PropTypes from 'prop-types';
import CountdownTimer from '../CountdownTimer';

const Notification = ({ text, time }) => {
  return (
    <div className="min-h-max border border-secondary border-opacity-30 rounded-xl pt-3 px-4 pb-2 mr-2 flex flex-col justify-between">
      <p className="text-sm pb-2 max-h-80 break-words overflow-clip">{text}</p>
      <div className="text-right mt-2 text-secondary text-sm">
        <CountdownTimer initialSeconds={time} />
      </div>
    </div>
  );
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default Notification;

import PropTypes from 'prop-types';

const Notification = ({ text }) => {
  return (
    <div className="min-h-max border border-secondary border-opacity-30 rounded-xl pt-3 px-4 pb-10 mr-2">
      <p className="text-sm">{text}</p>
    </div>
  );
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Notification;

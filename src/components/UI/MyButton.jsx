import PropTypes from 'prop-types';

MyButton.propTypes = {
  children: PropTypes.array,
};

function MyButton(props) {
  return (
    <button
      type="button"
      className="flex flex-wrap bg-seagreen text-lg px-8 py-4 rounded-xl leading-tight gap-2 border border-secondary border-opacity-30 font-semibold"
    >
      {props.children}
    </button>
  );
}

export default MyButton;

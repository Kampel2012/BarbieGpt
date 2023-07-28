import PropTypes from 'prop-types';
import closeBtn from '../../assets/close-button.svg';

const ErrorPopup = ({ show, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${show ? 'block' : 'hidden'
        } bg-opacity-50 bg-black`}
    >
      <div className="relative bg-white w-[480px] px-[24px] py-[32px] rounded-2xl shadow-md">
        <button
          type="button"
          className="absolute top-[40px] right-[24px]"
          onClick={onClose}
        >
          <img
            alt='Закрыть'
            src={closeBtn}
          />
        </button>
        <h2 className="text-neutral-800 text-3xl font-bold leading-10 mb-[12px]">Что-то пошло не так...</h2>
        <p className='text-neutral-800 text-base font-medium leading-snug mb-[24px]'>Попробуйте снова</p>
        <button
            type="button"
            className="w-full px-6 py-4 rounded-xl border border-neutral-300
            text-neutral-800 text-lg font-medium leading-normal"
            onClick={onClose}
          >
            Назад
          </button>
      </div>
    </div>
  );
};

ErrorPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ErrorPopup;

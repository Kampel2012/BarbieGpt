import PropTypes from 'prop-types';
import closeBtn from '../../assets/close-button.svg';
import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';

const ErrorPopup = ({ show, onClose }) => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        show ? 'block' : 'hidden'
      } bg-opacity-50 bg-black`}
    >
      <div className="relative bg-white w-[480px] px-6 py-8 rounded-2xl shadow-md">
        <button
          type="button"
          className="absolute top-10 right-6 hover:opacity-70"
          onClick={onClose}
        >
          <img alt="Закрыть" src={closeBtn} />
        </button>
        <h2 className=" text-3xl font-extrabold leading-10 mb-3">
          {dictionary.tryRepeatTitle[language]}
        </h2>
        <p className=" text-base font-medium leading-snug mb-6">
          {dictionary.tryRepeatSubitle[language]}
        </p>
        <button
          type="button"
          className="w-full px-6 py-4 rounded-xl border border-secondary border-opacity-30
             text-lg font-medium leading-normal hover:border-opacity-100"
          onClick={onClose}
        >
          {dictionary.backBtn[language]}
        </button>
      </div>
    </div>
  );
};

ErrorPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ErrorPopup;

import { useContext } from 'react';
import PropTypes from 'prop-types';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';

const RegistrationErrorPopup = ({ show, onClose }) => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        show ? 'block' : 'hidden'
      } bg-opacity-50 bg-black`}
    >
      <div className="relative bg-white w-[480px] px-6 py-8 rounded-2xl shadow-md">
        <h2 className="text-neutral-800 text-3xl font-extrabold leading-10 mb-6">
          {dictionary.registerErrTitle[language]}
        </h2>
        <p className="text-neutral-800 text-base font-medium leading-snug mb-6">
          {dictionary.registerErrTxt[language]}
        </p>
        <button
          type="button"
          className="w-full px-6 py-4 bg-seagreen rounded-xl border border-secondary border-opacity-30
            text-neutral-800 text-lg font-medium leading-normal"
          onClick={onClose}
        >
          {dictionary.repeatBtn[language]}
        </button>
      </div>
    </div>
  );
};

RegistrationErrorPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default RegistrationErrorPopup;

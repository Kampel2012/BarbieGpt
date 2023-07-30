import { useContext } from 'react';
import PropTypes from 'prop-types';
import closeBtn from '../../assets/close-button.svg';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';

const DeleteProjectPopup = ({ show, onClose, onSubmit }) => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  if (!show) return;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        show ? 'block' : 'hidden'
      } bg-opacity-50 bg-black`}
    >
      <div className="relative bg-white w-[480px] px-6 py-8 rounded-2xl shadow-md">
        <button
          type="button"
          className="absolute top-[40px] right-6 hover:opacity-70"
          onClick={onClose}
        >
          <img alt="Закрыть" src={closeBtn} />
        </button>
        <h2 className="text-3xl font-extrabold leading-10 mb-6">
          {dictionary.delProjectTitle[language]}
        </h2>
        <p className="text-base font-medium leading-snug mb-3">
          {dictionary.delProjectTxt[language]}
        </p>
        <form onSubmit={handleFormSubmit}>
          <button
            type="submit"
            className="w-full px-6 py-4 rounded-xl border border-secondary border-opacity-30 mb-2
             text-lg font-medium leading-normal hover:border-opacity-100"
          >
            {dictionary.delBtn[language]}
          </button>
          <button
            type="button"
            className="w-full px-6 py-4 bg-seagreen rounded-xl border border-secondary border-opacity-30
             text-lg font-medium leading-normal hover:bg-btnHoverBlue"
            onClick={onClose}
          >
            {dictionary.cancelBtn[language]}
          </button>
        </form>
      </div>
    </div>
  );
};

DeleteProjectPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default DeleteProjectPopup;

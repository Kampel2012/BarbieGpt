import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';
import closeBtn from '../../assets/close-button.svg';

const CreateProjectPopup = ({ show, onClose, onSubmit }) => {
  const [reminderTitle, setReminderTitle] = useState('');
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: reminderTitle,
    });
    setReminderTitle('');
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
        <h2 className=" text-3xl font-extrabold leading-10 mb-1">
          {dictionary.createProjectTxt[language]}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full mt-6 px-4 pt-3 pb-4 rounded-xl border border-secondary border-opacity-30
              text-secondary text-sm font-normal leading-tight "
              placeholder={dictionary.createProjectTxt[language]}
              value={reminderTitle}
              onChange={(e) => setReminderTitle(e.target.value)}
              required
              maxLength={20}
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-4 bg-seagreen rounded-xl border border-secondary border-opacity-30
            text-neutral-800 text-lg font-medium leading-normal hover:bg-btnHoverBlue"
          >
            {dictionary.nextBtn[language]}
          </button>
        </form>
      </div>
    </div>
  );
};

CreateProjectPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default CreateProjectPopup;

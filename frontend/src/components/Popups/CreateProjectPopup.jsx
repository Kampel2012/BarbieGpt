import { useState } from 'react';
import PropTypes from 'prop-types';
import closeBtn from '../../assets/close-button.svg';

const CreateProjectPopup = ({ show, onClose, onSubmit }) => {
  const [reminderTitle, setReminderTitle] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: reminderTitle,
    });
  };

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
        <h2 className="text-neutral-800 text-3xl font-bold leading-10 mb-1">Название проекта</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full mt-[24px] px-4 pt-3 pb-10 rounded-xl border border-neutral-300
              text-neutral-500 text-sm font-normal leading-tight"
              placeholder='Название проекта'
              value={reminderTitle}
              onChange={(e) => setReminderTitle(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-4 bg-sky-400 rounded-xl border border-neutral-300
            text-neutral-800 text-lg font-medium leading-normal"
          >
            Далее
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

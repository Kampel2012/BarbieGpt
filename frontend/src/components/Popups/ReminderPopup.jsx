import { useState } from 'react';
import PropTypes from 'prop-types';
import closeBtn from '../../assets/close-button.svg';

const ReminderPopup = ({ show, onClose, onSubmit }) => {
  const [reminderTitle, setReminderTitle] = useState('');
  const [minutes, setMinutes] = useState(1);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(reminderTitle, parseInt(minutes));
    setReminderTitle('');
    setMinutes(1);
  };

  const handleClose = () => {
    setReminderTitle('');
    setMinutes(1);
    onClose();
  };

  function minMax(text) {
    const time = parseInt(text);
    const currectTime = Math.max(1, Math.min(time, 1440));
    setMinutes(currectTime);
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        show ? 'block' : 'hidden'
      } bg-opacity-50 bg-black`}
    >
      <div className="relative bg-white w-[480px] px-6 py-8 rounded-2xl shadow-md">
        <button
          type="button"
          className="absolute top-10 right-6"
          onClick={handleClose}
        >
          <img alt="Закрыть" src={closeBtn} />
        </button>
        <h2 className="text-neutral-800 text-3xl font-extrabold leading-10 mb-1">
          Создать напоминание
        </h2>
        <p className="text-neutral-400 text-sm font-normal leading-tight">
          Напоминания сохраняются в течение сессии вкладки браузера
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full mt-6 px-4 pt-3 pb-10 rounded-xl border border-neutral-300
              text-neutral-500 text-sm font-normal leading-tight"
              placeholder="Напоминание"
              value={reminderTitle}
              onChange={(e) => setReminderTitle(e.target.value)}
              maxLength={50}
              required
            />
            <p className="text-right text-neutral-400 text-sm font-normal leading-tight -mt-7 mr-3">
              {`${reminderTitle.length}/50`}
            </p>
          </div>
          <div className="mb-4">
            <label className="text-neutral-800 text-sm font-normal leading-tight">
              Через сколько минут напомнить
            </label>
            <input
              type="number"
              className="mt-2 w-full px-4 py-3.5 rounded-xl border border-neutral-300
              text-neutral-500 text-base font-medium leading-snug"
              placeholder="Минуты"
              value={minutes}
              onChange={(e) => minMax(e.target.value)}
              required
              min={1}
              max={1440}
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-4 bg-sky-400 rounded-xl border border-neutral-300
            text-neutral-800 text-lg font-medium leading-normal"
          >
            Создать
          </button>
        </form>
      </div>
    </div>
  );
};

ReminderPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ReminderPopup;

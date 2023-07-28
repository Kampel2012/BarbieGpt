import { useState } from 'react';
import PropTypes from 'prop-types';

const ReminderPopup = ({ show, onClose, onSubmit }) => {
  const [reminderTitle, setReminderTitle] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: reminderTitle,
      minutes: parseInt(minutes),
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        show ? 'block' : 'hidden'
      } bg-opacity-75 bg-black`}
    >
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Новое напоминание</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Название</label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md mt-1 p-2"
              value={reminderTitle}
              onChange={(e) => setReminderTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Количество минут
            </label>
            <input
              type="number"
              className="w-full border-gray-300 rounded-md mt-1 p-2"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
              onClick={onClose}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Создать
            </button>
          </div>
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

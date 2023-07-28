import { useState } from 'react';
import { makeNotification } from '../utils/notifications';

const ReminderComponent = () => {
  const [reminderText, setReminderText] = useState('');
  const [reminderTime, setReminderTime] = useState(0);

  const handleReminderSubmit = (e) => {
    e.preventDefault();
    makeNotification(reminderText, reminderTime);
  };

  return (
    <div>
      <h1 className="text-xl my-5 text-red-100">Создание напоминания</h1>
      <form onSubmit={handleReminderSubmit} className="flex flex-wrap gap-2">
        <label className="flex flex-wrap gap-2">
          Текст напоминания:
          <input
            type="text"
            value={reminderText}
            onChange={(e) => setReminderText(e.target.value)}
            minLength={2}
            maxLength={50}
            required={true}
            className="text-black"
          />
        </label>
        <label className="flex flex-wrap gap-2">
          Время через сколько показать напоминание (в минутах):
          <input
            type="number"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            min={1}
            required={true}
            className="text-black"
          />
        </label>
        <button type="submit" className="my-2 border px-2 py-1">
          Создать напоминание
        </button>
      </form>
    </div>
  );
};

export default ReminderComponent;

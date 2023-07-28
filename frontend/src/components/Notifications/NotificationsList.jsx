import { useContext } from 'react';
import mic from '../../assets/icon/mic.svg';
import plus from '../../assets/icon/plus.svg';
import Notification from './Notification';
import styles from './NotificationsList.module.css';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';

const NotificationsList = () => {
  const scrollStyle = styles.scrollbar;
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  const notifications = [];

  const notificationsElems =
    notifications.length > 0 ? (
      notifications.map((item, i) => <Notification key={i} text={item} />)
    ) : (
      <div className="text-center flex flex-col grow justify-center">
        <h3 className="text-base font-semibold">
          {dictionary.noNotesTxt[language]}
        </h3>
      </div>
    );

  return (
    <div className="min-w-min border-l-2 border-secondary border-opacity-30 bg-white pt-4 px-6 ">
      <div className={`w-64 `}>
        <div className="flex justify-between mb-6 items-center">
          <h2 className="font-semibold text-2xl">{dictionary.notesTitle[language]}</h2>
          <div className="flex gap-2">
            <button>
              <img src={mic} alt="Голосовой ввод"></img>
            </button>
            <button>
              <img src={plus} alt="Текстовое добавление заметки"></img>
            </button>
          </div>
        </div>
        <div
          className={`flex flex-col gap-4 h-[calc(100vh-32px-32px-32px)] overflow-y-auto ${scrollStyle}`}
        >
          {notificationsElems}
        </div>
      </div>
    </div>
  );
};

export default NotificationsList;

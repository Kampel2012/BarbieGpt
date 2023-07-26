import { Outlet, useParams } from 'react-router-dom';
import MainAsideBar from '../components/MainAsideBar/MainAsideBar';
import NotificationsList from '../components/Notifications/NotificationsList';
import DialogGPTempty from '../components/DiablogGPT/DialogGPTempty';

const MainPage = () => {
  const params = useParams();

  const chats = [
    {
      id: 123,
      messages: [
        { role: 'user', content: 'Расскажи сказку' },
        { role: 'assistant', content: 'Сам себе рассказывай' },
      ],
      name: 'Лекции по матану',
    },
    {
      id: 22,
      messages: [
        { role: 'user', content: 'Посчитай пример' },
        { role: 'assistant', content: 'Сам себе считай' },
      ],
      name: 'Личный блог',
    },
  ];

  function test() {
    //! Убрать после тестов как и кнопку внизу
    localStorage.setItem('chats', JSON.stringify(chats));
  }

  return (
    <div className=" bg-white">
      <div className="flex justify-between">
        <MainAsideBar chats={chats} />
        {params.chatId ? <Outlet /> : <DialogGPTempty />}
        <NotificationsList />
      </div>
      <button type="button" onClick={test}>
        reset
      </button>
    </div>
  );
};

export default MainPage;

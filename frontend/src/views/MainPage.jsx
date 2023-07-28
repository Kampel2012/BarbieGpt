import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import MainAsideBar from '../components/MainAsideBar/MainAsideBar';
import NotificationsList from '../components/Notifications/NotificationsList';
import DialogGPTempty from '../components/DiablogGPT/DialogGPTempty';
import { LanguageContext } from '../context/LanguageContext';
import { getDictionary } from '../utils/dictionary';
import api from '../api/api';

const MainPage = () => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();
  const { chatId } = useParams();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  async function createChat() {
    const title = prompt(dictionary.createChatPopupTitle[language]);
    const newChat = await api.addChat({ title });
    setChats((prev) => [...prev, newChat]);
  }

  async function deleteChat(chatId) {
    await api.deleteChat({ id: chatId });
    setChats((prev) => {
      return prev.filter((item) => item._id !== chatId);
    });
    navigate('/main'); // ????????????????????????????????
  }

  useEffect(() => {
    (async () => {
      const intianChats = await api.getChats();
      setChats(intianChats);
    })();
  }, []);

  return (
    <div className=" bg-white">
      <div className="flex justify-between">
        <MainAsideBar chats={chats} createChat={createChat} />
        {chatId ? <Outlet context={deleteChat} /> : <DialogGPTempty />}
        <NotificationsList />
      </div>
    </div>
  );
};

export default MainPage;

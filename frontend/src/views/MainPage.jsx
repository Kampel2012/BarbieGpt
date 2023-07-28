import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import MainAsideBar from '../components/MainAsideBar/MainAsideBar';
import NotificationsList from '../components/Notifications/NotificationsList';
import DialogGPTempty from '../components/DiablogGPT/DialogGPTempty';
import { LanguageContext } from '../context/LanguageContext';
import { getDictionary } from '../utils/dictionary';
import api from '../api/api';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';
import ReminderPopup from '../components/Popups/ReminderPopup';
import CreateProjectPopup from '../components/Popups/CreateProjectPopup';
import DeleteProjectPopup from '../components/Popups/DeleteProjectPopup';

const MainPage = () => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();
  const { chatId } = useParams();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const user = await api.getMyProfile();
      dispatch(setCurrentUser(user));
    })();
  }, [dispatch]);

  return (
    <div className="relative bg-white">
      <div className="flex justify-between">
        <MainAsideBar chats={chats} createChat={createChat} />
        {chatId ? <Outlet context={deleteChat} /> : <DialogGPTempty />}
        <NotificationsList />

      </div>
      <ReminderPopup show={false} onClose={() => console.log('close')} onSubmit={() => console.log('submit')} />
      <CreateProjectPopup show={false} onClose={() => console.log('close')} onSubmit={() => console.log('submit')} />
      <DeleteProjectPopup show={true} onClose={() => console.log('close')} onSubmit={() => console.log('submit')} />
    </div>
  );
};

export default MainPage;

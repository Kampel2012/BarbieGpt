import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainAsideBar from '../components/MainAsideBar/MainAsideBar';
import NotificationsList from '../components/Notifications/NotificationsList';
import DialogGPTempty from '../components/DiablogGPT/DialogGPTempty';
import api from '../api/api';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';

const MainPage = () => {
  const { chatId } = useParams();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function createChat() {
    const title = prompt('Введите название чата');
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

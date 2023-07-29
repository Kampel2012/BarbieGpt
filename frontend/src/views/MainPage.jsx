import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import MainAsideBar from '../components/MainAsideBar/MainAsideBar';
import NotificationsList from '../components/Notifications/NotificationsList';
import DialogGPTempty from '../components/DiablogGPT/DialogGPTempty';
import { LanguageContext } from '../context/LanguageContext';
import { getDictionary } from '../utils/dictionary';
import api from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';
import {
  addChat,
  removeChatById,
  setallChats,
} from '../redux/slices/chatSlice';

const MainPage = () => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chat.allChats);

  async function createChat() {
    const title = prompt(dictionary.createChatPopupTitle[language]);
    const newChat = await api.addChat({ title });
    dispatch(addChat(newChat));
    navigate(`/main/${newChat._id}`);
  }

  async function deleteChat(chatId) {
    await api.deleteChat({ id: chatId });
    dispatch(removeChatById(chatId));
    navigate('/main');
  }

  useEffect(() => {
    (async () => {
      const intianChats = await api.getChats();
      dispatch(setallChats(intianChats));
      const user = await api.getMyProfile();
      dispatch(setCurrentUser(user));
      /*       if (intianChats.length > 0) {
        navigate(`/main/${intianChats[0]._id}`);
      } */
    })();
  }, [dispatch, navigate]);

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

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
import ReminderPopup from '../components/Popups/ReminderPopup';
import CreateProjectPopup from '../components/Popups/CreateProjectPopup';
import DeleteProjectPopup from '../components/Popups/DeleteProjectPopup';
import ErrorPopup from '../components/Popups/ErrorPopup';
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
    if (chats.length > 1) {
      navigate(`/main/${chats[0]._id}`);
    } else {
      navigate('/main');
    }
  }

  useEffect(() => {
    (async () => {
      const intianChats = await api.getChats();
      dispatch(setallChats(intianChats));
      const user = await api.getMyProfile();
      dispatch(setCurrentUser(user));
    })();
  }, [dispatch, navigate]);

  return (
    <div className="relative bg-white">
      <div className="flex justify-between">
        <MainAsideBar chats={chats} createChat={createChat} />
        {chatId ? <Outlet context={deleteChat} /> : <DialogGPTempty />}
        <NotificationsList />
      </div>
      <ReminderPopup
        show={false}
        onClose={() => console.log('close')}
        onSubmit={() => console.log('submit')}
      />
      <CreateProjectPopup
        show={false}
        onClose={() => console.log('close')}
        onSubmit={() => console.log('submit')}
      />
      <DeleteProjectPopup
        show={false}
        onClose={() => console.log('close')}
        onSubmit={() => console.log('submit')}
      />
      <ErrorPopup show={false} onClose={() => console.log('close')} />
    </div>
  );
};

export default MainPage;

import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainAsideBar from '../components/MainAsideBar/MainAsideBar';
import NotificationsList from '../components/Notifications/NotificationsList';
import DialogGPTempty from '../components/DialogGPT/DialogGPTempty';
import api from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';
import CreateProjectPopup from '../components/Popups/CreateProjectPopup';
import DeleteProjectPopup from '../components/Popups/DeleteProjectPopup';
import ErrorPopup from '../components/Popups/ErrorPopup';
import {
  addChat,
  removeChatById,
  setallChats,
} from '../redux/slices/chatSlice';
import ModsPopup from '../components/Popups/ModsPopup';

const MainPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chat.allChats);
  const [projectName, setProjectName] = useState({});
  const [showCreateProjectPopup, setShowCreateProjectPopup] = useState(false);
  const [showModsPopup, setShowModsPopup] = useState(false);
  const [showErrorPopup, setshowErrorPopup] = useState(false);
  const [showDeleteProjectPopup, setShowDeleteProjectPopup] = useState(false);

  async function createChat(projectName, mod) {
    if (!projectName || !mod) return;
    try {
      const newChat = await api.addChat({ title: projectName.title, mod });
      dispatch(addChat(newChat));
      navigate(`/main/${newChat._id}`);
    } catch (error) {
      setshowErrorPopup(true);
    }
  }

  const handleCreateProject = (name) => {
    setProjectName(name);
    setShowCreateProjectPopup(false);
    setShowModsPopup(true);
  };

  const handleCancelCreateProject = () => {
    setProjectName({});
    setShowCreateProjectPopup(false);
  };

  const handleCreateProjectSubmit = async (mod) => {
    await createChat(projectName, mod);
    setProjectName({});
    setShowModsPopup(false);
  };

  const handleDeleteProjectSubmit = async () => {
    await deleteChat();
    setShowDeleteProjectPopup(false);
    console.log(chats);

    navigate('/main');
  };

  async function deleteChat() {
    try {
      await api.deleteChat({ id: chatId });
      dispatch(removeChatById(chatId));
    } catch (error) {
      setshowErrorPopup(true);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const intianChats = await api.getChats();
        dispatch(setallChats(intianChats));
        const user = await api.getMyProfile();
        dispatch(setCurrentUser(user));
        if (!chatId && intianChats.length >= 1) {
          navigate(`/main/${intianChats[0]._id}`);
        }
      } catch (error) {
        setshowErrorPopup(true);
      }
    })();
  }, [chatId, dispatch, navigate]);

  return (
    <div className="relative bg-white">
      <div className="flex justify-between">
        <MainAsideBar
          chats={chats}
          createChat={() => setShowCreateProjectPopup(true)}
        />
        {chatId ? (
          <Outlet context={() => setShowDeleteProjectPopup(true)} />
        ) : (
          <DialogGPTempty />
        )}
        <NotificationsList />
      </div>
      <CreateProjectPopup
        show={showCreateProjectPopup}
        onClose={handleCancelCreateProject}
        onSubmit={handleCreateProject}
      />
      <ModsPopup
        isOpen={showModsPopup}
        onClose={() => setShowModsPopup(false)}
        onSubmit={handleCreateProjectSubmit}
        onPrev={() => {
          setShowModsPopup(false);
          setShowCreateProjectPopup(true);
        }}
      />
      <DeleteProjectPopup
        show={showDeleteProjectPopup}
        onClose={() => setShowDeleteProjectPopup(false)}
        onSubmit={handleDeleteProjectSubmit}
      />
      <ErrorPopup
        show={showErrorPopup}
        onClose={() => setshowErrorPopup(false)}
      />
    </div>
  );
};

export default MainPage;

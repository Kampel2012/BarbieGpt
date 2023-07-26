import DialogGPT from '../components/DiablogGPT/DialogGPT';
import MainAsideBar from '../components/Main/MainAsideBar';
import NotificationsList from '../components/Notifications/NotificationsList';

const MainPage = () => {
  return (
    <div className=" bg-bgBlue">
      <div className="container flex justify-between">
        <MainAsideBar />
        <DialogGPT />
        <NotificationsList />
      </div>
    </div>
  );
};

export default MainPage;

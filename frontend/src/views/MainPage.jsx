import DialogGPT from '../components/DiablogGPT/DialogGPT';
import MainAsideBar from '../components/Main/MainAsideBar';

const MainPage = () => {
  return (
    <div className=" bg-bgBlue">
      <div className="container flex justify-between">
        <MainAsideBar />
        <DialogGPT />
        <div></div>
      </div>
    </div>
  );
};

export default MainPage;

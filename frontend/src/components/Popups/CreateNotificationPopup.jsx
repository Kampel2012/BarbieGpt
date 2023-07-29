import ReminderComponent from './ReminderComponent';

const CreateNotificationPopup = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-50 -z-1 content-none" />
      <div className="absolute top-0 left-0 w-[500px] bg-white m-auto z-2 opacity-100">
        <ReminderComponent />
      </div>
    </>
  );
};

export default CreateNotificationPopup;

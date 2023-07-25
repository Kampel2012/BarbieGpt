import plus from '../../assets/icon/plus.svg';
import ThemeSwitcher from '../ThemeSwitcher';
import signout from '../../assets/icon/signout.svg';

const MainAsideBar = () => {
  return (
    <div className="p-6 max-w-[280px] bg-bgBlue flex flex-col justify-between min-h-screen">
      <div>
        <div className="bg-headerlogo w-[165px] h-10 bg-contain bg-no-repeat" />
        <div className="flex items-center gap-x-2 px-3 pt-10 border-b pb-4 border-secondary border-opacity-30">
          <div className="bg-btnIconUser w-14 h-12 bg-no-repeat bg-center basis-6 shrink-0" />
          <p className="overflow-hidden whitespace-nowrap truncate text-lg leading-snug font-semibold">
            testemailforyou@gmail.com
          </p>
        </div>
        <div className="mt-6 border-b  border-secondary border-opacity-30">
          <div className="flex items-center gap-2 bg-activeBlue mb-4 px-3 py-2 rounded-xl leading-snug">
            <div className="bg-messageIcon w-6 h-6"></div>
            <p className="overflow-hidden whitespace-nowrap truncate text-lg leading-snug font-semibold">
              Чат с ботом
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="button"
            className="flex bg-seagreen text-lg w-full py-3 rounded-xl leading-tight gap-2 border border-secondary border-opacity-30 font-semibold items-center justify-center"
          >
            <img src={plus} className="" />
            <p>Создать проект</p>
          </button>
          <p className="text-primary text-sm mt-2">
            У вас пока не создано ни одного проекта. Нажмите создать проект
            чтобы приступить к работе
          </p>
        </div>
      </div>
      <div className="">
        <button type="button" className="mb-4 px-3 py-2 flex gap-2">
          <img src={signout} alt="Иконка выхода" /> Выход
        </button>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default MainAsideBar;
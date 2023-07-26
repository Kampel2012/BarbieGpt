import PropTypes from 'prop-types';
import ThemeSwitcher from '../ThemeSwitcher';
import signout from '../../assets/icon/signout.svg';
import EmptyProject from './EmptyProject';
import ProjectBadge from './ProjectBadge';

const MainAsideBar = ({ chats }) => {
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

        {chats.length > 0 ? (
          <div className="mt-2 flex flex-col gap-2">
            {chats.map((item) => (
              <ProjectBadge key={item.id} name={item.name} id={item.id} />
            ))}
          </div>
        ) : (
          <EmptyProject />
        )}
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

MainAsideBar.propTypes = {
  chats: PropTypes.array,
};

export default MainAsideBar;

import PropTypes from 'prop-types';
import LanguageSwitcher from '../LanguageSwitcher';
import signout from '../../assets/icon/signout.svg';
import EmptyProject from './EmptyProject';
import ProjectBadge from './ProjectBadge';
import plus from '../../assets/icon/plus.svg';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';
import { useSelector } from 'react-redux';

const MainAsideBar = ({ chats, createChat }) => {
  const { signOut } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  const { email } = useSelector((state) => state.user.currentUser);

  return (
    <div className="p-6 max-w-[280px] bg-bgBlue flex flex-col justify-between min-h-screen">
      <div>
        <div className="bg-headerlogo w-[165px] h-10 bg-contain bg-no-repeat" />
        <div className="flex items-center gap-x-2 px-3 pt-10 border-b pb-4 border-secondary border-opacity-30">
          <div className="bg-btnIconUser w-14 h-12 bg-no-repeat bg-center basis-6 shrink-0" />
          <p className="overflow-hidden whitespace-nowrap truncate text-lg leading-snug font-semibold">
            {email}
          </p>
        </div>

        {chats.length > 0 ? (
          <div className="my-2 flex flex-col gap-2">
            {chats.map((item) => (
              <ProjectBadge key={item._id} name={item.title} id={item._id} />
            ))}
          </div>
        ) : (
          <EmptyProject />
        )}
        <button
          type="button"
          onClick={createChat}
          className="flex bg-seagreen text-lg w-full py-3 rounded-xl leading-tight gap-2 border border-secondary border-opacity-30 font-semibold items-center justify-center"
        >
          <img src={plus} className="" />
          <p>{dictionary.createProjectBtn[language]}</p>
        </button>
      </div>
      <div className="">
        <button
          type="button"
          onClick={signOut}
          className="mb-4 px-3 py-2 flex gap-2"
        >
          <img src={signout} alt="Иконка выхода" />{' '}
          {dictionary.exitBtn[[language]]}
        </button>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

MainAsideBar.propTypes = {
  chats: PropTypes.array,
  createChat: PropTypes.func,
};

export default MainAsideBar;

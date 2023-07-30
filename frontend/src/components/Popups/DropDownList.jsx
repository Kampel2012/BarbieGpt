import { useContext } from 'react';
import PropTypes from 'prop-types';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';
import arrow from '../../assets/icon/arrow.svg';

const DropDownList = ({ show, onLogin, onRegister }) => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  const handleLogin = () => {
    onLogin();
  };

  const handleRegister = () => {
    onRegister();
  };

  return (
    <div
      className={`fixed top-[84px] right-20 w-72 h-40 flex items-center justify-center z-10 ${
        show ? 'block' : 'hidden'
      } `}
    >
      <div className="relative bg-white w-[480px] px-6 py-6 rounded-2xl border border-secondary border-opacity-30 shadow-md">
        <img
          alt="Стрелка"
          src={arrow}
          className="absolute -top-[11px] right-6"
        />
        <button
          type="button"
          className="hover:bg-btnHoverBlue w-full px-6 py-4 bg-seagreen rounded-xl border border-secondary border-opacity-30 mb-2
            text-lg font-semibold leading-normal"
          onClick={handleLogin}
        >
          {dictionary.enterBtn[language]}
        </button>
        <button
          type="button"
          className="w-full px-6 py-4 rounded-xl text-lg font-semibold leading-normal border border-secondary
              border-opacity-30 hover:border-opacity-100"
          onClick={handleRegister}
        >
          {dictionary.registerBtn[language]}
        </button>
      </div>
    </div>
  );
};

DropDownList.propTypes = {
  show: PropTypes.bool,
  onLogin: PropTypes.func,
  onRegister: PropTypes.func,
};

export default DropDownList;

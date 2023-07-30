import { useState /* useContext */ } from 'react';
// import { LanguageContext } from '../context/LanguageContext';
import sunIcon from '../assets/icon/sun.svg';
import moonIcon from '../assets/icon/moon.svg';

// TODO сделать темную тему после хакатона

const ThemeSwitcher = () => {
  /*   const { language, setLanguage } = useContext(LanguageContext); */
  const [language, setLanguage] = useState('RU');
  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  return (
    <div className="flex items-center h-12 p-1 border rounded-xl font-medium max-w-max">
      <button
        className={`px-3 py-2 rounded-xl flex gap-2 transition-all leading-5 ${
          language === 'EN' ? 'bg-gray-200' : 'bg-inherit'
        }`}
        onClick={() => handleLanguageChange('EN')}
      >
        <img src={sunIcon} alt="Переключение на светлую тему" />
      </button>
      <button
        className={`px-3 py-2 rounded-xl flex gap-2 transition-all leading-5 ${
          language === 'RU' ? 'bg-gray-200' : 'bg-inherit'
        }`}
        onClick={() => handleLanguageChange('RU')}
      >
        <img src={moonIcon} alt="Переключение на темную тему" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;

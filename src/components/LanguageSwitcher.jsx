import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import rusIcon from '../assets/icon/flagRus.svg';
import engIcon from '../assets/icon/flagEng.svg';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  return (
    <div className="flex items-center h-12 p-1 border rounded-xl font-medium ">
      <button
        className={`px-3 py-2 rounded-xl flex gap-2 transition-all leading-5 ${
          language === 'EN' ? 'bg-gray-200' : 'bg-inherit'
        }`}
        onClick={() => handleLanguageChange('EN')}
      >
        <img src={engIcon} alt="Русский язык" />
        Eng
      </button>
      <button
        className={`px-3 py-2 rounded-xl flex gap-2 transition-all leading-5 ${
          language === 'RU' ? 'bg-gray-200' : 'bg-inherit'
        }`}
        onClick={() => handleLanguageChange('RU')}
      >
        <img src={rusIcon} alt="Английский язык" />
        Рус
      </button>
    </div>
  );
};

export default LanguageSwitcher;

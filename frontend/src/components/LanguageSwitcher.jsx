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
    <div className="flex items-center h-12 p-1 border rounded-xl font-medium max-w-max">
      <button
        type="button"
        className={`px-3 py-2 rounded-xl flex gap-2 transition-all leading-5 hover:opacity-70 ${
          language === 'EN' ? 'bg-gray-200' : 'bg-inherit'
        }`}
        onClick={() => handleLanguageChange('EN')}
      >
        <img src={engIcon} alt="Английский язык" />
        Eng
      </button>
      <button
        type="button"
        className={`px-3 py-2 rounded-xl flex gap-2 transition-all leading-5 hover:opacity-70 ${
          language === 'RU' ? 'bg-gray-200' : 'bg-inherit'
        }`}
        onClick={() => handleLanguageChange('RU')}
      >
        <img src={rusIcon} alt="Русский язык" />
        Рус
      </button>
    </div>
  );
};

export default LanguageSwitcher;

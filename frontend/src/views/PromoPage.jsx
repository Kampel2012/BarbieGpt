import micIcon from '../assets/icon/mic.svg';
import vector from '../assets/VectorPromo.svg';
import MyButton from '../components/UI/MyButton';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { getDictionary } from '../utils/dictionary';
import Header from '../components/Header';

const PromoPage = () => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  return (
    <>
      <Header />
      <div className="bg-bgFrame relative z-0">
        <div className="container min-h-[calc(100vh-80px)] text-center max-w-6xl">
          <h1 className="text-6xl font-extrabold leading-tight max-w-6xl mx-auto text-primary mb-4 pt-52">
            {dictionary.promoTitle[language]}
          </h1>
          <p className="text-secondary text-2xl max-w-2xl mx-auto mb-10 font-medium">
            {dictionary.promoSubtitle[language]}
          </p>
          <div className="mx-auto max-w-max pb-20">
            <MyButton>
              {dictionary.promoBtn[language]} <img src={micIcon} alt="Микрофон" />
            </MyButton>
          </div>
        </div>
        <div className="w-auto h-auto absolute inset-0 flex items-end justify-center -z-10">
          <img src={vector} alt="Вектор" />
        </div>
      </div>
    </>
  );
};

export default PromoPage;

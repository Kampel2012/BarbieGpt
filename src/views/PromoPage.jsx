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
      <div className="bg-bgFrame relative">
        <div className="container min-h-[calc(100vh-80px)] text-center max-w-6xl">
          <h1 className="text-6xl font-extrabold leading-tight max-w-6xl mx-auto text-primary mb-4 pt-52">
            Превращаем аудиозаписи в текст с высокой точностью и оптимизацией
          </h1>
          <p className="text-secondary text-2xl max-w-2xl mx-auto mb-10 font-medium">
            Помогаем пользователям сокращать, улучшать, трансформировать
            аудиозаписи и экономить время
          </p>
          <div className="mx-auto max-w-max ">
            <MyButton>
              Начать использование <img src={micIcon} alt="Микрофон" />
            </MyButton>
          </div>
        </div>
        <div className="w-auto h-auto absolute bottom-0 left-0">
          <img src={vector} alt="Вектор" />
        </div>
      </div>
    </>
  );
};

export default PromoPage;

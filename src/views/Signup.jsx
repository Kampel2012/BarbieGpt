/* import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { getDictionary } from '../utils/dictionary'; */
import { useState } from 'react';
import Header from '../components/Header';

const Signup = () => {
  /*   const { language } = useContext(LanguageContext);
  const dictionary = getDictionary(); */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Header />

      <div className="bg-bgFrame pt-16">
        <div className="mx-auto text-center max-w-[480px] px-6 border border-secondary border-opacity-30 rounded-xl bg-white">
          <h1 className="leading-tight text-3xl font-extrabold tracking-tight text-left pt-8">
            Регистрация
          </h1>

          <form className="text-left pt-6">
            <label>
              <p className="mb-2 text-secondary text-sm">
                Введите ваш e-mail для регистрации
              </p>
              <input
                className="w-full border border-secondary px-4 py-4 rounded-xl placeholder:font-medium border-opacity-30 leading-snug"
                placeholder="Электронная почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              ></input>
              <span className="text-red-500 text-xs">
                Некорректный формат почты (пример: example@gmail.com)
              </span>
            </label>
            <label>
              <p className="mb-2 text-secondary text-sm mt-4">
                Придумайте пароль (минимум 6 латинских букв и 2 цифры)
              </p>
              <input
                className="w-full border border-secondary px-4 py-4 rounded-xl placeholder:font-medium border-opacity-30 leading-snug"
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                autoComplete="off"
              ></input>
              <span className="text-red-500 text-xs">
                Некорректный формат пароля (можно использовать только латинские
                буквы и цифры)
              </span>
            </label>
            <button
              type="button"
              className="bg-seagreen text-lg w-full text-center py-4 rounded-xl leading-tight gap-2 font-semibold mt-6 border border-secondary border-opacity-30"
            >
              Создать аккаунт
            </button>
          </form>
          <p className="text-left text-sm leading-snug text-secondary pt-2">
            Регистрируясь, вы соглашаетесь с условиями обслуживания и политикой
            конфиденциальности компании Chatty AI
          </p>
          <div className="flex items-center my-6">
            <div className="flex-1 h-0.5 bg-secondary bg-opacity-30"></div>
            <div className="px-4 text-secondary leading-snug">
              Уже есть аккаунт?
            </div>
            <div className="flex-1 h-0.5 bg-secondary bg-opacity-30"></div>
          </div>
          <button
            type="button"
            className="text-lg w-full text-center py-4 rounded-xl leading-tight gap-2 bg-white border border-secondary border-opacity-30 mb-8 font-semibold"
          >
            Войти
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;

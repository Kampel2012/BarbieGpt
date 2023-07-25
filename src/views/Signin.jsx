import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { getDictionary } from '../utils/dictionary';
import { useState } from 'react';
import Header from '../components/Header';

const Signin = () => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Header />
      <div className="bg-bgFrame pt-16">
        <div className="mx-auto text-center max-w-[480px] px-6 border border-secondary border-opacity-30 rounded-xl bg-white">
          <h1 className="leading-tight text-3xl font-extrabold tracking-tight text-left pt-8">
            Вход
          </h1>

          <form className="text-left pt-6">
            <label>
              <p className="mb-2 text-secondary text-sm">Введите ваш e-mail</p>
              <input
                className="w-full border border-secondary px-4 py-4 rounded-xl placeholder:font-medium border-opacity-30 leading-snug"
                placeholder="Электронная почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              ></input>
              <span className="text-red-500 text-xs">
                Аккаунта с такой почтой не существует
              </span>
            </label>
            <label>
              <p className="mb-2 text-secondary text-sm mt-4">Введите пароль</p>
              <input
                className="w-full border border-secondary px-4 py-4 rounded-xl placeholder:font-medium border-opacity-30 leading-snug"
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                autoComplete="off"
              ></input>
              <span className="text-red-500 text-xs">Неверный пароль</span>
            </label>
            <button
              type="button"
              className="bg-seagreen text-lg w-full text-center py-4 rounded-xl leading-tight gap-2 font-semibold mt-6 border border-secondary border-opacity-30 "
            >
              Войти
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-1 h-0.5 bg-secondary bg-opacity-30"></div>
            <div className="px-4 text-secondary leading-snug">
              Нет аккаунта?
            </div>
            <div className="flex-1 h-0.5 bg-secondary bg-opacity-30"></div>
          </div>
          <button
            type="button"
            className="text-lg w-full text-center py-4 rounded-xl leading-tight gap-2 bg-white border border-secondary border-opacity-30 mb-8 font-semibold"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </>
  );
};

export default Signin;

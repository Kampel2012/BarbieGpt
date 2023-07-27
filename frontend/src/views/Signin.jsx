import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { getDictionary } from '../utils/dictionary';
import Header from '../components/Header';

import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const Signin = () => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) return;
    navigate('/main');
  }, [isAuth, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.authorize({ email, password });
      localStorage.setItem('CHATTYTOKEN', res.jwt);
      setIsAuth(true);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <Header />
      <div className="bg-bgFrame pt-16 min-h-[calc(100vh-80px)]">
        <div className="mx-auto text-center max-w-[480px] px-6 border border-secondary border-opacity-30 rounded-xl bg-white">
          <h1 className="leading-tight text-3xl font-extrabold tracking-tight text-left pt-8">
            {dictionary.loginTitle[language]}
          </h1>

          <form className="text-left pt-6" onSubmit={handleSubmit}>
            <label>
              <p className="mb-2 text-secondary text-sm">
                {dictionary.emailInputTitle[language]}
              </p>
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
              <p className="mb-2 text-secondary text-sm mt-4">
                {dictionary.passwordInputTitle[language]}
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
              <span className="text-red-500 text-xs">Неверный пароль</span>
            </label>
            <button
              type="submit"
              className="bg-seagreen text-lg w-full text-center py-4 rounded-xl leading-tight gap-2 font-semibold mt-6 border border-secondary border-opacity-30 "
            >
              {dictionary.enterBtn[language]}
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-1 h-0.5 bg-secondary bg-opacity-30"></div>
            <div className="px-4 text-secondary leading-snug">
              {dictionary.noAccountTxt[language]}
            </div>
            <div className="flex-1 h-0.5 bg-secondary bg-opacity-30"></div>
          </div>
          <Link
            to={'/signup'}
            type="button"
            className="text-lg w-full text-center py-4 rounded-xl leading-tight gap-2 bg-white border border-secondary border-opacity-30 mb-8 font-semibold"
          >
            {dictionary.registerBtn[language]}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signin;

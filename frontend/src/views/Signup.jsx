import { LanguageContext } from '../context/LanguageContext';
import { getDictionary } from '../utils/dictionary';
import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RegistrationErrorPopup from '../components/Popups/RegistrationErrorPopup';

const Signup = () => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [showRegistrationErrorPopup, setShowRegistrationErrorPopup] = useState(false);

  useEffect(() => {
    if (!isAuth) return;
    navigate('/main');
  }, [isAuth, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.register({ email, password });
      const res = await api.authorize({ email, password });
      localStorage.setItem('CHATTYTOKEN', res.jwt);
      setIsAuth(true);
    } catch (err) {
      // alert(err);
      setShowRegistrationErrorPopup(true);
    }
  }

  return (
    <>
      <Header />

      <div className="bg-bgFrame pt-16 min-h-[calc(100vh-80px)]">
        <div className="mx-auto text-center max-w-[480px] px-6 border border-secondary border-opacity-30 rounded-xl bg-white">
          <h1 className="leading-tight text-3xl font-extrabold tracking-tight text-left pt-8">
            {dictionary.registerTitle[language]}
          </h1>

          <form className="text-left pt-6" onSubmit={handleSubmit}>
            <label>
              <p className="mb-2 text-secondary text-sm">
                {dictionary.registerEmailInputTitle[language]}
              </p>
              <input
                className="w-full border border-secondary px-4 py-4 rounded-xl placeholder:font-medium border-opacity-30 leading-snug"
                placeholder={dictionary.emailInputPlaceholder[language]}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              ></input>
              {/* <span className="text-red-500 text-xs">
                Некорректный формат почты (пример: example@gmail.com)
              </span> */}
            </label>
            <label>
              <p className="mb-2 text-secondary text-sm mt-4">
                {dictionary.registerPasswordInputTitle[language]}
              </p>
              <input
                className="w-full border border-secondary px-4 py-4 rounded-xl placeholder:font-medium border-opacity-30 leading-snug"
                placeholder={dictionary.passwordInputPlaceholder[language]}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                autoComplete="off"
              ></input>
              {/* <span className="text-red-500 text-xs">
                Некорректный формат пароля (можно использовать только латинские
                буквы и цифры)
              </span> */}
            </label>
            <button
              type="submit"
              className="bg-seagreen text-lg w-full text-center py-4 rounded-xl leading-tight gap-2 font-semibold mt-6 border border-secondary border-opacity-30"
            >
              {dictionary.createAccBtn[language]}
            </button>
          </form>
          <p className="text-left text-sm leading-snug text-secondary pt-2">
            {dictionary.registerTxt[language]}
          </p>
          <div className="flex items-center my-6">
            <div className="flex-1 h-0.5 bg-secondary bg-opacity-30"></div>
            <div className="px-4 text-secondary leading-snug">
              {dictionary.haveAccTxt[language]}
            </div>
            <div className="flex-1 h-0.5 bg-secondary bg-opacity-30"></div>
          </div>
          <Link
            to={'/sign-in'}
            type="button"
            className="text-lg w-full text-center py-4 rounded-xl leading-tight gap-2 bg-white border border-secondary border-opacity-30 mb-8 font-semibold"
          >
            {dictionary.enterBtn[language]}
          </Link>
        </div>
      </div>
      <RegistrationErrorPopup
        show={showRegistrationErrorPopup}
        onClose={() => setShowRegistrationErrorPopup(false)}
      />
    </>
  );
};

export default Signup;

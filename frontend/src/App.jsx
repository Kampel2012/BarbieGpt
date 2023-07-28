import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { LanguageContext } from './context/LanguageContext';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';

function App() {
  const element = useRoutes(routes);
  const [language, setLanguage] = useState(
    localStorage.getItem('LanguageChattyAI') || 'RU'
  );
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem('CHATTYTOKEN'))
  );
  function signOut() {
    localStorage.removeItem('CHATTYTOKEN');
    setIsAuth(false);
  }

  function setLanguageForAll(newValue) {
    localStorage.setItem('LanguageChattyAI', newValue);
    setLanguage(newValue);
  }

  return (
    <>
      <LanguageContext.Provider
        value={{ language, setLanguage: setLanguageForAll }}
      >
        <AuthContext.Provider value={{ isAuth, setIsAuth, signOut }}>
          {element}
        </AuthContext.Provider>
      </LanguageContext.Provider>
    </>
  );
}

export default App;

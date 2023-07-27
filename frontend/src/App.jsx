import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { LanguageContext } from './context/LanguageContext';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';

function App() {
  const element = useRoutes(routes);
  const [language, setLanguage] = useState('RU');
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem('CHATTYTOKEN'))
  );
  function signOut() {
    localStorage.removeItem('CHATTYTOKEN');
    setIsAuth(false);
  }

  return (
    <>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <AuthContext.Provider value={{ isAuth, setIsAuth, signOut }}>
          {element}
        </AuthContext.Provider>
      </LanguageContext.Provider>
    </>
  );
}

export default App;

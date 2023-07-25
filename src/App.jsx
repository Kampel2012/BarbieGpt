import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { LanguageContext } from './context/LanguageContext';
import { useState } from 'react';

function App() {
  const element = useRoutes(routes);
  const [language, setLanguage] = useState('RU');

  return (
    <>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        {element}
      </LanguageContext.Provider>
    </>
  );
}

export default App;

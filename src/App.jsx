import { useRoutes } from 'react-router-dom';
// import MainPage from './components/MainPage';
// import TabGPT from './components/TabGPT';
import routes from './routes';
import Header from './components/Header';
import { LanguageContext } from './context/LanguageContext';
import { useState } from 'react';

function App() {
  const element = useRoutes(routes);
  const [language, setLanguage] = useState('RU');

  return (
    <>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Header />
        {element}
        {/*       <TabGPT /> */}
        {/*       <MainPage /> */}
      </LanguageContext.Provider>
    </>
  );
}

export default App;

import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from './components/LanguageContext';
import { LanguageChange } from './components/LanguageChange';
import { Header } from './components/Header';
import { FeedbackForm } from './components/FeedbackForm';
import { getTranslations } from './data/translations';
import './App.css';

function App() {
  const { language } = useContext(LanguageContext);
  const [translations, setTranslations] = useState();

  useEffect(() => {
    getTranslations().then((data) => setTranslations(data));
  }, []);

  return (
    <div className="App">
      {translations ? (
        <>
          <Header translations={translations.main} />
          <main>
            <p>{translations.main.welcomeMessage[language]}</p>
            <LanguageChange translations={translations.main} />
            <FeedbackForm translations={translations.feedback} />
          </main>
        </>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}

export default App;

import React, { useContext } from 'react';
import { LanguageContext } from './components/LanguageContext';
import LanguageChange from './components/LanguageChange';
import { translations } from './data/translations';

function App() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="App">
      <header>
        <h1>{translations.appTitle[language]}</h1>
      </header>
      <main>
        <p>{translations.welcomeMessage[language]}</p>
        <LanguageChange />
      </main>
    </div>
  );
}

export default App;

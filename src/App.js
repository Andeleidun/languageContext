import React, { useContext } from 'react';
import { LanguageContext } from './components/LanguageContext';
import { LanguageChange } from './components/LanguageChange';
import { Header } from './components/Header';
import { FeedbackForm } from './components/FeedbackForm';
import { translations } from './data/translations';
import './App.css';

function App() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="App">
      <Header />
      <main>
        <p>{translations.welcomeMessage[language]}</p>
        <LanguageChange />
        <FeedbackForm />
      </main>
    </div>
  );
}

export default App;

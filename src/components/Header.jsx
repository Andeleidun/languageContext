import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../data/translations';

function Header() {
  const { language } = useContext(LanguageContext);

  return (
    <header>
      <h1>{translations.appTitle[language]}</h1>
    </header>
  );
}

export default Header;

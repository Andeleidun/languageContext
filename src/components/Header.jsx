import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

export function Header({ translations }) {
  const { language } = useContext(LanguageContext);

  return (
    <header>
      <h1>{translations.appTitle[language]}</h1>
    </header>
  );
}

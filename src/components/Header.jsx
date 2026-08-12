import React from 'react';
import { useLanguage } from './LanguageContext';

export function Header({ translations }) {
  const { language } = useLanguage();

  return (
    <header>
      <h1>{translations.appTitle[language]}</h1>
    </header>
  );
}

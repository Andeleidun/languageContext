import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../data/translations';

export function LanguageChange() {
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <div>
      <label>
        {translations.selectLanguage[language]}
        <select onChange={handleLanguageChange} value={language}>
          <option value="en">{translations.english[language]}</option>
          <option value="es">{translations.spanish[language]}</option>
        </select>
      </label>
    </div>
  );
}

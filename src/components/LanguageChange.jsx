import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

export function LanguageChange({ translations }) {
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value); // sets the current language to the value attribute of the chosen option
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

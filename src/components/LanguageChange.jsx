import { useLanguage } from './useLanguage';

export function LanguageChange({ translations }) {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <label>
      {translations.selectLanguage[language]}
      <select onChange={handleLanguageChange} value={language}>
        <option value="en">{translations.english[language]}</option>
        <option value="es">{translations.spanish[language]}</option>
      </select>
    </label>
  );
}

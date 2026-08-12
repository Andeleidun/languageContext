import { useLanguage } from './useLanguage';

export function Header({ translations }) {
  const { language } = useLanguage();

  return (
    <header>
      <h1>{translations.appTitle[language]}</h1>
    </header>
  );
}

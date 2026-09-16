import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from './LanguageContext';
import { useLanguage } from './useLanguage';

function LanguageControl() {
  const { language, setLanguage } = useLanguage();

  return (
    <button type="button" onClick={() => setLanguage('es')}>
      Current language: {language}
    </button>
  );
}

test('owns the document language and restores the prior value on cleanup', async () => {
  const user = userEvent.setup();
  document.documentElement.lang = 'fr';

  const { unmount } = render(
    <LanguageProvider>
      <LanguageControl />
    </LanguageProvider>
  );

  expect(document.documentElement).toHaveAttribute('lang', 'en');
  await user.click(
    screen.getByRole('button', { name: 'Current language: en' })
  );
  expect(document.documentElement).toHaveAttribute('lang', 'es');

  unmount();
  expect(document.documentElement).toHaveAttribute('lang', 'fr');
});

import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useLanguage } from './useLanguage';

test('fails clearly when used outside LanguageProvider', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  const preventExpectedError = (event) => event.preventDefault();

  window.addEventListener('error', preventExpectedError);

  try {
    expect(() => renderHook(() => useLanguage())).toThrow(
      'useLanguage must be used within a LanguageProvider.'
    );
  } finally {
    window.removeEventListener('error', preventExpectedError);
    consoleError.mockRestore();
  }
});

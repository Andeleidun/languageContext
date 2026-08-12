import React, { useEffect, useState } from 'react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { LanguageChange } from './components/LanguageChange';
import { Header } from './components/Header';
import { FeedbackForm } from './components/FeedbackForm';
import { getTranslations } from './data/translations';
import './App.css';

export function LanguageContextExample({ loadTranslations = getTranslations }) {
  const { language } = useLanguage();
  const [requestId, setRequestId] = useState(0);
  const [translationState, setTranslationState] = useState({
    status: 'loading',
    data: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;
    setTranslationState({ status: 'loading', data: null });

    async function loadTranslationsForRequest() {
      try {
        const data = await loadTranslations({ signal: controller.signal });

        if (isActive) {
          setTranslationState({ status: 'ready', data });
        }
      } catch (error) {
        const wasCancelled =
          error instanceof DOMException && error.name === 'AbortError';

        if (isActive && !wasCancelled) {
          setTranslationState({ status: 'error', data: null });
        }
      }
    }

    loadTranslationsForRequest();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [loadTranslations, requestId]);

  if (translationState.status === 'loading') {
    return (
      <main className="container loading-state">
        <div className="loader" aria-hidden="true" />
        <p role="status">Loading translations...</p>
      </main>
    );
  }

  if (translationState.status === 'error') {
    return (
      <main className="container error-state">
        <h1>React Language Context Tutorial</h1>
        <p role="alert">Translations could not be loaded.</p>
        <button type="button" onClick={() => setRequestId((id) => id + 1)}>
          Try again
        </button>
      </main>
    );
  }

  const { data: translations } = translationState;

  return (
    <div className="App container">
      <Header translations={translations.main} />
      <main>
        <p>{translations.main.welcomeMessage[language]}</p>
        <LanguageChange translations={translations.main} />
        <FeedbackForm translations={translations.feedback} />
      </main>
    </div>
  );
}

function App({ loadTranslations }) {
  return (
    <LanguageProvider>
      <LanguageContextExample loadTranslations={loadTranslations} />
    </LanguageProvider>
  );
}

export default App;

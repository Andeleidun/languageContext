export const translations = {
  main: {
    appTitle: {
      en: 'React Language Context Tutorial',
      es: 'Tutorial de Contexto de Idiomas en React',
    },
    welcomeMessage: {
      en: 'Welcome to our multilingual application!',
      es: '¡Bienvenido a nuestra aplicación multilingüe!',
    },
    selectLanguage: {
      en: 'Choose your preferred language:',
      es: 'Elige tu idioma preferido:',
    },
    english: {
      en: 'English',
      es: 'Inglés',
    },
    spanish: {
      en: 'Spanish',
      es: 'Español',
    },
  },
  feedback: {
    feedbackLabel: {
      en: 'Your feedback',
      es: 'Tu Retroalimentación',
    },
    feedbackPlaceholder: {
      en: 'Please provide your feedback',
      es: 'Por favor, proporciona tu retroalimentación',
    },
    ratingLabel: {
      en: 'Rate our service',
      es: 'Califica Nuestro Servicio',
    },
    ratingPlaceholder: {
      en: 'Select a rating',
      es: 'Selecciona una calificación',
    },
    ratingOptions: {
      excellent: {
        en: 'Excellent',
        es: 'Excelente',
      },
      good: {
        en: 'Good',
        es: 'Bueno',
      },
      average: {
        en: 'Average',
        es: 'Regular',
      },
      poor: {
        en: 'Poor',
        es: 'Malo',
      },
    },
    recommendLabel: {
      en: 'Would you recommend our service?',
      es: '¿Recomendarías nuestro servicio?',
    },
    recommendOptions: {
      yes: {
        en: 'Yes',
        es: 'Sí',
      },
      no: {
        en: 'No',
        es: 'No',
      },
    },
    submitButton: {
      en: 'Submit Feedback',
      es: 'Enviar Retroalimentación',
    },
    resetButton: {
      en: 'Clear Form',
      es: 'Limpiar Formulario',
    },
    feedbackTitle: {
      en: 'User Feedback',
      es: 'Retroalimentación de Usuarios',
    },
    submittedEntriesTitle: {
      en: 'Submitted Feedback',
      es: 'Retroalimentación Enviada',
    },
    feedbackSubmitted: {
      en: 'Feedback submitted.',
      es: 'Retroalimentación enviada.',
    },
    formCleared: {
      en: 'Form cleared.',
      es: 'Formulario limpiado.',
    },
    noSubmissions: {
      en: 'No feedback has been submitted.',
      es: 'No se ha enviado retroalimentación.',
    },
  },
};

function fetchTranslations({ signal } = {}) {
  return new Promise((resolve, reject) => {
    const handleAbort = () => {
      clearTimeout(timeoutId);
      reject(new DOMException('Translation request cancelled.', 'AbortError'));
    };
    const timeoutId = setTimeout(() => {
      signal?.removeEventListener('abort', handleAbort);
      resolve(translations);
    }, 300);

    if (signal?.aborted) {
      handleAbort();
      return;
    }

    signal?.addEventListener('abort', handleAbort, { once: true });
  });
}

export function getTranslations(options) {
  return fetchTranslations(options);
}

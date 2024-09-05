const translations = {
  main: {
    appTitle: {
      en: 'React Language Context Tutorial',
      es: 'Tutorial de Contexto de Idiomas en React',
    },
    greeting: {
      en: 'Hello',
      es: 'Hola',
    },
    welcomeMessage: {
      en: 'Welcome to our multilingual application!',
      es: '¡Bienvenido a nuestra aplicación multilingüe!',
    },
    changeLanguage: {
      en: 'Switch Language',
      es: 'Cambiar Idioma',
    },
    language: {
      en: 'Language',
      es: 'Idioma',
    },
    selectLanguage: {
      en: 'Choose your preferred language:',
      es: 'Elige tu idioma preferido:',
    },
    home: {
      en: 'Home',
      es: 'Inicio',
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
      en: 'Your Feedback',
      es: 'Tu Retroalimentación',
    },
    feedbackPlaceholder: {
      en: 'Please provide your feedback',
      es: 'Por favor, proporciona tu retroalimentación',
    },
    ratingLabel: {
      en: 'Rate Our Service',
      es: 'Califica Nuestro Servicio',
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
  },
};

export async function fetchTranslations() {
  return new Promise((resolve, reject) => {
    try {
      resolve(() => translations);
    } catch (error) {
      console.error('Translation fetching failed: ', error);
      reject(translations); // provide backup translations
    }
  });
}

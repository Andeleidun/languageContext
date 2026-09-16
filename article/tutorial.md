# Share language state with React Context without storing translated labels

A language switcher looks simple until several parts of the interface need the
same selection. Passing a language prop through every intermediate component
couples those components to a value they do not use. Storing visible labels in
form state creates a different problem: saved data becomes stale as soon as the
language changes.

In this tutorial you will build a small English and Spanish feedback interface.
React Context owns the selected language, the provider keeps the document
`lang` attribute synchronized, and the form stores stable values such as
`good` and `yes`. Changing languages then changes the labels for both current
controls and previously submitted entries.

The example also treats translation loading as a real asynchronous boundary.
It exposes loading, failure, retry, cancellation, and stale-result behavior
without pretending that its local JavaScript object is a production
internationalization system.

## What you need

You should already understand React components, props, state, and effects. Use
one of the Node.js ranges declared by this repository: Node.js 20.19 or later
in major 20, Node.js 22.13 or later in major 22, or Node.js 24 or later. You
also need npm and a browser with `AbortController`.

The repository locks React 18.3.1 and Vite 8.2.1. React's current documentation
may show newer provider syntax, so this tutorial follows the React 18 provider
API that the example actually runs.

<!-- twa:step id=STEP-01 -->
## Run the finished interface

Install the locked dependency graph and start the development server from the
repository root.

<!-- twa:snippet id=SNIP-01 class=command -->
```sh
npm ci
npm run dev
```

Open the URL printed by Vite. Wait for the English interface, choose Spanish,
complete the feedback form, submit it, and switch back to English. The heading,
controls, status, and saved choice labels should follow the active language.
The feedback text itself remains exactly what you entered.

Stop the server with `Ctrl+C`. The example creates no account, remote data,
persistent browser storage, service worker, or background process.

<!-- twa:step id=STEP-02 -->
## Define a guarded Context boundary

Start with a nullable Context rather than a usable default object. A consumer
outside the provider can then fail close to the mistake instead of silently
reading state that no component owns.

<!-- twa:snippet id=SNIP-02 class=canonical -->
```js
import { createContext } from 'react';

export const DEFAULT_LANGUAGE = 'en';
export const LanguageContext = createContext(null);
```

Wrap `useContext` in a small application hook. The explicit error names the
missing boundary and makes component tests and runtime failures actionable.

<!-- twa:snippet id=SNIP-03 class=canonical -->
```js
import { useContext } from 'react';
import { LanguageContext } from './languageContextState';

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider.');
  }

  return context;
}
```

This guard is part of this example's contract. React supplies the nearest
provider value; the custom hook supplies the application-specific invariant.

<!-- twa:step id=STEP-03 -->
## Own language and document metadata together

The provider owns the selected language because every translated descendant
needs the same value. It also synchronizes the root HTML `lang` attribute, an
external browser-owned value, in an effect. Cleanup restores the value that
existed before this provider wrote it.

<!-- twa:snippet id=SNIP-04 class=canonical -->
```jsx
import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANGUAGE, LanguageContext } from './languageContextState';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = language;

    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
```

The memoized value changes when `language` changes. Consumers therefore render
with the new language and keep the same setter function. The effect cleanup is
also safe during React's development setup and cleanup probe because each setup
records the value it must restore.

<!-- twa:step id=STEP-04 -->
## Connect a native language control

The switcher reads and writes the provider value. The option values remain
stable language identifiers while the visible option labels come from the
active translation bundle.

<!-- twa:snippet id=SNIP-05 class=canonical -->
```jsx
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
```

Using a native labeled select preserves the browser's keyboard and form
interaction model. A production language control may also need locale
negotiation, persistence, translated language names, bidirectional layout, and
a product-specific fallback policy.

<!-- twa:step id=STEP-05 -->
## Treat translation loading as a fallible boundary

`LanguageContextExample` owns translation loading because the provider should
not also own transport state. Each effect setup creates an `AbortController`
and an active-result guard. Cleanup aborts a cooperative loader and prevents an
older non-cooperative loader from committing stale data.

<!-- twa:snippet id=SNIP-06 class=excerpt -->
```jsx
  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;
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
```

Loading renders a polite status. A failure renders an English alert and a
`Try again` button because no translated fallback bundle is available. Retry
returns the state to loading and increments `requestId`, which starts a new
effect setup.

The bundled loader only waits and returns trusted in-memory data. It exists to
teach the boundary. A production loader must authenticate its source, validate
responses, define caching and fallback behavior, and avoid leaking sensitive
content in diagnostics.

<!-- twa:step id=STEP-06 -->
## Store semantic form values

The form's `rating` field stores keys such as `good`; `recommend` stores `yes`
or `no`. Rendering resolves those keys through the current translation object:

<!-- twa:snippet id=SNIP-07 class=excerpt -->
```jsx
              <div>
                <strong>{translations.ratingLabel[language]}:</strong>
                {translations.ratingOptions[entry.rating][language]}
              </div>
              <div>
                <strong>{translations.recommendLabel[language]}:</strong>
                {translations.recommendOptions[entry.recommend][language]}
              </div>
```

If the form stored `Good` and `Yes`, an existing entry would keep those English
strings after the interface changed to Spanish. Stable keys preserve meaning;
translation happens when the interface renders. The user's free-form feedback
is content, so the example does not translate or rewrite it.

The form uses labeled native controls, a fieldset and legend for the radio
group, required validation, and an atomic status for submit and clear results.
Those implementation choices are testable DOM behavior. They do not establish
translation quality, screen-reader usability, contrast, zoom, reflow, or full
accessibility conformance.

<!-- twa:step id=STEP-07 -->
## Prove the behavior and recover safely

Run the complete local gate. It checks formatting, lint, all behavior tests,
article bindings, the teaching-history bundle, and the production build.

<!-- twa:snippet id=SNIP-08 class=command -->
```sh
npm run check
```

One integration test proves the semantic-value outcome across a language
change. The marked excerpt is copied exactly from the repository test.

<!-- twa:snippet id=SNIP-09 class=excerpt -->
```jsx
test('renders saved semantic choices in the newly selected language', async () => {
  const user = userEvent.setup();
  render(<App loadTranslations={() => Promise.resolve(translations)} />);

  await screen.findByRole('heading', { name: 'User Feedback' });
  await user.type(screen.getByLabelText('Your feedback'), 'Clear example');
  await user.selectOptions(screen.getByLabelText('Rate our service'), 'good');
  await user.click(screen.getByLabelText('Yes'));
  await user.click(screen.getByRole('button', { name: 'Submit Feedback' }));

  await user.selectOptions(
    screen.getByLabelText('Choose your preferred language:'),
    'es'
  );

  const savedEntry = screen.getByRole('listitem');
  expect(within(savedEntry).getByText('Clear example')).toBeInTheDocument();
  expect(within(savedEntry).getByText('Bueno')).toBeInTheDocument();
  expect(within(savedEntry).getByText('Sí')).toBeInTheDocument();
  expect(within(savedEntry).queryByText('Good')).not.toBeInTheDocument();
});
```

The rest of the suite covers the guarded hook, document-language restoration,
loading, rejection, synchronous loader failure, retry, cancellation-resistant
stale results, submission, and translated status text.

If installation fails, confirm the Node.js version and rerun `npm ci` with the
committed lockfile. If the production bundle is stale, remove generated `dist`
output and rerun the gate. Reloading resets the in-memory language and feedback
state. Do not run the repository's deployment script as a verification step.

Before any release claim, perform keyboard, zoom, reflow, forced-color, visual,
and representative assistive-technology review. A fluent Spanish reviewer must
also review the translation copy. Record the exact environment and observed
result separately from the automated evidence.

## Production boundary and sources

This example deliberately excludes pluralization, interpolation, locale
negotiation, right-to-left layout, persistence, authenticated remote delivery,
and production diagnostics. Start with a dedicated internationalization system
when those requirements exist.

The source register in [`sources.md`](../sources.md) records the primary React,
HTML language, browser API, Vite, and Node.js sources, their applicability to
the locked implementation, and the unresolved asset-provenance release gate.
The repository source and tests remain canonical for this example's behavior.


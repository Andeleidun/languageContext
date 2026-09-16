# Design: Share Language State with React Context

## Outcome

The reader can trace one selected language through a guarded Context boundary,
the root document language, translated controls, and saved feedback whose
stored values remain stable when visible labels change.

## Non-goals

- Replacing a production internationalization library.
- Fetching untrusted or remote translation data.
- Locale detection, routing, persistence, message formatting, pluralization,
  interpolation, or right-to-left layout.
- Sending or persisting feedback.
- Deploying the existing GitHub Pages target.

## Ownership and boundaries

- `languageContextState.js` owns the nullable context and default language.
- `LanguageProvider` owns current language and the document `lang` side effect.
- `useLanguage` owns the consumer invariant and actionable misuse error.
- `LanguageContextExample` owns the asynchronous translation lifecycle,
  cancellation, stale-result denial, error state, and retry generation.
- `FeedbackForm` owns draft and submitted feedback. It stores stable translation
  keys and resolves their labels only while rendering.
- `translations.js` is trusted synthetic data and an asynchronous teaching
  adapter, not a production response contract.

## Accepted requirements

| ID    | Requirement                                                                                                 | Validation                                     |
| ----- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| LC-01 | A consumer outside `LanguageProvider` fails with an actionable error                                        | focused hook misuse test                       |
| LC-02 | The provider synchronizes `document.documentElement.lang` and restores the prior value on cleanup           | switch and unmount tests                       |
| LC-03 | Translation loading exposes loading, ready, failure, retry, cancellation, and stale-result behavior         | application tests with injected loaders        |
| LC-04 | Submitted form data stores semantic values and re-renders in the active language                            | submission and post-switch assertions          |
| LC-05 | The interface uses native labeled controls, grouped radio choices, useful status text, and logical headings | semantic queries and manual interaction review |
| LC-06 | The complete pair is reproducible from its lockfile and exact child ref                                     | child gate and fresh-checkout review           |
| LC-07 | Article steps, snippets, commands, and claims remain bound to source                                        | static tutorial verifier                       |

## Failure and recovery

A rejected or synchronously throwing loader produces an English recovery view
with a retry control. Cleanup aborts the active synthetic request and marks its
result inactive. The active flag also protects against injected loaders that do
not honor cancellation. Reloading resets all in-memory state. Installation and
build failures recover through the committed lockfile and regenerated output.

The error view remains English because the translation bundle is unavailable.
A production system needs an independently owned fallback locale and message
catalog for this state.

## Accessibility and localization evidence

Automated tests can establish exercised DOM language, roles, names, values,
status content, and keyboard-operable native controls. They do not establish
translation quality, screen-reader usability, contrast, zoom, reflow, or
high-contrast behavior. A fluent Spanish review and proportional manual browser
and assistive-technology review remain separate release evidence.

## Teaching checkpoints

1. Establish the locked Vite example and portability rules.
2. Define guarded language state and own the document-language lifecycle.
3. Add the cancellable synthetic translation source.
4. Connect the translated feedback workflow and prove semantic persistence.

Each checkpoint matches one additive commit in the constructed teaching
history and owns a unique set of example paths.

## Review limits

This design teaches Context ownership and stable semantic form data. It does
not validate external translations or establish a complete localization,
accessibility, browser-support, security, or deployment system.

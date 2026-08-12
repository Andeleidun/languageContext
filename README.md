# React language context example

This example shows a complete React Context boundary for switching an
interface between English and Spanish. It loads a synthetic translation bundle,
updates the document language, translates a feedback workflow, and provides
loading, error, retry, reset, and submission states.

## Audience and outcome

This repository is for React developers who understand components, props,
state, and effects and want to learn when Context is a good owner for shared
language state. After running it, you can trace a language selection from the
provider through translated headings, controls, feedback entries, and the
document `lang` attribute.

This is a focused client-side example. It is not an internationalization
library or a production translation delivery system.

## Mental model

`LanguageProvider` owns the current language. `useLanguage` exposes that state
and fails clearly when a consumer is rendered outside the provider. Components
store semantic values such as `good` and `yes`, then resolve their visible text
from the current translation bundle. Changing the language therefore updates
existing content without rewriting stored form data.

`App` owns translation loading because the bundle crosses an asynchronous
boundary. It cancels an obsolete request on cleanup and renders explicit
loading, error, and retry states.

## Run the example

Prerequisites:

- Node.js 20.19 or later in the 20.x line, Node.js 22.13 or later in the
  22.x line, or Node.js 24 or later, with npm.
- A browser that supports `AbortController`.

From this directory:

```sh
npm ci
npm run dev
```

Open the local URL printed by the development server. Select Spanish, submit a
feedback entry, and switch back to English. The saved semantic choices remain
correct while their labels change language.

## Verify the example

Run static analysis and the behavior tests once:

```sh
npm run lint
npm run test:ci
```

Create the production bundle:

```sh
npm run build
```

Run `npm run preview` to inspect the generated `dist` directory locally.

The tests cover initial loading, document-language synchronization, translated
content, feedback submission, the live submission status, failure, and retry.
They do not prove screen-reader behavior, visual contrast, zoom, reflow, or
production translation-service integration.

## Failure and recovery

The bundled loader resolves synthetic in-memory data after a short delay. The
application still treats it as a fallible boundary so a real loader can reject
and expose the retry path. Tests inject a rejected request to verify that path.

If installation fails, remove the generated `node_modules` directory and run
`npm ci` again with the committed lockfile. If a production build is stale,
remove the generated `dist` directory and rerun `npm run build`. Reloading the
page resets all in-memory language and feedback state.

Stop the development server with `Ctrl+C`. The example creates no account,
remote data, persistent browser storage, or background service.

## Accessibility behavior

- Native labels, selects, radio buttons, text areas, and buttons provide the
  interaction model.
- The provider keeps the root document `lang` attribute synchronized.
- Loading and form results use polite status messages. Loading decoration is
  hidden from assistive technology.
- Visible focus is preserved, and nonessential animation stops when the user
  requests reduced motion.

Manual keyboard, zoom, high-contrast, and assistive-technology review is still
required for a release claim.

## Dependency security status

On 2026-08-11, the exact Vite 8.2.1 and Vitest 4.1.10 dependency closure
reported zero known vulnerabilities through npm audit. This replaces the
retired Create React App dependency tree that previously reported 28 findings.
Re-run the audit whenever the lockfile changes because registry advisories and
the resolved closure can change.

## Limits and production differences

- The bundle contains only English and Spanish and has no pluralization,
  interpolation, locale negotiation, right-to-left layout, or persistence.
- Translation data is trusted local JavaScript. A production loader should
  authenticate its source, validate the response, define cache and fallback
  policy, and record useful diagnostics without exposing sensitive content.
- Feedback is stored only in component memory and is intentionally not sent.
- Git history preserves the earlier React 18 and Create React App 5 checkpoint.
  The current checkpoint uses Vite 8.2.1 and Vitest 4.1.10 while keeping the
  application behavior and React version stable.
- Vite 8 targets its current modern browser baseline by default. Confirm the
  production browser support policy before delivery and add a reviewed legacy
  build strategy only when the intended audience requires it.

## Sources

- [React: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React: `useContext`](https://react.dev/reference/react/useContext)
- [React: Sunsetting Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)
- [Vite: Getting Started](https://vite.dev/guide/)
- [Vitest: Getting Started](https://vitest.dev/guide/)

## License

The existing [MIT License](LICENSE) applies to this example repository.

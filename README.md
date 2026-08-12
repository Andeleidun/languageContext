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

- A current Node.js LTS release with npm.
- A browser that supports `AbortController`.

From this directory:

```sh
npm ci
npm start
```

Open the local URL printed by the development server. Select Spanish, submit a
feedback entry, and switch back to English. The saved semantic choices remain
correct while their labels change language.

## Verify the example

Run the behavior tests once:

```sh
npm run test:ci
```

Create the production bundle:

```sh
npm run build
```

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
remove the generated `build` directory and rerun `npm run build`. Reloading the
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

On 2026-08-11, a non-forced `npm audit fix` reduced this repository's
`npm audit --omit=dev` result from 64 findings to 28: 9 low, 5 moderate,
and 14 high. A second safe remediation pass made no further change. The
remaining chains are owned by Create React App's build, test, asset, and
development-server dependencies. npm's forced proposal would install the
invalid `react-scripts@0.0.0` package and was not applied.

Treat the remaining findings and the unmaintained toolchain as a production
release blocker. Run the development server only against trusted local source,
do not expose it to an untrusted network, and migrate the example before using
its toolchain for production delivery. Re-audit the migrated exact lockfile.

## Limits and production differences

- The bundle contains only English and Spanish and has no pluralization,
  interpolation, locale negotiation, right-to-left layout, or persistence.
- Translation data is trusted local JavaScript. A production loader should
  authenticate its source, validate the response, define cache and fallback
  policy, and record useful diagnostics without exposing sensitive content.
- Feedback is stored only in component memory and is intentionally not sent.
- This repository preserves its React 18 and Create React App 5 teaching
  checkpoint. Create React App is deprecated. New applications should follow
  current React guidance and choose an actively maintained framework or build
  tool; migrate this example only as a separately reviewed compatibility change.

## Sources

- [React: Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React: `useContext`](https://react.dev/reference/react/useContext)
- [React: Sunsetting Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)

## License

The existing [MIT License](LICENSE) applies to this example repository.

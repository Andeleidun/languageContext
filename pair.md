# Pair Record: React Language Context

**Pair ID:** `react-language-context`  
**Status:** internal technical candidate; release blocked  
**Distribution:** internal candidate  
**Sensitivity:** public synthetic content

## Source basis

- Inspected child HEAD: `1270acd8901ea23ac348e6fd702fa8705e1f7314`.
- The child worktree was clean at intake. Current uncommitted changes belong to
  this authorized pair implementation.
- The parent gitlink has not been advanced; a final immutable candidate ref is
  still required before release review.

## Teaching contract

- **Reader:** a React developer who understands components, props, state, and
  effects and wants to choose an owner for shared language state.
- **Outcome:** run a two-language interface, trace the selected language through
  Context and the document `lang` attribute, submit feedback as semantic values,
  and render the saved entry correctly after changing languages.
- **Prerequisites:** Node.js 20.19 or later in major 20, Node.js 22.13 or later
  in major 22, or Node.js 24 or later, plus npm and a modern browser with
  `AbortController`.
- **Environment:** React 18.3.1, a Vite browser application, synthetic in-memory
  translations, and in-memory feedback state.
- **Non-goals:** a production internationalization library, remote translation
  delivery, locale negotiation, pluralization, interpolation, right-to-left
  layout, persistence, deployment, and publication.

## Canonical artifacts

- Article: `article/tutorial.md`
- Runnable example: this repository root
- Example documentation: `README.md`
- Design and requirements: `design.md`
- Teaching history: `history.md`
- Teaching bundle: `teaching-history.bundle`
- Verification: `verification.md`
- Sources and provenance: `sources.md`
- Static reconciliation: `scripts/verifyTutorial.mjs`

The repository source is canonical for executable behavior. The human-readable
records follow the internal format used by the newer TWA pairs. The current TWA
v1 workflow does not model a repository-root example, so no generated pair lock
or release approval is claimed.

## Directional decisions

- **DG-01 AudienceOutcome:** preserve the README's React audience and teach one
  observable language-state flow through the provider, form, saved values, and
  document language.
- **DG-02 ProductBoundary:** keep translation data synthetic and local while
  modeling loading, failure, retry, cancellation, and stale-result protection.
- **DG-03 ArchitectureDirection:** let `LanguageProvider` own language state,
  let `App` own asynchronous translation loading, and store semantic form values
  instead of translated labels.
- **DG-04 HistoryPackaging:** preserve `main`; construct a separate additive
  teaching repository and retain its exact internal bundle.
- **DG-05 DistributionRights:** keep the pair internal until prose, dependency,
  asset, translation, and existing MIT license scope have been reviewed.
- **DG-06 CompatibilityMigration:** retain React 18.3.1 and the current Vite 8
  toolchain; do not upgrade for symmetry with the React 19 animation tutorial.
- **DG-07 ReleaseApproval:** not open. The pair, manual evidence, immutable
  child ref, supported sealing workflow, and destination are incomplete.

## Requirement traceability

| Requirement                           | Implementation                                                     | Validation                                                      |
| ------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| LC-01 guarded Context access          | `LanguageContext.jsx`, `languageContextState.js`, `useLanguage.js` | provider and outside-provider tests                             |
| LC-02 document language ownership     | `LanguageContext.jsx`                                              | language switch and provider cleanup tests                      |
| LC-03 cancellable translation loading | `App.jsx`, `translations.js`                                       | loading, rejection, retry, cancellation, and stale-result tests |
| LC-04 semantic feedback state         | `FeedbackForm.jsx`                                                 | submit, language-switch, and translated saved-entry assertions  |
| LC-05 semantic interaction            | native form controls and status regions                            | role, label, status, keyboard, and manual interface review      |
| LC-06 explicit recovery               | error view and retry action in `App.jsx`                           | synchronous and asynchronous loader failure tests               |
| LC-07 article-to-code agreement       | article markers and `verifyTutorial.mjs`                           | exact canonical, excerpt, command, and history checks           |
| LC-08 truthful production boundary    | article, README, and `sources.md`                                  | technical, localization, accessibility, and rights review       |

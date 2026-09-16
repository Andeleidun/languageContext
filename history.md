# Teaching History: React Language Context

**Format:** standalone Git bundle  
**Bundle:** `teaching-history.bundle`  
**Branch:** `main`  
**Bundle head:** `0b431f29869b7d7ca4b8e8ce318e94cd89f5b05f`  
**Identity:** `Technical Writing Assistant <twa@example.invalid>`  
**Constructed:** 2026-09-15

## Purpose and boundary

This bundle contains a separate additive learner history. It does not rewrite,
merge with, or add refs to this child repository's existing `main` history.
The teaching repository has no configured remote and no tags. Pair records,
article files, README content, verification tooling, and the bundle itself are
outside its declared example snapshot.

## Checkpoints

| Step | Commit                                     | Learner outcome                                                         | Files introduced                                                    | Check completed before promotion                                                                 |
| ---- | ------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1    | `0e10a3519adefce8d5f7098fc36a9e5898412b6b` | Establish the locked Vite example and portability rules                 | configuration, lockfile, license, HTML, and public assets           | `npm ci --ignore-scripts`                                                                        |
| 2    | `9e1bed532aef23444d64511ca7660f3d1498794d` | Define guarded language state and document-language ownership           | Context state, provider, hook, setup, and focused tests             | `npm run test:ci -- src/components/useLanguage.test.jsx src/components/LanguageContext.test.jsx` |
| 3    | `e2a04052c0f07b20df8c2be819654f41135c241f` | Add the cancellable synthetic translation source                        | `src/data/translations.js`                                          | ESLint on the translation source                                                                 |
| 4    | `0b431f29869b7d7ca4b8e8ce318e94cd89f5b05f` | Connect the translated feedback workflow and prove semantic persistence | application, components, styles, entry point, and integration tests | lint, complete test suite, and production build                                                  |

Each example path enters the learner history in one checkpoint. The final
snapshot contains only the allowlisted runnable-example files enforced by
`scripts/verifyTutorial.mjs`.

## Reconstruction and verification

From this repository root, reconstruct the branch in a disposable directory:

```sh
git clone --branch main teaching-history.bundle reconstructed-language-context
```

The repository verifier checks bundle validity, the sole branch ref, linear
parentage, author and committer identity, recorded checkpoint hashes, disjoint
checkpoint path ownership, allowlisted file-set parity, and byte parity with
the current example. Remove the disposable reconstruction after inspection.

The bundle is internal evidence. Its legacy image assets remain subject to the
rights limit recorded in `sources.md`.

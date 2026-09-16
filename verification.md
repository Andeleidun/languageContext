# Verification Record: React Language Context

**Record date:** 2026-09-15  
**Candidate state:** uncommitted internal worktree  
**Basis HEAD:** `1270acd8901ea23ac348e6fd702fa8705e1f7314`  
**Bundle head:** `0b431f29869b7d7ca4b8e8ce318e94cd89f5b05f`

## Execution environment and frozen hashes

- Windows in the repository workspace
- Node.js 24.15.0
- npm 11.14.1
- React and build-tool versions from the exact lockfile

| Artifact                  | SHA-256                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| `article/tutorial.md`     | `8bc972f524a098d5f6ebe923d9edd8155147f9abe81528bf7cf1ebfbe9436fd5` |
| `README.md`               | `55c420a0f8af9ed24fdac7bb19cafd18d5d694e38060c1b80398774e2a681c12` |
| `package-lock.json`       | `e96c71fe70ba956a65238cd9db122daac2070c781a98bd5f73527197a4ebc526` |
| `teaching-history.bundle` | `2295744b58e7e271ebeb4e95d9896d8ea4083972e799de5530cc31a347142b4f` |

## Automated evidence

| Lane                      | Status   | Observation                                                                                                    |
| ------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| Focused proof additions   | `passed` | 3 files and 3 tests passed after suppressing only the expected outside-provider browser error                  |
| Complete behavior suite   | `passed` | 4 files and 8 tests passed on the current worktree                                                             |
| Teaching checkpoints      | `passed` | four additive commits each passed its recorded install, focused, lint, test, or build check                    |
| Tutorial reconciliation   | `passed` | 7 steps, 9 snippets, and 30 exact teaching snapshot files reconciled                                           |
| Format, lint, and build   | `passed` | Prettier check, ESLint, and Vite 8.2.1 production build passed                                                 |
| Composite `npm run check` | `passed` | complete gate passed after the Vitest 4.1.11 update and history rebuild                                        |
| Dependency audit          | `passed` | after updating Vitest to 4.1.11, `npm audit --json` reported zero known vulnerabilities for the exact lockfile |

## Manual evidence

| Review                          | Status            | Required scope                                                                                                     |
| ------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| Article and README rendering    | `manual_required` | headings, links, fences, wrapping, and standalone comprehension                                                    |
| Keyboard and visible focus      | `manual_required` | language selection, form completion, submit, clear, retry, and focus visibility                                    |
| Zoom, reflow, and forced colors | `manual_required` | 200 and 400 percent zoom, narrow layout, and supported high-contrast mode                                          |
| Assistive technology            | `manual_required` | document language changes, labels, status results, and recovery flow in a representative browser and screen reader |
| Spanish copy                    | `manual_required` | fluent review of all reader-facing translations                                                                    |
| Asset and license scope         | `blocked`         | legacy favicon and logo provenance requires owner review before external distribution                              |

## Evidence limits

The current child HEAD does not identify the uncommitted pair snapshot. Passing
commands establish only the inspected worktree bytes. No release approval,
remote reachability, publication, deployment, screen-reader announcement,
translation quality, or complete accessibility conformance is claimed.

# Acceptance Contract and Development Issue Approval

## Decision

Approved for the three Code Development stages on 2026-08-25.

The [natural-language acceptance contract](10-natural-language-acceptance-contract.md) contains 34 confirmed facts, 27 detailed cases, a classified inventory, and a fact-to-case coverage matrix. Every confirmed fact is covered by at least one focused or cross-functional case.

## Source decision

- The product contract remains the behavioral and permission authority.
- The Figma Design and high-fidelity Make handoffs remain the visual and responsive authority.
- The acceptance contract is the development verification authority.
- The Design handoff reference to editable Status and Response Notes is explicitly excluded because it conflicts with the product contract. Only Owner mutation for an open incident by an Incident Lead is authorized.
- Cross-session persistence, production services, browser compatibility matrices, and localization remain outside this demo's approved boundary.

## Development Issues

### Issue 1 — Queue, search, and filters

- [#1 Implement incident queue, search, and filters](https://github.com/pfcstyle/agentic-engineering-demo-codex/issues/1)
- Primary coverage: `NLT-Q-01` through `NLT-Q-05`.
- Supporting coverage: applicable queue semantics from `NLT-A-01` through `NLT-A-03`, plus the discovery portion of `NLT-J-01`.
- Required outcome: deterministic 20-item queue, approved ordering, five-field case-insensitive search, AND filters, visible criteria, truthful count, clearing, No Results/Empty distinction, keyboard and accessibility foundations.

### Issue 2 — Details, permissions, and recovery

- [#2 Implement incident details, permissions, and recovery flows](https://github.com/pfcstyle/agentic-engineering-demo-codex/issues/2)
- Primary coverage: `NLT-Q-06`, `NLT-D-01` through `NLT-D-07`, and `NLT-S-01` through `NLT-S-04`.
- Journey coverage: `NLT-J-01` and `NLT-J-02`.
- Required outcome: complete details, context/focus preservation, Lead owner edit, Analyst/Closed read-only behavior, saving/success/failure/Retry integrity, loading/load recovery, reset, and accessible drawer/sheet behavior.

### Issue 3 — Visual, responsive, and state integration

- [#3 Integrate approved visual design, responsive layouts, and states](https://github.com/pfcstyle/agentic-engineering-demo-codex/issues/3)
- Primary coverage: `NLT-R-01` through `NLT-R-04`, `NLT-A-01` through `NLT-A-03`, and `NLT-O-01`.
- Journey coverage: final desktop/mobile execution of `NLT-J-01` and `NLT-J-02`.
- Required outcome: Graphite Warmth integration, desktop/tablet/mobile transformations, all approved visual states, WCAG 2.2 AA targets, non-color cues, keyboard/focus semantics, announcements, reduced motion, and no scope expansion.

## Issue quality checks

- [x] Each Issue uses an English imperative title.
- [x] Each Issue contains product sources, scope, Acceptance Criteria, out-of-scope boundaries, and verification references.
- [x] Each Issue has more than five concrete, testable Acceptance Criteria.
- [x] Acceptance Criteria cite fact IDs and natural-language case IDs.
- [x] Existing repository labels `enhancement` and `accessibility` are applied.
- [x] Issues are assigned to the current GitHub user by the issue-creation workflow.
- [x] No duplicate Issues or pull requests existed before creation.
- [x] No GitHub Project Board is used.

## Execution order

Develop Issues in numeric order. Each Issue receives an isolated `codex/` branch and worktree, focused tests and build verification, a PR targeting `develop`, independent review, fixes for valid findings, retesting, and merge before the next Issue begins.

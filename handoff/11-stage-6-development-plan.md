# Stage 6 Development Plan and Design Input Contract

## Decision

Stage 6 implements the Incident Triage Dashboard in three reviewed pull requests. This plan was produced after reading the approved product contract, the Version 7 Figma Make source (`src/App.tsx` and its linked components), the four approved Figma Design contexts, the Design handoff, and the natural-language acceptance contract.

The implementation must not approximate the product from screenshots or replace the approved visual system with an unrelated style.

## Source precedence

1. [Product contract](01-product-contract.md): behavior, permissions, scope, and recovery rules.
2. Figma Make Version 7: observable state transitions, deterministic controls, and the working interaction model.
3. [Approved Design handoff](06-figma-design-handoff.md): Graphite Warmth presentation and responsive rules.
4. Approved Figma Design contexts:
   - Desktop Queue: `27:919`
   - Lead Drawer: `27:1120`
   - Mobile Queue: `32:1116`
   - Mobile Detail: `32:1257`
5. [Natural-language acceptance contract](10-natural-language-acceptance-contract.md): test oracle.

When the Design handoff suggests editable Status or Response Notes, the product contract wins: only an Incident Lead may change Owner for an open incident. No other incident field is mutable.

## Shared implementation contract

- Build a React, TypeScript, and Vite single-page demo with a deterministic local 20-incident fixture. Do not add an API, network request, credential, or backend dependency.
- Model role, source mode, save outcome, criteria, selection, committed owner, proposed owner, and save lifecycle as explicit state. A successful owner change persists only for the current browser session.
- Default sort: non-Closed before Closed, then Critical/High/Medium/Low, descending update time, then stable incident ID.
- Fixture proof points: `payments` search returns 4 of 20; `Critical` returns 5; `Critical` plus `Identified` returns No Results; `INC-0003` supports the failure/retry owner regression.
- Search matches ID, title, service, team, and owner without case sensitivity. Severity, status, and team groups combine with search using AND semantics; selected values inside one group use OR semantics.
- CSS tokens must implement Graphite Warmth: base `#2B2E36`, card `#33363F`, elevated `#3F4350`, primary text `#E8E4DF`, secondary text `#A8A3A0`, disabled `#706B68`, focus `#89B4E8`, and error `#D9725B`.
- Present text plus a non-color cue for severity, status, permissions, and errors. Use 44 px desktop rows, 44 by 44 px mobile targets, visible 2 px offset focus, and reduced-motion handling.
- At `>=1200px`, show a dense table with a simultaneous right drawer; at `768–1199px`, use reduced metadata plus an accessible overlay drawer; below `768px`, use cards and a full-height detail sheet.

## Issue 1 — Build queue, search, filters, and deterministic data

### Scope

- Scaffold the application, domain types, immutable fixture, sort/filter helpers, Graphite Warmth token layer, header, search, filter controls, active criteria, result count, desktop table, and mobile-card shell.
- Implement normal, No Results, Empty Source, and accessible result-count feedback.
- Preserve a stable row/card activation callback and origin element for the detail implementation in Issue 2.

### Exclusions

- No detail drawer, owner mutation, save recovery, or final responsive drawer/sheet integration.

### Acceptance and verification

- Meet `NLT-Q-01` through `NLT-Q-05` and the applicable accessibility foundations in `NLT-A-01` through `NLT-A-03`.
- Unit-test fixture cardinality/order, five-field search, filter semantics, clear behavior, and zero-state distinction.
- Component-test labels, live count, active criteria, and keyboard controls; browser-test the desktop queue, search/filter intersection, No Results, and Empty Source.

## Issue 2 — Build details, permissions, and recovery

### Scope

- Implement drawer/detail context, role-aware Owner controls, selected-incident context preservation, accessible focus handling, deterministic source modes, save state machine, retry, reset, and demo controls.
- Lead may change only Owner on an open incident. Analyst and Closed contexts show complete details but no mutation control, with plain-language explanations.
- Saving follows `idle → saving → success` or `idle → saving → failure`; failure retains the proposal and committed queue owner, and Retry reuses the proposal.
- Load Error replaces results only, enters Loading on Retry, and restores the filtered normal source. Closing returns focus to the invoking row or card.

### Exclusions

- No Status/Response Notes edit and no final visual-responsive integration beyond the accessible overlay primitive.

### Acceptance and verification

- Meet `NLT-Q-06`, `NLT-D-01` through `NLT-D-07`, and `NLT-S-01` through `NLT-S-04`.
- Cover reducer integrity, duplicate-save prevention, focus movement/restoration, read-only branches, failure/retry, source recovery, and reset.
- Browser-test the Version 7 regression: `INC-0003 → Chen Wei → Failure → Success retry`.

## Issue 3 — Integrate Approved Design, responsive states, and accessibility

### Scope

- Map `27:919` to the desktop header, search/filters, count, dense 44 px queue, and selected-row treatment.
- Map `27:1120` to the Lead open-incident drawer while retaining the Owner-only product permission.
- Map `32:1116` to mobile cards and `32:1257` to the mobile full-height, titled detail sheet with sticky back/close controls.
- Complete visual implementations of loading, empty, No Results, Analyst/Closed read-only, Load Error/Retry, Save Failure/Retry, focus, non-color status cues, and reduced motion.

### Acceptance and verification

- Meet `NLT-R-01` through `NLT-R-04`, `NLT-A-01` through `NLT-A-03`, `NLT-J-01`, `NLT-J-02`, and `NLT-O-01`.
- Run browser checks at desktop, tablet, and mobile widths; test keyboard queue-to-detail flow, modal containment, Escape, focus restoration, announcements, and reduced motion.
- Compare the rendered desktop queue, Lead drawer, mobile cards, and mobile detail sheet against their approved Figma contexts before review.

## Delivery protocol

For each Issue, create an isolated `codex/` worktree/branch, re-read its Figma Make source and Design context before coding, run focused tests plus lint/build, create a PR to `develop`, obtain an independent review, fix valid findings, retest, merge, and verify the Issue closure. After Issue 3, run the complete regression suite and record evidence in the manifest.

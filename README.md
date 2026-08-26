# Incident Triage Dashboard

This repository is the implementation workspace for the Codex agentic-engineering tutorial. The demo follows an incident operations team as they inspect, filter, and assign incidents from a responsive triage queue.

## Run the queue slice

This stage implements the deterministic queue, search, filters, active criteria, result count, No Results, and Empty Source states with local mock data. Incident details and ownership workflows are intentionally deferred to the next development stage.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite. For verification, run:

```bash
pnpm test
pnpm lint
pnpm build
```

## Product analysis

- [Product contract](handoff/01-product-contract.md)
- [Figma Make planning handoff](handoff/02-figma-make-plan.md)
- [Product approval record](handoff/03-product-approval.md)
- [Figma Make wireframe approval](handoff/04-figma-make-wireframe-approval.md)
- [Visual inspiration research](handoff/05-visual-inspiration.md)
- [Figma Design handoff](handoff/06-figma-design-handoff.md)
- [Figma Design approval](handoff/07-figma-design-approval.md)
- [Figma Make high-fidelity handoff](handoff/08-figma-make-hifi-handoff.md)
- [Figma Make high-fidelity approval](handoff/09-figma-make-hifi-approval.md)
- [Natural-language acceptance contract](handoff/10-natural-language-acceptance-contract.md)
- [Acceptance and development Issue approval](handoff/11-acceptance-and-development-issues.md)
- [Issue 1 development record](handoff/12-issue-1-development.md)
- [Tutorial evidence manifest](handoff/evidence-manifest.md)

## Delivery workflow

The tutorial proceeds from the approved product contract through Figma Make, visual design, implementation, and browser E2E testing. GitHub Issues and pull requests track development work; no GitHub Project board is used.

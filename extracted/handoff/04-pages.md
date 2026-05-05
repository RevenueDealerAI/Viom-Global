# 04 — Pages

Every page lives under `app/`. All pages share `<TopNav>` (in root layout) and `<StickyChips>` (right edge, fixed). Footer is in root layout too.

## Homepage — `app/page.tsx`

12 sections in order. Each `<Section>` alternates tone where indicated.

### Section 1 — Hero (dark)
`<HeroCarousel>` with 3 slides:

**Slide 1**
- Eyebrow: `● AI AUTOMATION FOR ENTERPRISE`
- H1: `Put AI to work` (accent) / `across your enterprise` (white)
- Subhead: `Automate workflows, deploy copilots, and stand up virtual AI teams — all on one enterprise-grade platform.`
- Primary: `Book Strategy Call →`
- Secondary: `Watch Platform Tour`

**Slide 2** — LLM emphasis
- Eyebrow: `● CUSTOM AI COPILOTS`
- H1: `Custom AI copilots` (accent) / `wired into your stack` (white)
- Subhead: `Domain-tuned LLM copilots that ship in weeks, not quarters. Your data, your guardrails, your model choice.`
- Primary: `Book AI Consultation →`
- Secondary: `See Copilot Library`

**Slide 3** — Virtual teams emphasis
- Eyebrow: `● VIRTUAL AI TEAMS`
- H1: `Hire AI engineers` (accent) / `in days, not months` (white)
- Subhead: `Vetted AI, ML, and prompt engineers — embedded into your team in under 14 days.`
- Primary: `Get Profiles →`
- Secondary: `How it works`

Right column on every slide: `<NeuralLattice>` rendered at ~520×520. Carousel indicator (3 dots + pause) bottom-left.

### Section 2 — Trust band (dark)
3 horizontal `<Card variant="interactive">` cards. Each:
- Top: abstract composition placeholder (mono SVG with diagonal stripes, label "outcome composition")
- Small mono badge bottom-left, e.g. `OUTCOME · FINANCE`
- Headline + 1-line caption

Content:
1. `OUTCOME · FINANCE` — `Reconciliation closed in hours, not weeks` — `Tier-1 bank, 240k transactions/day`
2. `OUTCOME · HEALTHCARE` — `Prior auth approvals, 6× faster` — `National payer network`
3. `OUTCOME · LOGISTICS` — `Dispatch resolution without humans in the loop` — `Global 3PL, 12 markets`

### Section 3 — Logo strip (dark)
- Centered eyebrow (mono): `// TRUSTED BY TEAMS BUILDING THE FUTURE`
- 6 monochrome white wordmark placeholders (`<LogoStrip>`), evenly spaced. Names: `Northwind`, `Halcyon`, `Kestrel`, `Atlas Bio`, `Meridian`, `Ironclad` (these are placeholder; replace with real logos when delivered).
- Subtle deep-teal radial gradient mesh behind, barely visible.

### Section 4 — Centerpiece (dark)
- H2: `Viom is the AI platform` (accent) / `for business reinvention` (white)
- `<Centerpiece>`: large `<NeuralLattice>` (~720×720), corner labels, center capsule pill `Automation + Intelligence + Workflows + Trust`.

### Section 5 — 4-pillar capability (dark)
- H2: `Bring autonomous workflows` (accent) / `to every corner of your business` (white)
- `<FourPillars>` with copy:

| Eyebrow | Verb | Description |
|---|---|---|
| `ANY DATA` | `Automate` | `Connect to any source, structured or not. Ingest, normalize, and route — without a data team in the loop.` |
| `ANY AI MODEL` | `Augment` | `Frontier or open-weight. Bring your own keys or use ours. Swap models without rewriting the workflow.` |
| `ANY WORKFLOW` | `Orchestrate` | `Compose multi-step agent workflows with policy, retries, and human review. Observable end to end.` |
| `ANY SYSTEM` | `Scale` | `Deploy on your cloud, your VPC, or ours. SOC 2, HIPAA-ready, region-pinned, audit-logged.` |

### Section 6 — Tab matrix (dark)
`<TabMatrix>` tabs: `AI Automation` / `LLM Copilots` / `Virtual Teams` / `Enterprise Platform` / `Industries`.

For each tab: left column = headline + 3-line desc + primary CTA + 5 arrow-bullets. Right column = `<MockupCard>` with the relevant abstract product mockup.

**AI Automation** mockup: chat bubble header `Incident summarized by AI`, then a structured action list:
```
1. Detected: payment-svc latency spike, 3 regions
2. Triaged: pinned to release v2.41.0
3. Action: auto-rolled back, paged on-call, opened CAB
4. ETA: SLA breach avoided by 14 min
```
**LLM Copilots** mockup: split panel, left a code editor with import statement, right an inline copilot suggestion in mono.

**Virtual Teams** mockup: a roster card with 4 avatars (placeholder squares with initials), each with a skill-chip row.

### Section 7 — AI chat demo (dark)
`<AIChatDemo>` — the single glassmorphism card.

Pre-loaded prompt: `How can AI reduce my support team's workload?`
Streaming response (mono):
```
Three high-impact patterns for support teams:

  ✓ Tier-0 deflection — copilot answers 40–60% of tickets
    before they reach a human, citing your own KB.
  ✓ Agent assist — drafts replies, summarizes threads,
    suggests next-best-action in real time.
  ✓ Auto-triage — classifies, routes, and escalates
    based on intent, sentiment, and SLA risk.

Average outcome across our deployments:
  ↓ 38% mean handle time
  ↓ 52% backlog
  ↑ 19 NPS
```
Below: `Try it yourself →` pill scrolls to the live input under `<Container>`.

### Section 8 — LIGHT BREAK: Industries (cream)
- H2: `One platform,` (accent) / `every industry` (dark)
- `<IndustryGrid>`:
  - Row 1: `Healthcare · Finance · SaaS · Logistics · Retail · Government`
  - Row 2: `Insurance · Legal · Telecom · Education · Manufacturing · Nonprofit`
- Below pills, large H3: `When our customers work, the world works`
- Pill CTA: `See all customer stories →`

### Section 9 — Customer carousel (cream)
`<CustomerCarousel>` with 3 cards:
1. `↓ 73%` · `Manual reconciliation eliminated` · `Northwind Financial`
2. `↑ 4.2×` · `Support copilot adoption in 90 days` · `Halcyon SaaS`
3. `↓ 61%` · `Time-to-resolution on Tier-2 tickets` · `Kestrel Logistics`

Carousel controls bottom-right: pause / prev / next.

### Section 10 — Recognition strip (dark)
Eyebrow: `// RECOGNIZED BY THE INDUSTRY`
4 cards:
1. `ANALYST` — `Recognized in Gartner® for AI Innovation` — `2026 cohort, applied AI category`
2. `MARKET` — `G2 Leader, Enterprise Automation 2026` — `Spring report`
3. `ANALYST` — `Forrester Wave™ Strong Performer` — `AI workflow platforms, Q1 2026`
4. `COMPLIANCE` — `SOC 2 Type II Certified` — `ISO 27001 in flight`

### Section 11 — Final CTA band (dark)
- H2: `Ready to put AI to work?` (accent) / `Let's build your platform.` (white)
- Primary: `Book Strategy Call →`
- Secondary: `Watch Platform Tour`
- Mono footnote: `// avg. response time: under 2 hours`
- Ambient `<NeuralLattice>` drifting at 8% opacity in background.

### Section 12 — Footer (dark)
4 columns:
- **Product**: AI Automation, LLM Copilots, Virtual Teams, ServiceScientist, Pricing
- **Company**: About, Customers, Careers, Press, Contact
- **Resources**: Blog, Case Studies, Documentation, Webinars, Trust Center
- **Legal**: Privacy, Terms, Cookie Policy, DPA, Subprocessors

Newsletter input (mono). Bottom strip: `© 2026 Viom Global, Inc.` · SOC 2 badge · `viom.global · v2026.05`

---

## AI Automation — `app/ai-automation/page.tsx`
1. Hero: `Operations that run themselves` (accent) / `not the other way around` (white) — single primary CTA `Book Automation Demo →`
2. Problem/solution split (left = pain points list, right = mockup of orchestration graph).
3. **What we automate** — 6-card grid:
   `Customer support` · `Finance ops` · `IT incident response` · `HR & onboarding` · `Sales ops` · `Compliance & audit`
   Each card has a checklist-preview that fades in on hover (4 short items).
4. Industries band — reuses light-mode `<IndustryGrid>`.
5. Use-case carousel — 4 cards, format matches Section 9.
6. Benefits with metric callouts — 4 stat blocks: `↓ 62%` ops cost, `↑ 3.4×` throughput, `< 14d` time-to-deploy, `99.9%` uptime SLA. Mono numbers, count-up.
7. Final CTA band.

ONE ambient depth element only — a single small `<NeuralLattice>` near the hero. No others.

## LLM page — `app/llm/page.tsx`
1. Hero: `Custom AI copilots` (accent) / `for your stack` (white)
2. AI agents section — split layout: left description, right mockup of agent reasoning trace.
3. Copilots section — 3-card grid: `Engineering`, `Sales`, `Operations`
4. Internal tools section — split layout with `<CodeBlock>` showing TypeScript copilot integration:
```ts
import { ViomCopilot } from "@viom/sdk";

const copilot = new ViomCopilot({
  model: "claude-sonnet-4.5",
  context: { repo: "your-org/your-repo", scope: "engineering" },
  guardrails: ["pii-redact", "no-prod-writes"],
});

const reply = await copilot.ask({
  user: "u_8821",
  prompt: "Summarize the top 3 P1 incidents this week.",
});
```
5. Integration approach — 4 steps as a horizontal stepper.
6. CTA: `Book AI Consultation →`

## Virtual Teams — `app/virtual-teams/page.tsx`
1. Hero: `Hire AI engineers` (accent) / `in days, not months` (white)
2. Roles grid — 5 cards, each with role title + 4–6 skill chips:
   - `AI Engineer` — `LLM apps`, `RAG`, `evaluation`, `observability`, `Python`, `TypeScript`
   - `ML Engineer` — `training`, `fine-tuning`, `MLOps`, `feature stores`, `PyTorch`
   - `Prompt Engineer` — `eval design`, `red-teaming`, `prompt opt`, `agentic patterns`
   - `AI PM` — `discovery`, `roadmapping`, `policy`, `vendor mgmt`
   - `Data Engineer` — `ELT`, `vector DBs`, `governance`, `lineage`, `dbt`, `Snowflake`
3. Onboarding timeline — 4-step horizontal stepper:
   `Day 1 — Intake brief` → `Day 3 — Profile match` → `Day 7 — Calibration interviews` → `Day 14 — Embedded`
4. Benefits section — 3 stat blocks.
5. CTA: `Get Profiles →`

## Products / ServiceScientist — `app/products/servicescientist/page.tsx`
1. Hero: `Enterprise workflow optimization` (accent) / `powered by ServiceScientist` (white)
2. **Single paragraph** acknowledging the ServiceNow integration as a credibility signal — not a primary identity. Place this directly under the hero subhead. Exactly one sentence mentioning ServiceNow; the rest of the page is Viom-native.
3. Three feature blocks with abstract diagrams:
   - `AI Resolution Center` — auto-triages and resolves incidents.
   - `Workflow Automation` — composes cross-system workflows.
   - `AI-Augmented Staffing` — pairs human teams with copilots.
4. Demo CTA.
5. Compliance/security strip — 4 badges in a row (SOC 2 Type II, ISO 27001, GDPR-ready, HIPAA-ready) with mono captions.

## Use Case template — `app/use-cases/[slug]/page.tsx`
Reusable structure: problem hero → solution narrative → benefits grid → related case studies → CTA.

## Industry template — `app/industries/[slug]/page.tsx`
Same shape as Use Case, plus a regulation/compliance call-out card.

## Book Call — `app/book-call/page.tsx`
Two-column. **No top nav links** (logo only — link back to home). No sticky chips on this page.
- Left: two-line headline + 3 benefit bullets with electric-green check glyphs + social proof quote in mono.
- Right: Calendly embed wrapped in a mockup-variant card with subtle electric-green glow border.

Headline: `45 minutes that pays for itself` (accent) / `or your time back` (white).

Bullets:
- `A senior AI architect on the call — not a sales rep`
- `Walk away with a concrete automation map for your top 3 workflows`
- `If we can't help, we'll tell you who can`

## Contact — `app/contact/page.tsx`
- Single form: name, work email, company, role, "what are you trying to solve?" textarea. Mono labels.
- Office locations as mono address list.
- `View on map →` link instead of embedded map by default.

## Mobile responsive
Every page must work at 375px. Specific notes:
- Hero collapses to single column. Lattice scales to 320×320 and sits below CTAs.
- 4-pillar grid: 1 column, full width.
- TabMatrix: tabs become a horizontally-scrolling row with `scroll-snap`. The active sliding pill still uses `layoutId`.
- Industry grid: 3 columns instead of 6.
- Sticky chips: collapse into a single floating "Talk to us" pill bottom-right, expanding on tap into the two options.

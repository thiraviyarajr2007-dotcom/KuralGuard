# KuralGuard

KuralGuard is a civic-tech hackathon MVP for student and community safety reporting. Users describe a road, lighting, flooding, women’s safety, health, or sanitation concern; the app walks them through Describe → Analyze → Act, produces a structured grievance docket, and shows community-level metrics on a dashboard.

## Demo flow

1. **Landing page** — explains the civic safety problem, shows value cards, sample impact metrics, and offers `Report an Issue` / `Try Demo`.
2. **Report Issue** — select a category, location, description, urgency, optional photo evidence, anonymous toggle, and preferred language.
3. **Analysis** — simulated AI triage with risk badge, disclaimer, situation diagnosis, immediate safety guidance, and recommended civic escalation.
4. **Generated Report** — professional docket preview with copy, download, share, print, status timeline, and community submission.
5. **Community Dashboard** — total/high-risk/resolved metrics, category breakdown, search and filters, report inspection, and demo resolve actions.
6. **Safety Resources** — emergency, women’s safety, medical, and local support contacts with a clear demonstration-resource disclaimer.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Verify

```bash
npm test -- --run
npm run build
```

## Deploy

The production build is static and can be deployed to Vercel, Netlify, GitHub Pages, or any static host:

```bash
npm run build
```

Deploy the generated `dist/` folder.

## MVP boundaries

- No authentication, backend, real government APIs, live emergency dispatch, maps, or native mobile build.
- Analysis is a demonstration triage flow, not a medical/legal/emergency service.
- Safety contacts are sample/demo resources and must be verified before production use.
- Reports live in React state for the demo session; no persistent backend is included.
- For immediate danger, users are told to contact local emergency services first.

## Demo script

1. On the landing page, click **Try Demo Scenario** to load a complete high-risk sample docket.
2. Click **Copy**, **Download**, or **Share** on the generated report to show real actions.
3. Open **Community Dashboard** and use search/filters, then mark a report resolved.
4. Open **Safety Resources** to show emergency/women’s safety/medical/local support categories and the demo-contact disclaimer.
5. Use the top **Report Issue** button or mobile bottom nav to start a new report.

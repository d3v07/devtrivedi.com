# Dev Trivedi's Portfolio

Personal portfolio site showcasing 16 full-stack and systems projects across AI, finance, infra, and distributed systems.

**Live:** https://devtrivedi.com (deployed on Vercel)

## What's Inside

A curated selection of 16 completed projects organized by tier:

### Tier 1: Flagship Products
- **Lintellect** — AI code review with evidence-gated validation (AWS CDK, 173 tests)
- **FinMind** — Financial research workspace with multi-agent reasoning (Bun, Dexter)
- **SpendLens** — AWS cost optimizer with recommendation engine (Python + React)
- **PulseOps** — Event-driven analytics with AMM pricing (Kafka, PostgreSQL)

### Tier 2: Active/Complete Projects
- **Aegis-X** — Industrial safety multi-agent dispatcher (YOLOv8, LangGraph, Neo4j)
- **Axiom** — Deterministic autonomous agent with Z3 verification (Python, macOS)
- **Rivet** — DevSecOps multi-agent pipeline (GitLab Hackathon, GCP Cloud Run)
- **DocWeave** — Knowledge graph extraction from document streams (FastAPI, Kafka, Neo4j)

### Tier 3: Hackathons & Specialized
- **CIMphony** — M&A war room with voice-driven research agents (Gemini Live API)
- **Metropolis** — Real-time NPC simulation engine (Temporal.io, LangGraph, Pinecone)
- **Predictr.AI** — AI-augmented prediction market with AMM (Django, Solidity, Stripe)
- **VendorFlow** — Multi-tenant SaaS for vendor lifecycle (Node.js, MongoDB, Stripe)
- **CivicProof** — Federal fraud investigator with deterministic auditing (Python, Vertex AI)
- **ChatterBox** — High-performance terminal chat (C++17, System V IPC)
- **NexaCore** — Agentic settlement platform (Python, x402 orchestration)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| **Build** | Vite (dev: hot reload, prod: optimized bundles) |
| **Deploy** | Vercel (automatic from main branch) |
| **Analytics** | Google Analytics (optional) |
| **Hosting** | Vercel Functions + edge caching |

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
git clone https://github.com/d3v07/devtrivedi.com.git
cd devtrivedi.com
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build
```bash
npm run build
npm run preview  # Test production build locally
```

### Linting & Tests
```bash
npm run lint
npm run test
npm run test:watch
```

## Project Pages

Each project has:
- **Live demo link** (if available)
- **GitHub repository** link
- **Problem statement** — What it solves
- **Solution** — How it works
- **Tech stack** — Technologies used
- **Key metrics** — Performance, scale, test coverage

Browse all projects at `/projects` on the live site or `src/pages/Projects.tsx` in the codebase.

## Architecture

```
src/
├── pages/          # Route-based pages (Home, Projects, About)
├── components/     # Reusable UI components
│   ├── sections/   # Page sections (Hero, Projects, Footer)
│   ├── ui/         # shadcn/ui components (Button, Card, etc.)
│   └── ...
├── assets/         # Images, logos, project screenshots
├── styles/         # Tailwind CSS + global styles
├── App.tsx         # Main app component
└── main.tsx        # Entry point

public/
├── projects/       # Project screenshots/thumbnails
└── ...
```

## Deployment

The portfolio auto-deploys to Vercel on every push to `main`:
1. Push to GitHub
2. Vercel detects change
3. Runs `npm run build`
4. Deploys to https://devtrivedi.com

For manual deployment or testing staging:
```bash
vercel deploy --prod
```

## Environment Variables

Optional (see `.env.example`):
```bash
VITE_GA_ID=          # Google Analytics tracking ID
VITE_API_URL=        # Backend API for contact form (if applicable)
```

## Contributing

This is a personal portfolio, but feel free to:
- Report issues via GitHub Issues
- Suggest project additions (via Issues)
- Fork and customize for your own portfolio

## License

MIT — Feel free to use this as a template for your own portfolio.

---

**Last Updated**: March 2026
**Total Projects**: 16 (all evidence-based READMEs included)
**Live Site**: https://devtrivedi.com

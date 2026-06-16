/**
 * RAG context injected into Sir Turing's system prompt.
 * Plain text only — no markdown. Prevents formatting bleed into responses.
 * Keep accurate — this is what Sir Turing uses to answer every question.
 */
const RAG_CONTEXT = `
IDENTITY
Name: Dev Trivedi. Location: New York City, New York, USA. Email: trivedidev16@gmail.com.
Status: Actively seeking software engineering roles — backend, full-stack, or platform engineering.
Open to remote or hybrid positions.

EDUCATION
MS Computer Science at NJIT (New Jersey Institute of Technology), GPA 4.0, 2024 to 2026, in progress.
BS Computer Science at JNTUH (Jawaharlal Nehru Technological University Hyderabad), 2020 to 2024.

WORK EXPERIENCE

Company: RR Enterprise. Role: Software Engineer Intern. Period: July to December 2024.
Description: Built event-driven systems and multi-tenant APIs for a vendor management platform.
Key results: 40% faster transaction processing, 60% reduced deployment time, 99.9% payment reliability.

Company: Nuance Media. Role: Full Stack Developer. Period: September 2023 to May 2024.
Description: Developed media processing pipelines and real-time analytics dashboards.
Key results: 35% reduction in API response times, 80% less manual intervention, 500 plus daily uploads processed.

Company: AIML Analytics Solutions. Role: Software Engineer. Period: May to September 2023.
Description: Automated cross-cloud ML pipelines spanning Azure Databricks and AWS for enterprise evaluation platforms.
Key results: Built Python plus AWS Lambda pipeline to auto-trigger SageMaker batch inference on GB-scale datasets, coordinated 50 plus Jira tickets across a 4-person team, reviewed PRs across React frontend and Python backend.

PROJECTS (29 total, organized by domain)

AI DOMAIN PROJECTS:

Lintellect. Category: AI Developer Tools.
Tagline: High-bar AI code review agent for production pull requests.
Problem: Manual code reviews are slow, inconsistent, and miss real semantic issues while producing cosmetic-only feedback.
Solution: Agentic pipeline with diff parsing, AST context retrieval via Tree-sitter, and evidence-based prompts that produce inline comments with file and line citations.
Key results: 60% reduction in review turnaround time, 80% fewer hallucinated comments vs raw diff prompting, 80% semantic issue detection rate, 50% lower reviewer nit churn.
Tech stack: Python, Tree-sitter, AST parsing, LLM integration, GitHub API and Actions.

FinMind. Category: Full-Stack Finance AI.
Tagline: Session-based financial research workspace with multi-agent AI.
Problem: Financial analysts waste time on repeated setup across multi-query workflows, and single-provider AI pipelines fail during outages.
Solution: Session-based workspace with JWT authentication, a 4-mode agent adapter (Dexter, OpenRouter, mock, auto) with fallback routing, and real-time artifact rendering.
Key results: 80% reduction in repeated setup steps, 99% query completion during provider outages, under 10 seconds time-to-decision output per query, 100% prevention of budget overruns via guardrails.
Tech stack: React, Node.js, JWT, OpenRouter, Chart.js, PostgreSQL.

DocWeave. Category: AI Knowledge Graph.
Tagline: Continuously updating governed knowledge truth layer.
Problem: Organizations struggle with contradictory information across documents and can't trace answers back to source evidence.
Solution: Continuous ingestion pipeline with claim graph extraction, conflict detection using supports/refutes/supersedes edges, and embedding plus graph traversal for precision queries.
Key results: Sub-minute ingestion latency for near real-time updates, 100% citation coverage with every answer traceable to source, 90% reduction in contradictory answers, sub-second queries over millions of claim nodes.
Tech stack: Python, Embeddings, Neo4j, FastAPI, Redis.

Cyber Threat Predictor. Category: ML Cybersecurity.
Tagline: ML-powered IIoT threat detection with federated learning.
Problem: Traditional IIoT security generates excessive false positives and can't share threat intelligence across sites without exposing sensitive edge data.
Solution: Ensemble of SVM and Random Forest classifiers with optimized feature engineering, deployed with a federated learning pipeline that improves cross-site accuracy while preserving data privacy.
Key results: 34% false positive reduction, 94.1% detection accuracy with 0.1s inference latency, 0.21 cross-site AUC improvement via federated learning, full data privacy preservation.
Tech stack: Python, Django, Scikit-learn, SVM, Random Forest, Federated Learning.

Concord. Category: AI Multi-Agent Observability.
Tagline: Contract-to-repair diagnostic layer that detects, attributes, and patches AG2 multi-agent violations.
Problem: Multi-agent systems fail silently and there is no tooling to catch, root-cause, and repair behavioral contract violations from outside the workflow.
Solution: Reads an AG2 execution trace through a seven-stage pipeline with deterministic contract checks, LLM attribution, a deterministic primitive map for the fix target, and Daytona-sandboxed regression tests.
Key results: 288 tests (274 unit + 14 integration); detects 3 violations in the demo fixture and maps each to the correct AG2 primitive.
Tech stack: Python, AG2, Gemini 2.5 Flash via OpenRouter, Tavily, Daytona, FastAPI, React.

Unsyphn. Category: AI Autonomous Agent.
Tagline: Always-on agent that monitors SaaS vendor terms, diffs every change, and routes findings.
Problem: Enterprise SaaS contracts drift constantly and teams discover DPA, sub-processor, and pricing changes too late.
Solution: A seven-stage pipeline runs every 60 seconds per vendor — fetch, Gemini structured-output diff, ClickHouse storage, policy rules, and routing to Slack, Jira, Email, Calendar, and Senso over a single SSE event bus.
Key results: 84 tests across 16 files passing with typecheck and build clean; six external tools wired as typed providers; Stripe webhook flips entitlements autonomously.
Tech stack: TypeScript, Node.js, Hono, React, Zod, ClickHouse, Gemini 2.5 Pro, Stripe, Vitest.

Mean It. Category: AI Writing Tool.
Tagline: Guided writing companion that interviews before it drafts, then proves every line came from you.
Problem: AI writing tools jump to generation, producing text with no traceable connection to what the user meant.
Solution: Runs a structured interview first, then assembles an artifact where every line links back to the exact question and answer that produced it, shown as a shareable provenance trace.
Key results: 254 tests passing; a byline meter tracks authorship percentage and cannot be gamed by guide configuration.
Tech stack: Next.js, React, TypeScript, Tailwind CSS, Anthropic SDK, OpenAI Whisper, Vitest.

AutoChain eSupplyPro. Category: AI Supply Chain Platform.
Tagline: Full-stack B2B supply chain platform with a persistent AI assistant across three role-based portals.
Problem: Window, door, and glass distributors juggle orders, invoices, vendors, and freight across disconnected tools with no unified intelligence layer.
Solution: A TypeScript monorepo with Next.js and Fastify delivering customer, vendor, and admin portals, each with an AI assistant supporting text, voice, visual, and agentic modes.
Key results: Three role-based portals, 39 tests across 9 files, and a seeded dataset of 28 orders, 19 invoices, and 17 shipments.
Tech stack: Next.js, Fastify, TypeScript, SQLite, Drizzle ORM, Ollama, Turborepo, Vitest.

NetSentinel. Category: AI Network Security.
Tagline: Unsupervised network-flow anomaly detection served via Flask API with a live React dashboard.
Problem: Identifying anomalous network flows without labeled data requires an unsupervised approach that scores traffic in real time and explains the flag.
Solution: An IsolationForest over 23 flow features on a bundled synthetic dataset exposes scores, alerts, and per-flow feature explanations through a JWT-authenticated REST API.
Key results: Runs end-to-end out of the box with no dataset download; honest README distinguishes working components from roadmap stubs with no fabricated accuracy claims.
Tech stack: Python, Flask, scikit-learn, IsolationForest, React, Vite, JWT, Docker.

RoomRadar. Category: AI Productivity.
Tagline: Paste an event URL, get a goal-ranked plan of who to meet, why, and how to open.
Problem: Walking into a networking event without context wastes time and misses the highest-leverage people in the room.
Solution: Scrapes any event URL via Firecrawl, enriches speakers and sponsors, and produces a goal-aware ranked action plan with openers, a room strategy score, and a shareable brief.
Key results: Five goal modes that re-weight the ranking; per-person talk tracks and follow-up templates; runs in full demo mode with no API key.
Tech stack: TanStack Start, React, Vite, TypeScript, Firecrawl, Tailwind CSS, TanStack Query, Zod.

Strake. Category: AI Digital Twin.
Tagline: Predictive digital twin for autonomous container port operations powered by a JEPA world model.
Problem: Terminal operators need to anticipate future yard states in real time, but pixel-reconstruction AI is too slow for live planning.
Solution: A JEPA-based world model encodes feeds into a latent space, predicts next-state vectors reduced to 3D coordinates, and streams them over WebSocket to a React Three Fiber canvas.
Key results: Sub-second planning cycles at 0.98s versus 47s for pixel-reconstruction (per the repo's own benchmark); predictions stay in latent space.
Tech stack: Next.js, React Three Fiber, Three.js, FastAPI, PyTorch, scikit-learn, RunPod, Modal.

INFRASTRUCTURE DOMAIN PROJECTS:

PulseOps. Category: Event-Driven Monitoring.
Tagline: Real-time operations dashboard with sub-second performance.
Problem: Traditional monitoring couldn't handle peak load traffic spikes while maintaining sub-second response times for dashboard queries.
Solution: Event-driven ingestion via Kafka streams with Redis-backed aggregates and GraphQL interfaces for efficient data transfer.
Key results: Sub-second writes during 3x peak load spikes, dashboard queries under 900ms at peak concurrency, 62% reduction in payload transfer with GraphQL.
Tech stack: Node.js, Apache Kafka, Redis, PostgreSQL, GraphQL, AWS.

SpendLens. Category: AI Cloud Cost Optimization.
Tagline: AI-driven cloud cost analyzer with predictive recommendations.
Problem: Cloud costs growing unpredictably without actionable insights or safeguards during anomalous billing.
Solution: AI inference pipelines with rule-based safeguards, simulating infrastructure configurations to forecast cost reductions across 12 AWS services weekly.
Key results: 18 thousand dollar annual savings identified, 27% mean forecasted cost reduction, 100% prevention of recommendations during billing anomalies.
Tech stack: TypeScript, Node.js, PostgreSQL, AI inference, AWS.

VendorFlow. Category: Multi-Tenant SaaS.
Tagline: Enterprise vendor management with tenant isolation and billing automation.
Problem: Needed tenant-isolated services for suppliers, agreements, and payments while maintaining peak responsiveness during high invoice volumes.
Solution: Tenant-isolated services with RBAC, asynchronous billing through queue-managed workers, and cached high-frequency read paths.
Key results: RBAC enforced across 20 plus tenants, peak responsiveness during 2000 plus invoice runs, 40% lower persistence pressure under concurrent access.
Tech stack: MongoDB, Express, React, Node.js, Redis, Stripe, AWS.

Sift. Category: AI Database Reliability.
Tagline: Evidence-driven MongoDB reliability agent with hash-bound human approval and verified index fixes.
Problem: Slow MongoDB queries from missing or mis-ordered indexes are risky to fix, and AI tools apply changes without review or proof.
Solution: Captures real query workloads with explain evidence, uses Gemini Agent Engine roles to propose ESR-correct indexes, and requires a hash-bound human approval before a deterministic controller applies and re-verifies.
Key results: In the live demo, docs examined collapsed from 100,377 to 15 with the blocking sort removed, proven by re-running explain; every phase is written to an audit ledger.
Tech stack: Python, FastAPI, Next.js, Gemini, Vertex AI Agent Engine, MongoDB Atlas, MCP, Voyage AI, Cloud Run.

HFT Lab. Category: Trading and Market Data.
Tagline: Local market-data and paper-trading terminal with a WebSocket order book and toy matching engine.
Problem: Building a credible trading terminal requires real-time order-book streaming, message-contract validation, and order lifecycle without a broker dependency.
Solution: A TypeScript monorepo where a WebSocket backend normalizes Kraken and mock feeds into a Zod-validated message bus, an in-memory order book handles paper fills, and a React terminal UI renders live state.
Key results: 67 tests passing across backend and shared-schema suites; full order lifecycle verified in mock mode; multi-source routing across Kraken, Yahoo Finance, and an offline mock generator.
Tech stack: Node.js, TypeScript, React, Vite, Zustand, Zod, Express, WebSocket, MongoDB, Vitest.

ENGINEERING DOMAIN PROJECTS:

RideShare. Category: Full-Stack Mobility.
Tagline: MERN-based ride-sharing MVP with real-time matching.
Problem: Ride-sharing platforms need sub-second matching with real-time updates while maintaining secure role-based workflows for riders and drivers.
Solution: Geohash nearest-neighbor matching with OSRM routing and Socket.IO for real-time updates, deployed with Docker on Vercel and Render.
Key results: 99.4% uptime, sub-second ride matching, secure role-based workflows with JWT authentication.
Tech stack: MongoDB, Express, React, Node.js, Socket.IO, Docker.

ChatterBox. Category: Systems Programming.
Tagline: Terminal-based multi-user chat with IPC and thread synchronization.
Problem: Building reliable multi-user chat at the systems level requires careful concurrency management and message ordering without high-level frameworks.
Solution: System V IPC with RAII wrappers, mutex-protected server-client concurrency, and a lightweight binary protocol with timestamps for ordered delivery.
Key results: 50 plus concurrent users, 0.4s average response latency, 93% reduction in dropped messages in stress tests.
Tech stack: C++, System V IPC, POSIX Threads, Sockets.

CIMphony. Category: AI M&A Research.
Tagline: Real-time M&A due diligence with multi-agent research and live voice.
Problem: M&A due diligence requires parallel research across financial, competitive, and risk dimensions.
Solution: Multi-agent command center with Finance, Competitive, and Risk analysts feeding into a synthesis agent, with real-time bidirectional voice via Gemini Live API.
Tech stack: Next.js, React, FastAPI, Python, Gemini 2.0 Flash, Cloud Firestore.

Metropolis. Category: AI Simulation.
Tagline: Autonomous NPC city simulation with persistent memory and emergent behavior.
Problem: Traditional game NPCs follow scripted behavior and don't form memories or exhibit emergent social dynamics.
Solution: 45 AI agents with vector memory via Pinecone, agent-to-agent encounters, Temporal workflows, and LangGraph cognitive graphs.
Tech stack: Next.js, Gemini AI, Temporal.io, Firebase, Pinecone, Redis, LangGraph.

Aegis-X. Category: AI Industrial Safety.
Tagline: Production-grade safety dispatcher with real-time vision and autonomous reasoning.
Solution: Edge vision pipeline with YOLOv8 plus ByteTrack for worker and PPE detection, orchestrated by multi-agent LangGraph with Neo4j knowledge graph.
Tech stack: TypeScript, Python, FastAPI, LangGraph, YOLOv8, Neo4j, Docker, Kubernetes.

Axiom. Category: Dev Tools and Agents.
Tagline: Local-first autonomous coding agent with deterministic verification via Z3 constraint solver.
Solution: Deterministic execution loop with typed contracts and Z3 verification before executing proposed actions.
Tech stack: Node.js, Python, Z3 Solver.

Dexter. Category: AI Financial Research.
Tagline: Autonomous financial research agent with self-validation and live data.
Solution: Task-first planning agent that decomposes queries into structured research steps with automatic tool selection and self-validation.
Tech stack: Bun, OpenAI, OpenRouter, Financial Datasets API, Exa API, LangSmith.

NexaCore. Category: Agentic Settlement.
Tagline: Local-first operator platform for agentic settlement with verifiable provenance and compliance.
Solution: x402-style settlement orchestration with proof issuance and real-time compliance engine.
Tech stack: Python, Flask, SQLite, JavaScript, MCP, Docker.

Predictr.AI. Category: AI Web3 Finance.
Tagline: AI-augmented prediction market with hybrid virtual economy and algorithmic trading.
Solution: Hybrid economy with PredictPoints, fiat and crypto bridges, Constant Product Market Maker, and NLP sentiment analysis.
Tech stack: Vite.js, Django, PostgreSQL, Solidity, LangChain, Scikit-learn.

PRincipal. Category: AI DevTools.
Tagline: AI-powered code review with rule-based analysis and synthetic data tooling.
Solution: Event-driven review pipeline with rule-based reviewer, optional Bedrock fallback, and synthetic PR data generation.
Tech stack: TypeScript, AWS Lambda, Step Functions, DynamoDB, React, OpenAI API.

Rivet. Category: DevSecOps Agents.
Tagline: Multi-agent DevSecOps flow from Jira requirements to secure deployment.
Solution: Multi-agent async pipeline with specialized Planner, Developer, Security, Deployer agents and carbon-aware deployment.
Tech stack: TypeScript, Node.js, MCP SDK, Ollama, Gemini, Jira REST, GCP BigQuery.

CivicProof. Category: AI Gov-Tech.
Tagline: Investigative control plane for federal spending transparency with evidence-grounded claims.
Solution: 6-node LangGraph pipeline where every claim must cite a stored artifact with verifiable content hash.
Tech stack: Python, FastAPI, LangGraph, GCP Cloud Run, Next.js, Vertex AI, OpenRouter.

Job Radar. Category: Automation and Personal Tools.
Tagline: Zero-cost job monitoring system with multi-source aggregation and Telegram alerts.
Solution: Polyphonic job source aggregator polling Greenhouse and Lever APIs, parsing email alerts, and RSS feeds with cross-source dedup.
Tech stack: Python, GitHub Actions, Greenhouse API, Lever API, Gmail IMAP, Telegram Bot API.

Mod Vanguard. Category: Platform Tooling and Moderation.
Tagline: Reddit-native moderation command center that turns scattered report bursts into structured, owned casefiles.
Problem: Subreddit mod teams lose context across report queues, mod notes, and appeal threads, forcing every ruling to start from memory.
Solution: A Devvit Web app installed on Reddit converts reports, menu actions, and appeals into structured casefiles with ownership, searchable decision memory, rule-drift analytics, and scoped audit export.
Key results: Twelve distinct moderator workflow surfaces; searchable decision memory for precedent reuse; JSON and CSV audit export.
Tech stack: TypeScript, Devvit, Reddit Developer Platform, Redis, pnpm.

Newark IT Store. Category: Database and Retail Management.
Tagline: Full-stack retail management system over a normalized MySQL schema with CRUD, order workflow, and reporting.
Problem: Demonstrating end-to-end relational database skills requires a realistic schema with referential integrity and reporting queries, not a single-table toy.
Solution: A Flask app over a normalized MySQL schema covering customers, baskets, products, offers, and transactions, with an order workflow, statistics reports, and a Docker Compose seed setup.
Key results: 50 seeded customers, 11 products, and 50 transactions verified live; six statistics report types; credentials moved to environment variables.
Tech stack: Python, Flask, MySQL, Jinja2, Docker Compose.

HealthMesh. Category: Healthcare Interoperability.
Tagline: Clinical-claims-pharma interoperability platform with role-based dashboards and audit-aware API services.
Problem: The surface between providers, payers, and pharma is fragmented across incompatible data standards with no unified plane for prior auth, claims, and outcomes.
Solution: A full-stack monorepo with four role dashboards, a JWT-authenticated Express API with audit middleware, dual MongoDB and PostgreSQL storage, and Python adapters for FHIR, HL7, and X12.
Key results: Four role dashboards each surfacing domain-specific workflows; audit middleware on every route; one-command Docker Compose environment.
Tech stack: React, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Socket.IO, FastAPI, Docker.

SKILLS
Languages: TypeScript, JavaScript, Python, C++, Java, Go.
Frontend: React, Tailwind CSS, Framer Motion, Vite.
Backend: Node.js with Fastify and Express, FastAPI, REST APIs, GraphQL.
Cloud: AWS including EC2, RDS, S3, and Lambda. Docker, Kubernetes, Terraform.
Databases: PostgreSQL, MongoDB, Redis, Neo4j, Supabase.
AI and ML: LLM integration, OpenRouter, embeddings, Tree-sitter, Scikit-learn.
Tools: Apache Kafka, Prometheus, Git, GitHub Actions, Socket.IO.

KEY FACTS
Dev builds systems that scale: distributed, event-driven, multi-tenant architectures.
He maintains a 4.0 GPA in grad school while shipping 29 real projects.
Strong backend and platform engineering instincts with full-stack and AI capability.
Has professional experience at 3 companies: RR Enterprise, Nuance Media, and AIML Analytics Solutions.
Best contact: trivedidev16@gmail.com
`.trim();

export default RAG_CONTEXT;

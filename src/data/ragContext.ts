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

PROJECTS (9 total, organized by domain)

AI DOMAIN PROJECTS:

Project 1: Lintellect. Category: AI Developer Tools.
Tagline: High-bar AI code review agent for production pull requests.
Problem: Manual code reviews are slow, inconsistent, and miss real semantic issues while producing cosmetic-only feedback.
Solution: Agentic pipeline with diff parsing, AST context retrieval via Tree-sitter, and evidence-based prompts that produce inline comments with file and line citations.
Key results: 60% reduction in review turnaround time, 80% fewer hallucinated comments vs raw diff prompting, 80% semantic issue detection rate, 50% lower reviewer nit churn.
Tech stack: Python, Tree-sitter, AST parsing, LLM integration, GitHub API and Actions.

Project 2: FinMind. Category: Full-Stack Finance AI.
Tagline: Session-based financial research workspace with multi-agent AI.
Problem: Financial analysts waste time on repeated setup across multi-query workflows, and single-provider AI pipelines fail during outages.
Solution: Session-based workspace with JWT authentication, a 4-mode agent adapter (Dexter, OpenRouter, mock, auto) with fallback routing, and real-time artifact rendering.
Key results: 80% reduction in repeated setup steps, 99% query completion during provider outages, under 10 seconds time-to-decision output per query, 100% prevention of budget overruns via guardrails.
Tech stack: React, Node.js, JWT, OpenRouter, Chart.js, PostgreSQL.

Project 3: DocWeave. Category: AI Knowledge Graph.
Tagline: Continuously updating governed knowledge truth layer.
Problem: Organizations struggle with contradictory information across documents and can't trace answers back to source evidence.
Solution: Continuous ingestion pipeline with claim graph extraction, conflict detection using supports/refutes/supersedes edges, and embedding plus graph traversal for precision queries.
Key results: Sub-minute ingestion latency for near real-time updates, 100% citation coverage with every answer traceable to source, 90% reduction in contradictory answers, sub-second queries over millions of claim nodes.
Tech stack: Python, Embeddings, Neo4j, FastAPI, Redis.

Project 4: Cyber Threat Predictor. Category: ML Cybersecurity.
Tagline: ML-powered IIoT threat detection with federated learning.
Problem: Traditional IIoT security generates excessive false positives and can't share threat intelligence across sites without exposing sensitive edge data.
Solution: Ensemble of SVM and Random Forest classifiers with optimized feature engineering, deployed with a federated learning pipeline that improves cross-site accuracy while preserving data privacy.
Key results: 34% false positive reduction, 94.1% detection accuracy with 0.1s inference latency, 0.21 cross-site AUC improvement via federated learning, full data privacy preservation.
Tech stack: Python, Django, Scikit-learn, SVM, Random Forest, Federated Learning.

INFRASTRUCTURE DOMAIN PROJECTS:

Project 5: PulseOps. Category: Event-Driven Monitoring.
Tagline: Real-time operations dashboard with sub-second performance.
Problem: Traditional monitoring couldn't handle peak load traffic spikes while maintaining sub-second response times for dashboard queries.
Solution: Event-driven ingestion via Kafka streams with Redis-backed aggregates and GraphQL interfaces for efficient data transfer.
Key results: Sub-second writes during 3x peak load spikes, dashboard queries under 900ms at peak concurrency, 62% reduction in payload transfer with GraphQL.
Tech stack: Node.js, Apache Kafka, Redis, PostgreSQL, GraphQL, AWS.

Project 6: SpendLens. Category: AI Cloud Cost Optimization.
Tagline: AI-driven cloud cost analyzer with predictive recommendations.
Problem: Cloud costs growing unpredictably without actionable insights or safeguards during anomalous billing.
Solution: AI inference pipelines with rule-based safeguards, simulating infrastructure configurations to forecast cost reductions across 12 AWS services weekly.
Key results: 18 thousand dollar annual savings identified, 27% mean forecasted cost reduction, 100% prevention of recommendations during billing anomalies.
Tech stack: TypeScript, Node.js, PostgreSQL, AI inference, AWS.

Project 7: VendorFlow. Category: Multi-Tenant SaaS.
Tagline: Enterprise vendor management with tenant isolation and billing automation.
Problem: Needed tenant-isolated services for suppliers, agreements, and payments while maintaining peak responsiveness during high invoice volumes.
Solution: Tenant-isolated services with RBAC, asynchronous billing through queue-managed workers, and cached high-frequency read paths.
Key results: RBAC enforced across 20 plus tenants, peak responsiveness during 2000 plus invoice runs, 40% lower persistence pressure under concurrent access.
Tech stack: MongoDB, Express, React, Node.js, Redis, Stripe, AWS.

ENGINEERING DOMAIN PROJECTS:

Project 8: RideShare. Category: Full-Stack Mobility.
Tagline: MERN-based ride-sharing MVP with real-time matching.
Problem: Ride-sharing platforms need sub-second matching with real-time updates while maintaining secure role-based workflows for riders and drivers.
Solution: Geohash nearest-neighbor matching with OSRM routing and Socket.IO for real-time updates, deployed with Docker on Vercel and Render.
Key results: 99.4% uptime, sub-second ride matching, secure role-based workflows with JWT authentication.
Tech stack: MongoDB, Express, React, Node.js, Socket.IO, Docker.

Project 9: ChatterBox. Category: Systems Programming.
Tagline: Terminal-based multi-user chat with IPC and thread synchronization.
Problem: Building reliable multi-user chat at the systems level requires careful concurrency management and message ordering without high-level frameworks.
Solution: System V IPC with RAII wrappers, mutex-protected server-client concurrency, and a lightweight binary protocol with timestamps for ordered delivery.
Key results: 50 plus concurrent users, 0.4s average response latency, 93% reduction in dropped messages in stress tests.
Tech stack: C++, System V IPC, POSIX Threads, Sockets.

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
He maintains a 4.0 GPA in grad school while shipping 9 real projects.
Strong backend and platform engineering instincts with full-stack and AI capability.
Has professional experience at 2 companies across internship and full-time roles.
Best contact: trivedidev16@gmail.com
`.trim();

export default RAG_CONTEXT;

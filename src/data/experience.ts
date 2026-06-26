export interface ExperienceItem {
  number: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

/** Single source of truth for work history — rendered on the Home and About pages. */
export const experiences: ExperienceItem[] = [
  {
    number: "01",
    company: "NJIT",
    role: "Software Engineer",
    period: "May 2025 — Present",
    location: "Newark, NJ",
    description:
      "Building AI document-processing and operations tooling for university workflows — OCR/RAG pipelines and human-in-the-loop automation.",
    achievements: [
      "Built OCRmyPDF + PaddleOCR pipelines on PostgreSQL, Redis, and S3, cutting archive retrieval from hours to ~2 minutes",
      "Developed a FastAPI + LangChain RAG assistant with pgvector retrieval and audit logs, cutting staff search and drafting effort by 65%",
      "Engineered LangGraph human-in-the-loop workflows and a Next.js ops dashboard with RBAC, retries, and monitoring, cutting setup time from 30 to 10 minutes",
    ],
    technologies: ["FastAPI", "LangChain", "LangGraph", "pgvector", "PostgreSQL", "Redis", "Next.js", "AWS S3"],
  },
  {
    number: "02",
    company: "RR Enterprise",
    role: "Software Engineer",
    period: "Jul 2024 — Dec 2024",
    location: "India",
    description:
      "Built high-performance C++ data pipelines and REST APIs for an inventory platform on AWS, improving reliability and cross-team throughput.",
    achievements: [
      "Engineered a C++ pipeline on AWS S3 and MongoDB processing 10K+ daily inventory records, saving ~$4K/month",
      "Built React + Express + Node.js REST APIs with JWT and Swagger, cutting report turnaround from 40 to 12 minutes across a 5-person team",
      "Added CSV validation, retry logic, CloudWatch alarms, and health checks, cutting repeat failures by 90% and downtime by 60%",
    ],
    technologies: ["C++", "AWS S3", "MongoDB", "React", "Express", "Node.js", "CloudWatch", "JWT"],
  },
  {
    number: "03",
    company: "Nuance Media",
    role: "Software Engineer",
    period: "Jun 2023 — May 2024",
    location: "Remote",
    description:
      "Delivered optimized React applications and database performance work with full CI/CD delivery for client campaigns.",
    achievements: [
      "Optimized React dashboards on Vercel with code splitting and lazy loading, cutting page load time 35% (~$5.5K/quarter saved)",
      "Profiled slow MongoDB queries with Atlas and added compound indexes, cutting latency from 400ms to 180ms in production",
      "Delivered 20+ features via Jira and PR workflows with tests and CI/CD, maintaining 95% coverage and cutting deploy time by 67%",
    ],
    technologies: ["React", "Vercel", "MongoDB", "GitHub Actions", "Jest", "Jira"],
  },
  {
    number: "04",
    company: "Nuance Media",
    role: "Software Engineer Intern",
    period: "May 2022 — Sep 2023",
    location: "Remote",
    description:
      "Trained ML models and orchestrated cross-cloud inference pipelines for automated evaluation reporting.",
    achievements: [
      "Trained SageMaker ML models to 91% accuracy and integrated Python inference workflows automating daily evaluation reporting",
      "Orchestrated AWS Lambda and Azure Databricks workflows to process 80 GB client datasets for inference and batch reporting",
      "Coordinated 50+ Jira tickets across a 4-person intern team over 5 months, translating business requests into technical tasks",
    ],
    technologies: ["Python", "AWS Lambda", "SageMaker", "Azure Databricks", "Jira"],
  },
];

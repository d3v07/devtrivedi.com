/**
 * chatChains.ts — conversation chain definitions + topic detector.
 *
 * Design rules:
 * 1. Every node has 2–3 chips. No dead ends.
 * 2. Every level-2+ node has at least one bridge chip to another topic.
 * 3. No tech jargon in chips — must read as natural human curiosity.
 * 4. "How do I reach him?" is the only intentional terminal node.
 * 5. Max 3 levels deep per branch.
 */

export type ChatMode = "turing" | "basic" | null;

// ─── Basic mode chains ────────────────────────────────────────────────────────

export const CHAIN_BASIC: Record<string, string[]> = {

  // ── Level 1: four entry points ─────────────────────────────────────────────
  "What has Dev built?":           ["Tell me about Lintellect", "Tell me about PulseOps", "What else did he ship?"],
  "Is Dev available to hire?":     ["What kind of role is he targeting?", "What's his biggest strength?", "How do I reach him?"],
  "What's his tech stack?":        ["TypeScript or Python — which?", "What's his backend depth?", "Any AI or ML work?"],
  "What's his background?":        ["Where did he study?", "Has he worked professionally?", "GPA and grad school?"],

  // ── Bridge: see more projects ──────────────────────────────────────────────
  "What else did he ship?":        ["Tell me about FinMind", "Tell me about DocWeave", "Tell me about SpendLens"],
  "Show me the systems projects":  ["Tell me about VendorFlow", "Tell me about RideShare", "Tell me about ChatterBox"],

  // ── Lintellect ─────────────────────────────────────────────────────────────
  "Tell me about Lintellect":      ["What results did it produce?", "How does it actually work?", "What else did he ship?"],
  "What results did it produce?":  ["60% faster reviews — what drove that?", "What was the detection rate?", "Is Dev available to hire?"],
  "How does it actually work?":    ["What's the AST context for?", "Is Dev available to hire?"],
  "60% faster reviews — what drove that?":  ["What did that mean in practice?", "What else did he ship?"],
  "What was the detection rate?":  ["80% semantic issues caught — how?", "What else did he ship?"],
  "What's the AST context for?":   ["Why not just send the raw diff?", "What else has he built with AI?"],

  // ── FinMind ────────────────────────────────────────────────────────────────
  "Tell me about FinMind":         ["What makes it different from ChatGPT?", "What was hardest to build?", "What else did he ship?"],
  "What makes it different from ChatGPT?": ["The fallback routing — what does that mean?", "Is Dev available to hire?"],
  "What was hardest to build?":    ["How did he handle provider outages?", "What else did he ship?"],
  "The fallback routing — what does that mean?": ["What happens when the AI provider goes down?", "What else has he built?"],
  "How did he handle provider outages?": ["Auto-switches to a backup AI — how?", "Is Dev available to hire?"],

  // ── DocWeave ───────────────────────────────────────────────────────────────
  "Tell me about DocWeave":        ["What's a claim graph in plain English?", "How does it handle contradictions?", "What else did he ship?"],
  "What's a claim graph in plain English?": ["Documents broken into facts with source links?", "Is Dev available to hire?"],
  "How does it handle contradictions?": ["Supports vs refutes vs supersedes — how?", "What else did he ship?"],
  "Documents broken into facts with source links?": ["Every answer is traceable to a source?", "What else has he built?"],
  "Supports vs refutes vs supersedes — how?": ["Flags conflict instead of guessing?", "Is Dev available to hire?"],

  // ── Cyber Threat Predictor ────────────────────────────────────────────────
  "Tell me about Cyber Threat Predictor": ["What accuracy did it hit?", "What's the federated learning part?", "What else did he ship?"],
  "What accuracy did it hit?":     ["94% detection, 0.1s latency — how?", "Is Dev available to hire?"],
  "What's the federated learning part?": ["Trains across sites without sharing raw data?", "What else did he ship?"],
  "94% detection, 0.1s latency — how?": ["SVM + Random Forest ensemble — why both?", "What else has he built?"],
  "Trains across sites without sharing raw data?": ["Privacy-preserving ML — what does that mean?", "Is Dev available to hire?"],

  // ── PulseOps ───────────────────────────────────────────────────────────────
  "Tell me about PulseOps":        ["How did it handle 3x traffic spikes?", "Why Kafka instead of polling?", "What else did he ship?"],
  "How did it handle 3x traffic spikes?": ["Sub-second writes at peak load — what made that possible?", "Is Dev available to hire?"],
  "Why Kafka instead of polling?": ["What breaks at scale with polling?", "What else did he ship?"],
  "Sub-second writes at peak load — what made that possible?": ["Kafka + Redis together — why?", "What else has he built?"],
  "What breaks at scale with polling?": ["Missed events, latency spikes, CPU waste?", "Is Dev available to hire?"],

  // ── SpendLens ──────────────────────────────────────────────────────────────
  "Tell me about SpendLens":       ["How did it find $18K in waste?", "What stops it from giving bad advice?", "What else did he ship?"],
  "How did it find $18K in waste?": ["Which AWS services were the problem?", "Is Dev available to hire?"],
  "What stops it from giving bad advice?": ["Anomaly guard — what does it check?", "What else did he ship?"],
  "Which AWS services were the problem?": ["12 AWS services audited weekly — how?", "What else has he built?"],
  "Anomaly guard — what does it check?": ["Blocks recommendations during billing spikes?", "Is Dev available to hire?"],

  // ── VendorFlow ─────────────────────────────────────────────────────────────
  "Tell me about VendorFlow":      ["How does it handle 20+ tenants?", "How does the billing pipeline work?", "What else did he ship?"],
  "How does it handle 20+ tenants?": ["What is tenant isolation actually?", "Is Dev available to hire?"],
  "How does the billing pipeline work?": ["Stripe + async queue — why not synchronous?", "What else did he ship?"],
  "What is tenant isolation actually?": ["Each tenant only sees their own data — how?", "What else has he built?"],
  "Stripe + async queue — why not synchronous?": ["2000+ invoice runs without slowing down?", "Is Dev available to hire?"],

  // ── RideShare ──────────────────────────────────────────────────────────────
  "Tell me about RideShare":       ["How fast is the ride matching?", "What does real-time mean here?", "What else did he ship?"],
  "How fast is the ride matching?": ["Sub-second matching — what's the algorithm?", "Is Dev available to hire?"],
  "What does real-time mean here?": ["Socket.IO — persistent connection to the app?", "What else did he ship?"],
  "Sub-second matching — what's the algorithm?": ["Geohash nearest-neighbor — how does that work?", "What else has he built?"],
  "Socket.IO — persistent connection to the app?": ["Driver location updates pushed live?", "Is Dev available to hire?"],

  // ── ChatterBox ─────────────────────────────────────────────────────────────
  "Tell me about ChatterBox":      ["Why build this in C++ instead of Node?", "How many users could it handle?", "What else did he ship?"],
  "Why build this in C++ instead of Node?": ["What does systems-level get you?", "Is Dev available to hire?"],
  "How many users could it handle?": ["50+ concurrent at 0.4s latency — how?", "What else did he ship?"],
  "What does systems-level get you?": ["Control over memory, threads, IPC?", "What else has he built?"],
  "50+ concurrent at 0.4s latency — how?": ["POSIX threads + mutex — what's the tricky part?", "Is Dev available to hire?"],

  // ── Hiring ─────────────────────────────────────────────────────────────────
  "What kind of role is he targeting?": ["Backend or platform engineering?", "Remote or hybrid?", "How do I reach him?"],
  "What's his biggest strength?":       ["Distributed systems depth?", "Full-stack + AI breadth?", "How do I reach him?"],
  "How do I reach him?":                [],

  "Backend or platform engineering?": ["What languages does he work in?", "How do I reach him?"],
  "Remote or hybrid?":                ["Where is he based?", "How do I reach him?"],
  "Distributed systems depth?":       ["PulseOps, VendorFlow, DocWeave — all distributed?", "How do I reach him?"],
  "Full-stack + AI breadth?":         ["9 projects across 3 domains — really?", "How do I reach him?"],
  "What languages does he work in?":  ["TypeScript, Python, Go, C++ — all in production?", "How do I reach him?"],
  "Where is he based?":               ["New Jersey, open to remote?", "How do I reach him?"],

  // ── Tech stack ─────────────────────────────────────────────────────────────
  "TypeScript or Python — which?":   ["TypeScript for backends, Python for ML — why split?", "What's his backend depth?"],
  "What's his backend depth?":       ["Fastify, Kafka, Redis, PostgreSQL — all in production?", "Is Dev available to hire?"],
  "Any AI or ML work?":              ["LLM pipelines or traditional ML?", "Which models has he worked with?", "What else did he build?"],

  "TypeScript for backends, Python for ML — why split?": ["Where does Go fit in?", "Is Dev available to hire?"],
  "Fastify, Kafka, Redis, PostgreSQL — all in production?": ["Which project used all four?", "Is Dev available to hire?"],
  "LLM pipelines or traditional ML?": ["Both — which projects?", "Is Dev available to hire?"],
  "Which models has he worked with?": ["Claude, Haiku, OpenRouter — what else?", "Is Dev available to hire?"],
  "Both — which projects?":          ["Lintellect for LLMs, Cyber Threat for ML?", "What else did he ship?"],

  // ── Background ─────────────────────────────────────────────────────────────
  "Where did he study?":             ["MS at NJIT — what's the program?", "What was the undergrad?", "Has he worked professionally?"],
  "Has he worked professionally?":   ["Tell me about RR Enterprise", "Tell me about Nuance Media"],
  "GPA and grad school?":            ["4.0 in grad school while shipping 9 projects?", "Is Dev available to hire?"],

  "MS at NJIT — what's the program?": ["Computer Science — expected graduation 2026?", "Is Dev available to hire?"],
  "What was the undergrad?":          ["CS from JNTUH — what did he focus on?", "Has he worked professionally?"],
  "4.0 in grad school while shipping 9 projects?": ["How does he manage that?", "Is Dev available to hire?"],
  "How does he manage that?":         ["What's his approach to shipping fast?", "Is Dev available to hire?"],

  // ── Work experience ────────────────────────────────────────────────────────
  "Tell me about RR Enterprise":     ["What did he build there?", "What were the results?", "Tell me about Nuance Media"],
  "Tell me about Nuance Media":      ["What was the work?", "What improved because of him?", "Is Dev available to hire?"],

  "What did he build there?":        ["Event-driven vendor management — what does that mean?", "Is Dev available to hire?"],
  "What were the results?":          ["40% faster transactions, 99.9% payment reliability?", "Is Dev available to hire?"],
  "What was the work?":              ["Media pipelines and real-time analytics?", "Is Dev available to hire?"],
  "What improved because of him?":   ["35% faster API, 500+ daily uploads?", "Is Dev available to hire?"],
};

// ─── Turing mode chains ───────────────────────────────────────────────────────
// CS theory + systems questions for visitors who want to go deep.

export const CHAIN_TURING: Record<string, string[]> = {

  // ── Level 1 ────────────────────────────────────────────────────────────────
  "Is his work Turing-complete?":   ["What formal models appear in his projects?", "Any state machine or automata design?", "Distributed consensus work?"],
  "Knowledge representation used?": ["Symbolic AI or connectionist?", "Any graph-based knowledge store?", "How is inference done?"],
  "Worst-case time complexity?":    ["Any NP-hard subproblems tackled?", "Approximations or heuristics used?", "Space vs time tradeoffs?"],
  "Distributed consensus?":         ["CAP theorem tradeoffs in his work?", "Strong or eventual consistency?", "How is fault tolerance handled?"],

  // ── Level 2: formal models ─────────────────────────────────────────────────
  "What formal models appear in his projects?": ["Tree-sitter as a grammar parser?", "Event-driven FSM in PulseOps?", "Distributed consensus work?"],
  "Any state machine or automata design?":      ["Event-driven or polling transitions?", "Where does non-determinism appear?"],
  "Tree-sitter as a grammar parser?":           ["Context-free grammar for code ASTs?", "Knowledge representation used?"],
  "Event-driven FSM in PulseOps?":              ["Kafka as a state log?", "Is his work Turing-complete?"],

  // ── Level 2: knowledge representation ────────────────────────────────────
  "Symbolic AI or connectionist?":   ["DocWeave uses claim graphs — symbolic?", "Lintellect uses embeddings — connectionist?"],
  "Any graph-based knowledge store?": ["Neo4j claim graph in DocWeave?", "Knowledge representation used?"],
  "How is inference done?":          ["Forward chaining on claim graph?", "Probabilistic inference in Cyber Threat?"],
  "DocWeave uses claim graphs — symbolic?": ["Supports/refutes/supersedes — what logic?", "Worst-case time complexity?"],
  "Lintellect uses embeddings — connectionist?": ["RAG over AST context — hybrid approach?", "Is his work Turing-complete?"],

  // ── Level 2: complexity ────────────────────────────────────────────────────
  "Any NP-hard subproblems tackled?": ["Graph conflict detection in DocWeave?", "Matching optimization in RideShare?"],
  "Approximations or heuristics used?": ["Geohash as a spatial approximation?", "Greedy cost sim in SpendLens?"],
  "Space vs time tradeoffs?":          ["Redis caching as space-for-time?", "Distributed consensus?"],
  "Graph conflict detection in DocWeave?": ["Polynomial-time with edge pruning?", "Knowledge representation used?"],

  // ── Level 2: distributed systems ──────────────────────────────────────────
  "CAP theorem tradeoffs in his work?": ["PulseOps chooses AP — why?", "VendorFlow chooses CP for billing — why?"],
  "Strong or eventual consistency?":    ["Redis for eventual, PostgreSQL for strong?", "CRDT or timestamp ordering?"],
  "How is fault tolerance handled?":    ["Kafka replication in PulseOps?", "Stripe idempotency in VendorFlow?"],
  "PulseOps chooses AP — why?":         ["Dashboard latency vs perfect accuracy?", "Worst-case time complexity?"],
  "VendorFlow chooses CP for billing — why?": ["Money can't be eventually consistent?", "Is his work Turing-complete?"],
  "Redis for eventual, PostgreSQL for strong?": ["Which operations use which?", "CAP theorem tradeoffs in his work?"],
};

// ─── Topic detector ───────────────────────────────────────────────────────────
// Maps a typed user message → nearest chain entry. Falls back to initOptions.

export function detectChainEntry(msg: string, mode: ChatMode): string[] {
  const t = msg.toLowerCase();

  if (mode === "turing") {
    if (/formal|automata|grammar|turing.complete|chomsky|dfa|nfa/.test(t)) return CHAIN_TURING["What formal models appear in his projects?"] ?? [];
    if (/knowledge|represent|logic|ontology|inference|symbolic/.test(t))   return CHAIN_TURING["Knowledge representation used?"] ?? [];
    if (/complex|np|polynomial|big.o|approximat/.test(t))                  return CHAIN_TURING["Any NP-hard subproblems tackled?"] ?? [];
    if (/consensus|cap|consistency|distributed|partition|fault/.test(t))   return CHAIN_TURING["CAP theorem tradeoffs in his work?"] ?? [];
    return ["Is his work Turing-complete?", "Knowledge representation used?", "Distributed consensus?"];
  }

  // Project name matches → jump to that project's second-level questions
  if (/lintellect/.test(t))                    return CHAIN_BASIC["Tell me about Lintellect"] ?? [];
  if (/finmind/.test(t))                       return CHAIN_BASIC["Tell me about FinMind"] ?? [];
  if (/docweave/.test(t))                      return CHAIN_BASIC["Tell me about DocWeave"] ?? [];
  if (/cyber|threat|iiot|federat/.test(t))     return CHAIN_BASIC["Tell me about Cyber Threat Predictor"] ?? [];
  if (/pulseops/.test(t))                      return CHAIN_BASIC["Tell me about PulseOps"] ?? [];
  if (/spendlens/.test(t))                     return CHAIN_BASIC["Tell me about SpendLens"] ?? [];
  if (/vendorflow/.test(t))                    return CHAIN_BASIC["Tell me about VendorFlow"] ?? [];
  if (/rideshare/.test(t))                     return CHAIN_BASIC["Tell me about RideShare"] ?? [];
  if (/chatterbox/.test(t))                    return CHAIN_BASIC["Tell me about ChatterBox"] ?? [];
  if (/rr enterprise|nuance/.test(t))          return CHAIN_BASIC["Has he worked professionally?"] ?? [];

  // Topic matches
  if (/hire|available|role|job|position|recruit/.test(t)) return CHAIN_BASIC["Is Dev available to hire?"] ?? [];
  if (/backend|fastify|node|express|api/.test(t))         return CHAIN_BASIC["What's his backend depth?"] ?? [];
  if (/frontend|react|typescript|ui/.test(t))             return CHAIN_BASIC["What's his tech stack?"] ?? [];
  if (/cloud|aws|docker|kubernetes/.test(t))              return CHAIN_BASIC["Tell me about SpendLens"] ?? [];
  if (/education|school|study|degree|gpa|njit/.test(t))   return CHAIN_BASIC["Where did he study?"] ?? [];
  if (/experience|intern|work|company/.test(t))           return CHAIN_BASIC["Has he worked professionally?"] ?? [];
  if (/ai|ml|machine.learn|llm|agent/.test(t))            return CHAIN_BASIC["Any AI or ML work?"] ?? [];
  if (/kafka|infra|monitoring/.test(t))                   return CHAIN_BASIC["Tell me about PulseOps"] ?? [];
  if (/c\+\+|systems|ipc|socket|concurren/.test(t))       return CHAIN_BASIC["Tell me about ChatterBox"] ?? [];
  if (/project|built|made|build|ship/.test(t))            return CHAIN_BASIC["What has Dev built?"] ?? [];

  return ["What has Dev built?", "Is Dev available to hire?", "What's his background?"];
}

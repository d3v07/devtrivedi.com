import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/sections/Footer";
import NotFound from "./NotFound";

export interface Post {
  slug: string;
  tag: string;
  title: string;
  time: string;
  date: string;
  teaser: string;
  body: string[];
}

export const POSTS: Post[] = [
  {
    slug: "cutting-aws-costs-18k",
    tag: "Cost Engineering",
    title: "How I Cut AWS Costs by $18K Without Removing a Single Feature",
    time: "4 min read",
    date: "January 2025",
    teaser: "The real story of how SpendLens found $18K in annual AWS waste hidden in plain sight.",
    body: [
      "The audit started the way most cost audits do: someone looked at the bill, made a face, and sent a Slack message. SpendLens was originally built to analyze AWS spend for other teams, so running it against our own account felt like a reasonable first step. What came back was a list of things that made me want to close the laptop and go work on a farm.",
      "The biggest single item was idle EC2 instances. Not one or two, but a full cluster of t3.medium machines that had been provisioned for a load test six months earlier and never terminated. They were sitting there at around $340 a month doing nothing. The fix was two CLI commands, but finding them took a week because nobody had tagged them properly and the instance names were all variations of 'test-cluster-temp-v2-final'. The lesson here is not about terminating instances. It is about tagging discipline from day one, because finding waste requires being able to categorize spend, and untagged resources are invisible.",
      "RDS was the second problem. We had a db.r5.large running a Postgres instance for a service that served maybe 200 requests per day at peak. Right-sizing to a db.t4g.medium cut the RDS line item by 61 percent. The catch: you cannot just resize a production database on a Tuesday afternoon. The migration required a snapshot, a new instance, a connection string update, and about 15 minutes of read-only mode. Not painful, but requires planning. Multi-AZ was also enabled on that instance for a non-critical service. Disabling standby replication for services that do not need it is another underused lever.",
      "S3 costs looked small until we broke them down by storage class. We had about 4 TB sitting in S3 Standard that had not been accessed in over 90 days. Moving it to S3 Glacier Instant Retrieval costs about 80 percent less per GB per month. The catch is that you need to know your access patterns before you make this call. For SpendLens, the data was historical cost reports. Nobody ever queries data older than 60 days during normal operations. Setting up a lifecycle rule to transition objects after 60 days took ten minutes and saved around $180 a month.",
      "Reserved instances are where most people leave the most money on the table, and it is also where most people make the worst mistakes. The mistake is buying reservations before you understand your baseline. We ran on-demand for three months, looked at the instances that had been running consistently at over 80 percent utilization, and bought 1-year no-upfront reservations for exactly those. Nothing more, nothing less. The effective discount was around 35 percent compared to on-demand. Convertible reservations are worth considering if your instance family needs are uncertain, but the discount is smaller.",
      "AWS Cost Explorer alerts are free and most teams do not use them. Setting a budget with an alert at 80 percent of the expected monthly spend takes five minutes. We set alerts at the account level and also per service tag. The per-service alerts were more useful because they surfaced the exact day a new service deployment started running more expensively than expected. Without that alert, we would have discovered the problem at month end.",
      "The most surprising cost was data transfer. We were pulling CloudWatch metrics from us-east-1 into a service running in us-west-2 every 30 seconds. Cross-region data transfer at AWS pricing is $0.02 per GB, which sounds trivial until you are transferring 50 GB a day. Routing metric collection through a regional aggregator, then syncing summaries cross-region every 5 minutes instead of raw data every 30 seconds, dropped that line item to near zero. The rule of thumb: never move raw data across regions if a summary will do.",
      "The total reduction was $18,400 annually. Nothing was removed, no features were degraded, and no SLAs changed. The work took about three weeks of part-time effort. The ratio of savings to effort makes cost audits one of the highest-leverage activities an engineering team can do. Run them quarterly, not after someone makes a face at the bill.",
    ],
  },
  {
    slug: "multi-tenant-saas-one-sprint",
    tag: "SaaS Architecture",
    title: "Building Multi-Tenant SaaS in One Sprint: What Actually Happened",
    time: "6 min read",
    date: "November 2024",
    teaser: "A brutally honest breakdown of building VendorFlow from zero to 20 tenants in 6 days.",
    body: [
      "The idea was simple: a vendor invoice processing platform for small procurement teams. The constraint was a 6-day sprint to get to a functional product with real tenants. This post is not a tutorial. It is a record of what was decided, what broke, and what I would do differently.",
      "The first architectural decision was the most important one: schema-per-tenant versus row-level security. Schema-per-tenant gives you clean isolation, simple queries, and easy per-tenant backups. It also means your migration tooling gets complicated fast, and spinning up a new tenant requires running DDL against the database. Row-level security with Postgres policies means all tenants share tables, your migration story is simple, and tenant isolation happens at the query layer. We chose RLS. For a sprint, the operational simplicity of RLS wins. At scale, schema-per-tenant has real advantages, but 20 tenants is not scale.",
      "The RLS implementation required every table to have a tenant_id column and a corresponding policy that checked tenant_id = current_setting('app.current_tenant_id'). Every query had to be prefixed with a SET LOCAL to inject the tenant context. This was wrapped in a database middleware layer that extracted the tenant from the JWT, validated it, and set the session variable before handing off to the query. The JWT contained the tenant slug, which was looked up against a tenants table on each request. This lookup was cached in Redis with a 5-minute TTL.",
      "Auth was JWT-based with tenant context embedded at login time. A user could belong to multiple tenants, so the login flow issued a tenant-scoped token rather than a global user token. Switching tenants required re-authenticating against the new tenant context. This was intentional and turned out to be the right call. Having separate tokens per tenant means a compromised token for Tenant A cannot be used to access Tenant B, which is a property you want even if it adds a small UX cost.",
      "The invoice processing pipeline was the core feature. Vendors submitted invoices via a POST endpoint. The pipeline extracted line items, validated against purchase orders stored per-tenant, calculated totals, and queued approval requests. The queue was implemented with BullMQ on top of Redis. Each tenant had a separate queue namespace. This was probably overkill for 20 tenants but felt correct structurally, and the isolation made debugging individual tenant issues much easier.",
      "Day 3 is where things went wrong. We hit a race condition in tenant creation. The tenant creation flow involved inserting a row into the tenants table, creating an admin user, seeding initial data, and issuing an onboarding token. Under concurrent requests, two sign-ups could race past the unique constraint check and attempt to create tenants with the same slug. The database constraint caught it, but the application returned a 500 rather than a clean error. The fix was a database-level unique constraint on the slug plus a retry with a modified slug on conflict, wrapped in a transaction. The real lesson was that slug generation should happen inside the transaction, not before it.",
      "The retry logic was the other place we got burned. The invoice processing queue used exponential backoff with a maximum of 5 retries. What we had not accounted for was idempotency on the processing side. If a job failed after inserting line items but before marking the invoice as processed, a retry would attempt to insert duplicate line items. The fix was to check for existing line items at the start of processing and skip insertion if they existed. This is a case where idempotent job design is not optional. It is just load-bearing correctness.",
      "What would I do differently? The RLS policy validation should be tested explicitly, not assumed. We had a test gap where certain admin routes bypassed the tenant context injection middleware, which meant those routes were running without any RLS policy active. In practice this was caught in review, but it was too close. A test that asserts every API route passes through the tenant middleware would have caught it mechanically. Second: event sourcing for the invoice state machine instead of status columns. Status columns are fine until you need to answer questions like 'how long did invoices spend in pending approval on average.' That question requires reconstructing history from audit logs, which we retrofitted awkwardly.",
      "Six days is enough to build something real if you make decisions quickly and accept that some of those decisions will be wrong. The architecture held up. The places that hurt were operational details: error handling, idempotency, and test coverage of security-critical paths. None of those are sprint planning failures. They are just hard to remember when you are moving fast.",
    ],
  },
  {
    slug: "real-time-monitoring-database",
    tag: "Observability",
    title: "Real-Time Monitoring: Because Your Database Should Tell You When It's Dying",
    time: "5 min read",
    date: "September 2024",
    teaser: "How PulseOps achieves sub-second write latency and why most monitoring setups are backwards.",
    body: [
      "Most monitoring systems are built around polling. Every 30 seconds, something queries your database, checks a metric endpoint, or pings a health URL. The results get stored, graphed, and compared against thresholds. Alerts fire when a threshold is crossed. This architecture is backwards for one fundamental reason: by the time your polling interval fires, whatever bad thing was going to happen has already happened. You are not detecting incidents. You are discovering them after the fact.",
      "PulseOps was built around the opposite premise. Instead of polling, every write to the monitored system generates an event. Those events flow through an event bus, get processed by alert rules in near-real-time, and fire notifications before a human has to notice anything is wrong. The write path needed to be fast enough that instrumentation overhead was not a concern. That meant sub-second write latency under load. At 3x normal throughput, we hit 400ms p99 on writes. That number came from a lot of decisions about where to do work.",
      "The event-driven architecture uses Go channels as the first layer of buffering inside the service. When a metric event arrives, it is handed off to a channel and the HTTP handler returns immediately. A pool of worker goroutines reads from the channel, validates the event, and writes to the persistence layer. The channel acts as a backpressure mechanism. If workers fall behind, the channel fills up and the handler blocks, which provides natural flow control without needing a separate queue for small deployments.",
      "WAL-based change data capture was considered for capturing database-level events. The appeal of CDC is that you get a complete record of every write that hits the database without any application-level instrumentation. The problem for PulseOps specifically was latency. Postgres WAL replication lag under load can be several seconds, which makes it unsuitable for an alerting pipeline where you want to catch problems within a second of them occurring. CDC is the right choice for audit logs, data replication, and event sourcing. It is the wrong choice when you need low-latency reaction.",
      "Redis Streams serve as the event bus between the ingestion layer and the alert processing layer. Each metric type has a stream. Consumer groups allow multiple alert processors to read from the same stream without duplicate processing. The XADD command is fast: under normal conditions, writes to Redis Streams come in under 1ms. The persistence layer writes to Postgres asynchronously in batches, which decouples storage durability from alert latency. Alerts fire off the stream. Historical queries hit Postgres.",
      "Cardinality explosion is the silent killer of time-series monitoring systems. Every unique combination of labels in a metric becomes a separate series. If you have a request_duration metric with labels for endpoint, status_code, region, and user_tier, and each label has 50 possible values, you have 50 to the 4th power potential series: 6.25 million. Most of them will never be written to, but the overhead of tracking them is real, and the ones that do get written create enormous storage and query costs. The fix is label discipline. High-cardinality labels like user_id, request_id, and IP address should never be metric labels. They belong in logs, not metrics.",
      "What 3x throughput means in practice is this: the system was load tested at three times its expected production write rate. At that load, write latency stayed below 500ms at the 99th percentile, alert processing stayed below 1 second end-to-end from write to notification, and error rates stayed below 0.1 percent. Hitting those numbers required profiling the hot path, identifying that JSON serialization inside the worker goroutines was the bottleneck, switching to a pre-allocated byte buffer approach, and trimming about 40ms off per-event processing time. Profiling-driven optimization, not guessing.",
      "The thing most monitoring setups get wrong is confusing data collection with observability. Collecting metrics does not mean you understand what is happening in your system. Observability means you can answer arbitrary questions about system behavior from the data you have collected. That requires thinking carefully about what questions you will need to answer under pressure at 3am, and making sure your instrumentation makes those questions answerable in under a minute.",
    ],
  },
  {
    slug: "distributed-systems-lessons",
    tag: "Systems Design",
    title: "Five Things I Learned About Distributed Systems That No Textbook Told Me",
    time: "7 min read",
    date: "August 2024",
    teaser: "Practical lessons from production failures that CAP theorem didn't prepare me for.",
    body: [
      "The distributed systems literature is excellent. The Dynamo paper, the Raft thesis, the Google Spanner paper. These are worth reading carefully. They will not, however, prepare you for the specific ways real production systems fail. The gap between theoretical guarantees and operational reality is where most engineering pain lives. These are five things I learned from production failures that the textbooks do not cover in enough detail.",
      "LESSON 1: Network partitions happen inside your datacenter too. The standard framing of the CAP theorem implies network partitions are rare events, perhaps something that happens between geographic regions. In practice, a misconfigured switch, a runaway process saturating a NIC, or a botched kernel upgrade can partition services that are physically colocated. I watched a service lose connectivity to its replica because a kernel upgrade on one host changed the default TCP window scaling behavior and nobody noticed for 40 minutes. The practical implication is that your code must handle partial failures at every layer, not just when you are thinking about multi-region deployments. Assume the network can lie to you at any time.",
      "Closely related: your health checks are probably too optimistic. A health check that returns 200 from the HTTP handler tells you the process is running and the event loop is not blocked. It does not tell you whether the database connection pool is exhausted, whether the downstream service the handler depends on is timing out, or whether your Redis instance is experiencing memory pressure. Health checks should check actual dependencies, and the timeouts on those checks should be tighter than your load balancer's failure threshold. Otherwise your load balancer will route traffic to an instance that is technically alive but functionally useless.",
      "LESSON 2: Idempotency is harder than making things work the first time. This lesson cost me the most time. Idempotency sounds simple: executing the same operation twice should have the same effect as executing it once. The problem is that most interesting operations are not naturally idempotent. Inserting a row, sending an email, charging a payment card: these are all operations where doing them twice is worse than doing them once. Making them idempotent requires either deduplication keys, two-phase commits, or careful use of database constraints. The deduplication key approach is usually the most practical: clients generate a unique ID for each logical operation, and the server checks whether that ID has been processed before doing any work. Storing these keys and making the lookup fast is where the actual implementation complexity lives.",
      "The retry problem compounds this. When you retry a failed request, you do not know whether the failure happened before the operation executed, during execution, or after execution with the response lost in transit. If you do not have idempotent operations, retries cause duplicates. If your idempotency checks are not atomic with the operation itself, you still get duplicates under concurrent retries. The correct design is: check the idempotency key, execute the operation, and record success all inside a single database transaction. This is one of those cases where reaching for a simpler solution has a high probability of being wrong.",
      "LESSON 3: Clock skew is real and will ruin your day. NTP keeps clocks synchronized to within a few milliseconds on well-configured infrastructure. A few milliseconds sounds fine until you realize you are using timestamps as tiebreakers for ordering events. If two events happen 1ms apart on different machines and your clock skew is 5ms, you cannot determine which one happened first. This shows up in subtle ways: distributed locks implemented with TTL-based expiry that expire too early on one machine, event sourcing systems that replay events out of order, and audit logs that appear to have effects happening before their causes.",
      "The practical fix is to not rely on physical timestamps for ordering. Use logical clocks (Lamport timestamps or vector clocks) when you need causal ordering. Use database sequence numbers when total order within a service is sufficient. Reserve physical timestamps for human-readable display and retention policies, not for operational correctness. Hybrid Logical Clocks (HLC) are a reasonable middle ground when you need both physical time approximation and causal ordering, but they add implementation complexity that is often not justified.",
      "LESSON 4: The database is usually not the bottleneck you think it is. When a service gets slow, the intuitive first move is to look at database query plans, add indexes, and consider caching. This is correct about 40 percent of the time. The other 60 percent, the bottleneck is something else: thread pool exhaustion, serialization overhead, unnecessary network round trips, or a single slow external API call that is blocking a thread. Profile before you optimize. The correct tool is a distributed trace, not a EXPLAIN ANALYZE on a query you suspect. Look at where time is actually being spent before deciding what to fix.",
      "LESSON 5: Your retry logic is probably wrong. Most retry implementations use fixed delays or simple exponential backoff. The two most common problems are: no jitter, which causes thundering herd when a downstream service recovers and all retrying clients hit it simultaneously, and no circuit breaker, which means a permanently failed downstream service keeps getting hammered instead of being taken out of rotation. Add jitter to your backoff (multiply the delay by a random factor between 0.5 and 1.5). Add a circuit breaker that opens after a threshold of consecutive failures and stays open for a cooldown period. These are not nice-to-haves. They are the difference between a partial outage and a cascading failure.",
    ],
  },
  {
    slug: "cs-grad-school-reality",
    tag: "Student Life",
    title: "What NJIT's MS Computer Science Actually Teaches You (Versus What You Expect)",
    time: "5 min read",
    date: "June 2024",
    teaser: "The gap between graduate school expectations and what you actually spend your time on is wider than anyone admits.",
    body: [
      "Before starting the MS program at NJIT, I had a clear picture of what graduate school would be. Deep theory, research papers, advanced algorithms, the kind of material that explains why the systems I had been building worked the way they did. Some of that expectation was met. A lot of it was not. The gap between what I expected to spend time on and what I actually spent time on was significant enough that I think it is worth writing down.",
      "The balancing act was the first surprise. Coursework in a part-time MS program competes directly with side projects, work obligations, and the kind of exploratory programming that actually builds skills quickly. The tension is real: the coursework is valuable, but so is the time you are not spending on it. The resolution I found was treating coursework assignments as forcing functions for understanding a specific topic deeply, rather than as ends in themselves. An algorithms assignment is not just a grade. It is a structured reason to understand amortized complexity in a way that you would probably skip if you were self-studying.",
      "What algorithms actually teaches you is not algorithms. It teaches you how to think about problems before writing code. The habit of characterizing a problem, identifying its structure, considering the naive solution, and then asking whether a better structure exists: that is the transferable skill. The specific algorithms matter less than the thinking process. I have never needed to implement a Fibonacci heap in production. I have needed the instinct that a priority queue might reduce a quadratic problem to log-linear many times.",
      "Reading research papers is a skill that takes months to develop and most people never build. The first five papers I read in grad school took me three hours each and I retained about 20 percent of what I read. By the end of the first year, I could extract the core contribution of a paper in 30 minutes and identify its limitations. That shift happened because I forced myself to read papers even when they were slow and dense, not because I waited until I felt ready. The payoff is that you stop treating documentation and specs as authoritative. Papers give you the habit of asking what assumptions this conclusion rests on, and that question makes you a better reader of everything.",
      "The way grad school changed how I read code was unexpected. Spending time with formal specifications and proofs of correctness makes you more suspicious of implicit assumptions in code. When you read a distributed system's README and it says 'eventual consistency,' you now ask what the actual consistency model is, what the failure modes are, and whether the documentation matches the implementation. Graduate school gives you the vocabulary to ask more precise questions, which turns out to matter a lot when you are debugging production systems at midnight.",
      "The loneliness of deep technical work is something nobody in CS talks about. Spending four hours on a problem and making no visible progress is a normal part of the work, but it does not feel normal when you are inside it. The community that makes this sustainable is not usually the formal cohort. It is the people you find in the margins: the student who is working on something adjacent to what you are working on, the professor whose office hours turn into a conversation about something you both find genuinely interesting. These connections do not happen automatically. They require showing up to things that are not strictly required.",
      "The honest return on investment of a CS master's degree in the current market is complicated. The credential matters less than it did five years ago for most roles. What matters is what you built during the program and how clearly you can explain your thinking. A master's degree that leaves you with no portfolio work and only coursework to point to is a weak investment at current tuition levels. A master's degree that gives you the time and structure to build serious projects, develop research instincts, and push your technical ceiling is a different calculation entirely. The program does not do that for you. You have to be deliberate about making it happen.",
    ],
  },
];

const POST_MAP = Object.fromEntries(POSTS.map((p) => [p.slug, p]));

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? POST_MAP[slug] : undefined;
  if (!post) return <NotFound />;

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="pt-28 pb-12 px-6 md:px-12 lg:px-24 border-b-2 border-foreground">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono-code text-xs text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" /> Back to blog
          </Link>
          <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-4">
            {post.tag}
          </span>
          <h1 className="font-display text-4xl md:text-6xl mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 font-mono-code text-xs text-muted-foreground">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.time}</span>
          </div>
        </div>
      </section>
      {/* Body */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-lg text-muted-foreground mb-12 leading-relaxed border-l-4 border-primary pl-6">
            {post.teaser}
          </p>
          <div className="space-y-6">
            {post.body.map((para, i) => (
              <p key={i} className="font-body text-base leading-relaxed text-foreground">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t-2 border-foreground">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-mono-code text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> All posts
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

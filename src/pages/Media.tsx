import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  PenLine,
  Trophy,
  ExternalLink,
  Download,
  FileText,
  Copy,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Footer from "@/components/sections/Footer";

const FACTS: [string, string][] = [
  ["Name", "Dev Trivedi"],
  ["Role", "Software Engineer & AI Engineer"],
  ["Education", "MS Computer Science, NJIT"],
  ["Based in", "New York, NY"],
  ["Status", "Open to new opportunities"],
];

const PROFILES = [
  { label: "Website", handle: "devtrivedi.com", href: "https://www.devtrivedi.com", Icon: ExternalLink },
  { label: "LinkedIn", handle: "in/trivedi-dev", href: "https://www.linkedin.com/in/trivedi-dev/", Icon: Linkedin },
  { label: "GitHub", handle: "d3v07", href: "https://github.com/d3v07", Icon: Github },
  { label: "Medium", handle: "@trivedidev16", href: "https://medium.com/@trivedidev16", Icon: PenLine },
  { label: "X", handle: "dev3vedi_7", href: "https://x.com/dev3vedi_7", Icon: Twitter },
  { label: "Devpost", handle: "dt444", href: "https://devpost.com/dt444", Icon: Trophy },
  { label: "Email", handle: "trivedidev16@gmail.com", href: "mailto:trivedidev16@gmail.com", Icon: Mail },
];

const BIOS = [
  {
    length: "Short",
    text: "Dev Trivedi is a software engineer and AI engineer, and an MS Computer Science student at NJIT.",
  },
  {
    length: "Medium",
    text: "Dev Trivedi is a software engineer and AI engineer based in New York. An MS Computer Science student at NJIT, he builds agentic AI systems, full-stack products, and cloud-native infrastructure. He is a two-time first-place hackathon winner (AG2 and Claude Builder Club) and a Google × Columbia Business School finalist.",
  },
  {
    length: "Long",
    text: "Dev Trivedi is a software engineer and AI engineer, and an MS Computer Science student at the New Jersey Institute of Technology (NJIT). He focuses on AI engineering — including retrieval-augmented generation (RAG) and agentic LangGraph workflows — alongside full-stack development and cloud-native infrastructure on AWS. His work spans event-driven systems (PulseOps), AI cloud-cost optimization (SpendLens), and multi-tenant SaaS (VendorFlow), with professional experience at NJIT, RR Enterprise, and Nuance Media. He has won first place at the AG2 (formerly Microsoft AutoGen) and Claude Builder Club hackathons and was a finalist at the Google × Columbia Business School hackathon — leading the team in each.",
  },
];

const Media = () => {
  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text).then(
      () => toast.success(`${label} copied`),
      () => toast.error("Couldn't copy — select and copy manually"),
    );
  };

  return (
    <main className="min-h-screen">
      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono-code text-xs tracking-widest uppercase text-primary mb-5 flex items-center gap-2"
          >
            <span className="w-5 h-px bg-primary" />
            // media-kit
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight mb-4"
          >
            Dev Trivedi
          </motion.h1>
          <p className="font-body text-base text-muted-foreground max-w-2xl mb-12">
            Press &amp; media kit — the official source for the name, bio, headshot, and links of
            Dev Trivedi (software engineer &amp; AI engineer, devtrivedi.com).
          </p>

          {/* Headshot + facts */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 mb-14">
            <div className="md:col-span-4">
              <img
                src="/headshot.jpg"
                alt="Headshot of Dev Trivedi, software engineer"
                width={800}
                height={800}
                className="w-full border-2 border-foreground hard-shadow bg-card"
              />
              <a
                href="/headshot.jpg"
                download="dev-trivedi-headshot.jpg"
                className="mt-3 inline-flex items-center gap-2 font-mono-code text-xs px-3 py-2 border-2 border-foreground neo-btn w-full justify-center"
              >
                <Download className="w-3.5 h-3.5" /> Download headshot
              </a>
            </div>

            <div className="md:col-span-8">
              <span className="font-mono-code text-[11px] tracking-widest uppercase text-primary block mb-4">
                Quick facts
              </span>
              <dl className="border-2 border-foreground hard-shadow">
                {FACTS.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-4 sm:px-6 py-3 ${
                      i < FACTS.length - 1 ? "border-b border-border/20" : ""
                    } ${i % 2 === 0 ? "bg-card" : "bg-background"}`}
                  >
                    <dt className="font-mono-code text-xs text-muted-foreground w-full sm:w-32 shrink-0">{k}</dt>
                    <dd className="font-body text-sm text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Bios */}
          <div className="mb-14">
            <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-5">
              Bio — pick a length
            </span>
            <div className="space-y-4">
              {BIOS.map((b) => (
                <div key={b.length} className="border-2 border-foreground bg-card p-5 hard-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-code text-[11px] tracking-widest uppercase text-muted-foreground">
                      {b.length}
                    </span>
                    <button
                      onClick={() => copy(b.text, `${b.length} bio`)}
                      className="inline-flex items-center gap-1.5 font-mono-code text-[11px] px-2.5 py-1 border border-foreground/40 hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <p className="font-body text-sm text-foreground leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Official links */}
          <div className="mb-14">
            <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-5">
              Official links
            </span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PROFILES.map(({ label, handle, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer me"
                  className="group flex items-center gap-3 border-2 border-foreground bg-background p-3.5 neo-btn"
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="min-w-0">
                    <span className="font-body text-sm block leading-tight">{label}</span>
                    <span className="font-mono-code text-[11px] text-muted-foreground truncate block">{handle}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Resume */}
          <div>
            <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-5">
              Documents
            </span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm px-5 py-3 bg-foreground text-background border-2 border-foreground neo-btn-primary"
            >
              <FileText className="w-4 h-4" /> Resume (PDF)
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Media;

import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import MiniWindow from "./MiniWindow";
import { ArrowUpRight } from "lucide-react";

const POSTS = [
  { slug: "cutting-aws-costs-18k",          title: "How I Cut AWS Costs by $18K Without Removing a Feature",          tag: "Cost Eng",        date: "Jan 2025" },
  { slug: "multi-tenant-saas-one-sprint",    title: "Building Multi-Tenant SaaS in One Sprint",                        tag: "SaaS",            date: "Nov 2024" },
  { slug: "real-time-monitoring-database",   title: "Real-Time Monitoring Without Polling Your Database to Death",      tag: "Backend",         date: "Oct 2024" },
  { slug: "distributed-systems-lessons",     title: "5 Lessons From Distributed Systems That Actually Scale",          tag: "Distributed",     date: "Sep 2024" },
  { slug: "cs-grad-school-reality",          title: "The CS Grad School Reality Check Nobody Gives You",               tag: "Career",          date: "Aug 2024" },
];

interface BlogAppProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex?: number;
}

export default function BlogApp({ onClose, onFocus, zIndex }: BlogAppProps) {
  const navigate = useNavigate();
  const { setWindowOpen, windowState, setWindowState } = useApp();

  const openPost = (slug: string) => {
    setWindowOpen(true);
    if (windowState === "minimized") setWindowState("normal");
    navigate(`/blog/${slug}`);
  };

  return (
    <MiniWindow
      title="blog — dev trivedi"
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
      initialX={240}
      initialY={80}
      width={380}
      height={310}
    >
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b-2 border-foreground bg-card shrink-0">
        <p className="font-mono-code text-[9px] tracking-widest uppercase text-primary font-bold">
          Writing
        </p>
        <p className="font-display text-lg leading-tight mt-0.5">Technical blog</p>
      </div>

      {/* Post list */}
      <div className="flex-1 overflow-y-auto">
        {POSTS.map((post, i) => (
          <button
            key={post.slug}
            onClick={() => openPost(post.slug)}
            className={`w-full text-left px-4 py-3 flex items-start justify-between gap-3 group hover:bg-foreground/5 transition-colors ${
              i < POSTS.length - 1 ? "border-b border-border/20" : ""
            }`}
          >
            <div className="flex-1 min-w-0">
              <p className="font-body text-[11px] font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono-code text-[9px] text-primary border border-primary/30 px-1">
                  {post.tag}
                </span>
                <span className="font-mono-code text-[9px] text-muted-foreground">
                  {post.date}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="shrink-0 px-4 py-2.5 border-t-2 border-foreground bg-card">
        <button
          onClick={() => {
            setWindowOpen(true);
            if (windowState === "minimized") setWindowState("normal");
            navigate("/blog");
          }}
          className="w-full font-mono-code text-xs py-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          All posts →
        </button>
      </div>
    </MiniWindow>
  );
}

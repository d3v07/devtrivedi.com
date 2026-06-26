import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Per-route <head> management. The app is a client-rendered SPA whose index.html
 * hardcodes a homepage canonical/title; without this, every route would claim to
 * be the homepage. Google renders JS, so updating title/description/canonical and
 * OG tags here lets each page (and blog post) be indexed as its own URL.
 */

const SITE = "https://www.devtrivedi.com";

interface Meta {
  title: string;
  description: string;
}

const DEFAULT: Meta = {
  title: "Dev Trivedi — Software Engineer | Full-Stack, Cloud & AI",
  description:
    "Dev Trivedi is a software engineer building scalable, cloud-native systems and AI/LLM tools. MS Computer Science at NJIT. Full-stack, AWS, distributed systems.",
};

const ROUTES: Record<string, Meta> = {
  "/": DEFAULT,
  "/about": {
    title: "About — Dev Trivedi, Software Engineer @ NJIT",
    description:
      "Dev Trivedi's background: software engineer and MS Computer Science candidate at NJIT, with experience across distributed systems, AWS, and AI/LLM engineering.",
  },
  "/projects": {
    title: "Projects — Dev Trivedi",
    description:
      "Selected engineering work by Dev Trivedi: PulseOps, SpendLens, VendorFlow, CivicProof and more — event-driven systems, AI tooling, and multi-tenant SaaS.",
  },
  "/blog": {
    title: "Blog — Dev Trivedi",
    description:
      "Technical writing by Dev Trivedi on distributed systems, cloud cost engineering, observability, and multi-tenant SaaS architecture.",
  },
  "/contact": {
    title: "Contact — Dev Trivedi",
    description:
      "Get in touch with Dev Trivedi — software engineer open to new opportunities. Reach out via email, LinkedIn, or GitHub.",
  },
  "/changelog": {
    title: "Changelog — Dev Trivedi",
    description: "Recent updates and changes to Dev Trivedi's portfolio and projects.",
  },
};

const BLOG: Record<string, Meta> = {
  "cutting-aws-costs-18k": {
    title: "How I Cut AWS Costs by $18K Without Removing a Feature — Dev Trivedi",
    description:
      "A practical breakdown of how Dev Trivedi cut AWS spend by $18K a year through cost engineering — without removing a single feature.",
  },
  "multi-tenant-saas-one-sprint": {
    title: "Building Multi-Tenant SaaS in One Sprint — Dev Trivedi",
    description:
      "What actually happened building a multi-tenant SaaS with tenant isolation, RBAC, and async billing in a single sprint.",
  },
  "real-time-monitoring-database": {
    title: "Real-Time Monitoring: When Your Database Should Tell You It's Dying — Dev Trivedi",
    description:
      "Designing real-time observability so your database surfaces problems before they page you — lessons from building PulseOps.",
  },
  "distributed-systems-lessons": {
    title: "Five Things I Learned About Distributed Systems — Dev Trivedi",
    description:
      "Five hard-won lessons about distributed systems that no textbook told Dev Trivedi — consistency, failure modes, and tradeoffs.",
  },
  "cs-grad-school-reality": {
    title: "What NJIT's MS Computer Science Actually Teaches You — Dev Trivedi",
    description:
      "An honest look at what an MS in Computer Science at NJIT actually teaches versus what you expect going in.",
  },
};

function setMetaName(name: string, content: string) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProp(property: string, content: string) {
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const blog = pathname.match(/^\/blog\/(.+)$/);
    const meta = blog ? BLOG[blog[1]] ?? ROUTES["/blog"] : ROUTES[pathname] ?? DEFAULT;
    const url = SITE + (pathname === "/" ? "/" : pathname);

    document.title = meta.title;
    setMetaName("description", meta.description);
    setCanonical(url);
    setMetaProp("og:title", meta.title);
    setMetaProp("og:description", meta.description);
    setMetaProp("og:url", url);
    setMetaName("twitter:title", meta.title);
    setMetaName("twitter:description", meta.description);
  }, [pathname]);

  return null;
}

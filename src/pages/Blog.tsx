import Footer from "@/components/sections/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { POSTS } from "./BlogPost";

export default function Blog() {
  return (
    <main className="min-h-screen">
      {/* Header section */}
      <section className="pt-28 pb-16 px-6 md:px-12 lg:px-24 border-b-2 border-foreground">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono-code text-xs tracking-widest uppercase text-primary block mb-4">
            The Blog
          </span>
          <h1 className="font-display text-4xl md:text-8xl mb-6">Writing.</h1>
          <p className="font-body text-muted-foreground max-w-xl">
            Technical writing from the trenches. Case studies, lessons learned, and honest takes on building software.
          </p>
        </div>
      </section>
      {/* Post list */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-0 border-2 border-foreground hard-shadow-lg">
          {POSTS.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.06}>
              <Link
                to={`/blog/${post.slug}`}
                className={`flex items-start justify-between p-6 hover:bg-primary/5 transition-colors group ${
                  i < POSTS.length - 1 ? "border-b border-border/20" : ""
                }`}
              >
                <div className="flex-1">
                  <span className="font-mono-code text-xs text-primary block mb-2">
                    {post.tag}
                  </span>
                  <h2 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {post.teaser}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4 sm:ml-8 mt-1">
                  <span className="font-mono-code text-xs text-muted-foreground hidden md:block">
                    {post.time}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

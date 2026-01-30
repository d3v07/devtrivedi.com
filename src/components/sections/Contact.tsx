import { ArrowUpRight, FileText } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="font-body text-sm tracking-widest uppercase text-primary block mb-4">
            Get in Touch
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
            Let's build<br />
            <em>something great</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Links */}
          <div className="space-y-4">
            <a
              href="mailto:devtrivedi@example.com"
              className="flex items-center justify-between py-4 border-b border-border group hover:border-primary transition-colors"
            >
              <span className="font-body">devtrivedi@example.com</span>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
            
            <a
              href="https://linkedin.com/in/devtrivedi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 border-b border-border group hover:border-primary transition-colors"
            >
              <span className="font-body">LinkedIn</span>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
            
            <a
              href="https://github.com/devtrivedi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 border-b border-border group hover:border-primary transition-colors"
            >
              <span className="font-body">GitHub</span>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>

          {/* Resume download */}
          <div className="flex flex-col justify-end">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-3 font-body text-lg bg-foreground text-background px-8 py-4 hover:bg-primary transition-colors w-fit"
            >
              <FileText className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

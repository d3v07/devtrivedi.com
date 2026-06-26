import { Github, Linkedin, Mail, Twitter, PenLine, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/d3v07", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/trivedi-dev/", Icon: Linkedin },
  { label: "X", href: "https://x.com/dev3vedi_7", Icon: Twitter },
  { label: "Medium", href: "https://medium.com/@trivedidev16", Icon: PenLine },
  { label: "Devpost", href: "https://devpost.com/dt444", Icon: Trophy },
  { label: "Email", href: "mailto:trivedidev16@gmail.com", Icon: Mail },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        {/* Marquee */}
        <div className="overflow-hidden mb-12 pb-2">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="font-display text-3xl md:text-6xl lg:text-8xl opacity-20 mx-8">
                Dev Trivedi • Software Engineer • Full Stack • AWS •
              </span>
            ))}
          </div>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-7">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer me"
              aria-label={label}
              className="flex items-center gap-2 font-mono-code text-xs px-3 py-1.5 border border-background/30 text-background/80 hover:bg-background hover:text-foreground transition-colors"
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
          <p className="font-body text-sm opacity-60">© {currentYear} Dev Trivedi</p>
          <span className="hidden sm:block w-px h-4 bg-background/20" aria-hidden="true" />
          <Link
            to="/media"
            className="font-mono-code text-xs opacity-60 hover:opacity-100 hover:text-primary transition-all"
          >
            Press / media kit →
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

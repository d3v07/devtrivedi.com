import { ArrowUpRight, FileText, Github, Linkedin, Mail, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import Footer from "@/components/sections/Footer";

const Contact = () => {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "trivedidev16@gmail.com",
      href: "mailto:trivedidev16@gmail.com",
      description: "Best for formal inquiries",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/trivedi-dev",
      href: "https://linkedin.com/in/trivedi-dev",
      description: "Let's connect professionally",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/d3v07",
      href: "https://github.com/d3v07",
      description: "Check out my code",
    },
  ];

  return (
    <main className="pt-32 pb-24 min-h-screen relative overflow-hidden cursor-none">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-40 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <section className="px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-6xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-body text-sm tracking-widest uppercase text-primary mb-6 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-primary" />
            Get in Touch
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8"
          >
            Let's build<br />
            <em className="text-primary">something great</em>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-lg text-muted-foreground max-w-xl mb-20"
          >
            I'm currently open to new opportunities and collaborations. 
            Whether you have a question, a project idea, or just want to say hi, 
            I'd love to hear from you!
          </motion.p>

          <div className="grid md:grid-cols-2 gap-20">
            {/* Contact Links */}
            <div className="space-y-0">
              {contactLinks.map((contact, index) => (
                <ScrollReveal key={contact.label} delay={index * 0.1}>
                  <motion.a
                    href={contact.href}
                    target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-8 border-b border-border group hover:border-primary transition-all duration-500"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-6">
                      <motion.div 
                        className="p-4 bg-card border border-border group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                      >
                        <contact.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </motion.div>
                      <div>
                        <span className="font-body text-sm text-muted-foreground block mb-1">{contact.label}</span>
                        <span className="font-body text-lg group-hover:text-primary transition-colors duration-300 block">
                          {contact.value}
                        </span>
                        <span className="font-body text-xs text-muted-foreground/60">{contact.description}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </motion.a>
                </ScrollReveal>
              ))}
            </div>

            {/* Resume & Status */}
            <div className="flex flex-col gap-8">
              <ScrollReveal delay={0.2} direction="right">
                <motion.div 
                  className="p-10 bg-card border border-border relative overflow-hidden group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Decorative corner */}
                  <motion.div 
                    className="absolute top-0 right-0 w-32 h-32 bg-primary/5"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                  
                  <FileText className="w-10 h-10 text-primary mb-6" />
                  <h2 className="font-display text-2xl mb-4 relative">Resume</h2>
                  <p className="font-body text-muted-foreground mb-8 relative">
                    Download my resume to learn more about my experience, skills, 
                    and the projects I've worked on.
                  </p>
                  <MagneticButton strength={0.2}>
                    <a
                      href="/resume.pdf"
                      download
                      className="inline-flex items-center gap-3 font-body bg-foreground text-background px-8 py-4 hover:bg-primary transition-all duration-500 relative"
                    >
                      <FileText className="w-5 h-5" />
                      Download Resume
                    </a>
                  </MagneticButton>
                </motion.div>
              </ScrollReveal>

              {/* Availability status */}
              <ScrollReveal delay={0.3} direction="right">
                <motion.div 
                  className="p-8 border border-primary/30 bg-primary/5 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.span 
                      className="w-3 h-3 bg-primary rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="font-body text-sm text-primary font-medium">Available for opportunities</span>
                  </div>
                  <p className="font-body text-muted-foreground">
                    Open to full-time roles, internships, and interesting collaborations. 
                    Based in New York City, New York 🗽 USA 🇺🇸, open to remote work.
                  </p>
                </motion.div>
              </ScrollReveal>

              {/* Quick response */}
              <ScrollReveal delay={0.4} direction="right">
                <motion.div 
                  className="p-8 bg-card/50 border border-border"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-body text-sm font-medium mb-2">Quick Response</h3>
                      <p className="font-body text-sm text-muted-foreground">
                        I typically respond within 24 hours. For urgent matters, 
                        feel free to reach out on LinkedIn.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <ScrollReveal>
        <section className="mt-32 py-24 px-6 md:px-12 lg:px-24 bg-foreground text-background relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 50%)`
            }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Sparkles className="w-8 h-8 mx-auto mb-6 text-primary" />
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Ready to create something amazing?
            </h2>
            <p className="font-body text-lg opacity-70 max-w-xl mx-auto mb-10">
              I'm excited about opportunities where I can contribute, learn, and grow. 
              Let's start a conversation.
            </p>
            <MagneticButton strength={0.2}>
              <a
                href="mailto:trivedidev16@gmail.com"
                className="inline-flex items-center gap-3 font-body text-sm px-10 py-4 bg-primary text-primary-foreground hover:scale-105 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Send me an email
              </a>
            </MagneticButton>
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </main>
  );
};

export default Contact;

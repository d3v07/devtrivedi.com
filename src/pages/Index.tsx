import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Leadership from "@/components/sections/Leadership";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Leadership />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;

const About = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="grid md:grid-cols-12 gap-12 max-w-6xl mx-auto">
        {/* Left column - Label */}
        <div className="md:col-span-3">
          <span className="font-body text-sm tracking-widest uppercase text-primary">
            About
          </span>
        </div>

        {/* Right column - Content */}
        <div className="md:col-span-9">
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8">
            I craft software that's <em>built to last</em>, not just built to ship.
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 font-body text-muted-foreground">
            <p className="leading-relaxed">
              Currently pursuing my Master's in Computer Science at NJIT with a 
              <span className="text-foreground font-medium"> 4.0 GPA</span>. I've spent 
              the last few years obsessing over distributed systems, event-driven 
              architectures, and making things run faster.
            </p>
            
            <p className="leading-relaxed">
              From reducing cloud costs by 35% to building real-time dashboards 
              that handle 10K+ daily events—I focus on impact, not just features. 
              AWS certified and always learning something new.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
            <div>
              <span className="font-display text-4xl md:text-5xl text-primary">4.0</span>
              <p className="font-body text-sm text-muted-foreground mt-2">GPA at NJIT</p>
            </div>
            <div>
              <span className="font-display text-4xl md:text-5xl text-primary">2+</span>
              <p className="font-body text-sm text-muted-foreground mt-2">Years Experience</p>
            </div>
            <div>
              <span className="font-display text-4xl md:text-5xl text-primary">35%</span>
              <p className="font-body text-sm text-muted-foreground mt-2">Cost Reduction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

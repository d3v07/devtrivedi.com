interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["C++", "Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Stack",
    skills: ["Node.js", "React", "Express", "GraphQL", "MongoDB", "PostgreSQL", "Redis"],
  },
  {
    title: "Cloud",
    skills: ["AWS EC2", "S3", "Lambda", "RDS", "CloudWatch", "Kinesis", "Azure"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "GitHub Actions", "Jenkins", "Terraform"],
  },
];

const Skills = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left column */}
          <div className="md:col-span-4">
            <span className="font-body text-sm tracking-widest uppercase text-primary block mb-4">
              Toolkit
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Technologies I work with
            </h2>
          </div>

          {/* Right column - Skills */}
          <div className="md:col-span-8">
            <div className="grid sm:grid-cols-2 gap-12">
              {skillCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-body text-sm px-4 py-2 bg-background border-2 border-border hover:border-primary hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  gpa?: string;
  focus: string;
}

const education: EducationItem[] = [
  {
    school: "NJIT",
    degree: "MS Computer Science",
    period: "2024 — 2025",
    gpa: "4.0",
    focus: "Cloud Computing, Distributed Systems, Machine Learning",
  },
  {
    school: "JNTU Hyderabad",
    degree: "BTech Computer Science",
    period: "2018 — 2022",
    focus: "Software Engineering, Databases, Networks",
  },
];

const Education = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left column */}
          <div className="md:col-span-3">
            <span className="font-body text-sm tracking-widest uppercase text-primary">
              Education
            </span>
          </div>

          {/* Right column */}
          <div className="md:col-span-9 space-y-12">
            {education.map((edu) => (
              <div key={edu.school} className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-3xl mb-2">{edu.school}</h3>
                  <p className="font-body text-muted-foreground">{edu.degree}</p>
                  <p className="font-body text-sm text-muted-foreground/70">{edu.period}</p>
                </div>
                <div>
                  {edu.gpa && (
                    <div className="mb-4">
                      <span className="font-display text-5xl text-primary">{edu.gpa}</span>
                      <span className="font-body text-sm text-muted-foreground ml-2">GPA</span>
                    </div>
                  )}
                  <p className="font-body text-sm text-muted-foreground">{edu.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

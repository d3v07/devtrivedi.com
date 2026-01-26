interface LeadershipItem {
  role: string;
  org: string;
  year: string;
}

const leadership: LeadershipItem[] = [
  {
    role: "Team Lead",
    org: "Qualcomm AI Hackathon",
    year: "2024",
  },
  {
    role: "Event Coordinator",
    org: "NJIT Google Developer Group",
    year: "2024",
  },
];

const Leadership = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left column */}
          <div className="md:col-span-3">
            <span className="font-body text-sm tracking-widest uppercase text-primary">
              Beyond Code
            </span>
          </div>

          {/* Right column */}
          <div className="md:col-span-9">
            <h2 className="font-display text-4xl md:text-5xl mb-12">
              I also lead teams and organize things.
            </h2>
            
            <div className="space-y-6">
              {leadership.map((item) => (
                <div
                  key={item.org}
                  className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-border group"
                >
                  <div>
                    <h3 className="font-display text-2xl group-hover:text-primary transition-colors">
                      {item.role}
                    </h3>
                    <p className="font-body text-muted-foreground">{item.org}</p>
                  </div>
                  <span className="font-body text-sm text-muted-foreground mt-2 md:mt-0">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;

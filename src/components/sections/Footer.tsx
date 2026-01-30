const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-32 py-12 px-6 md:px-12 lg:px-24 bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        {/* Marquee */}
        <div className="overflow-hidden mb-12 pb-2">
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="font-display text-6xl md:text-8xl opacity-20 mx-8">
              Dev Trivedi • Software Engineer • Full Stack • AWS •
            </span>
            <span className="font-display text-6xl md:text-8xl opacity-20 mx-8">
              Dev Trivedi • Software Engineer • Full Stack • AWS •
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <p className="font-body text-sm opacity-60">© {currentYear} Dev Trivedi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const logos = [
  { name: "No Company", initials: "" },
  { name: "No Company", initials: "" },
  { name: "No Company", initials: "" },
  { name: "No Company", initials: "" },
  { name: "No Company", initials: "" },
  { name: "No Company", initials: "" },
  { name: "No Company", initials: "" },
  { name: "No Company", initials: "" },
];

const LogoMarquee = () => {
  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-8">
        Trusted by fast-growing companies
      </p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee">
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center mx-12 shrink-0">
              <span className="text-sm font-semibold text-muted-foreground/70 whitespace-nowrap">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;

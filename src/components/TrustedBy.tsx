export const TrustedBy = () => {
  const companies = [
    "Gusto",
    "Mistral",
    "Vercel",
    "Verizon",
    "Docusign",
    "Glean",
    "LaunchDarkly",
    "Clerk",
    "Cribl",
    "Kong",
    "Cloudinary",
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-1
      ">
        <h2 className="text-center text-sm font-semibold text-muted-foreground mb-12 tracking-wider uppercase">
          Trusted by API companies
        </h2>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 flex items-center justify-center"
              >
                <div className="text-2xl font-semibold text-foreground/40 hover:text-foreground transition-colors whitespace-nowrap">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

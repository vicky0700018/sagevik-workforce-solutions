import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/site/Icon";
import { CtaBand } from "@/components/site/PageHero";
import { Reveal, SectionHeading, SmartImage } from "@/components/site/primitives";
import { useBanner, useSite } from "@/lib/site-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAGEVIK LLP — Recruitment & Workforce Solutions in Pune" },
      {
        name: "description",
        content:
          "SAGEVIK LLP is a Pune-based employment activities firm connecting organisations with suitable talent through a people-first approach.",
      },
      { property: "og:title", content: "SAGEVIK LLP — Recruitment & Workforce Solutions in Pune" },
      {
        property: "og:description",
        content: "Recruitment, staffing, HR support and career opportunities from SAGEVIK LLP, registered with ROC Pune.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const WHY_US = [
  { title: "Professional Approach", text: "Structured, courteous and accountable conduct at every stage of engagement.", icon: "briefcase" },
  { title: "Talent-Focused Solutions", text: "We look beyond keywords to understand skills, potential and fit.", icon: "user-search" },
  { title: "Transparent Communication", text: "Clear expectations and regular updates for organisations and candidates.", icon: "message" },
  { title: "Quality-Oriented Process", text: "Careful screening and evaluation over volume-driven shortcuts.", icon: "target" },
  { title: "Long-Term Relationships", text: "We aim to remain a dependable partner well beyond a single requirement.", icon: "handshake" },
];

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

function HomePage() {
  const { data } = useSite();
  const banner = useBanner("home");
  const { company, about, services, approach, partners } = data;
  const homeSteps = [...approach].filter((s) => s.showOnHome).sort((a, b) => a.order - b.order).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <SmartImage src="hero-office" alt="SAGEVIK LLP — professionals in a modern Pune office" eager className="absolute inset-0 -z-20 h-full w-full" imgClassName="animate-slow-zoom object-[70%_center]" />
        <div className="bg-hero-overlay absolute inset-0 -z-10" />
        <div className="pattern-grid absolute inset-0 -z-10 opacity-30" />
        <div className="container-page grid min-h-[calc(100svh-7rem)] items-center gap-12 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:py-28">
          <div>
            <span className="eyebrow eyebrow-light animate-fade-up">{banner.eyebrow}</span>
            <h1 className="display-xl animate-fade-up mt-6 max-w-3xl text-navy-foreground" style={{ animationDelay: "100ms" }}>
              {banner.title}
            </h1>
            <p className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed text-navy-muted md:text-lg" style={{ animationDelay: "200ms" }}>
              {banner.subtitle}
            </p>
            <div className="animate-fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: "300ms" }}>
              <Link to="/services" className="btn btn-gold">
                Explore Our Services <Icon name="arrow-right" size={16} />
              </Link>
              <Link to="/careers" hash="apply" className="btn btn-outline-light">
                <Icon name="upload" size={16} /> Submit Your Resume
              </Link>
            </div>
          </div>
          <div className="animate-fade-up hidden justify-end lg:flex" style={{ animationDelay: "450ms" }}>
            <div className="glass-dark animate-float-soft w-80 rounded-3xl p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-navy-deep">
                  <Icon name="shield" size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">Registered LLP</p>
                  <p className="font-display text-xl font-semibold text-navy-foreground">{company.registrationAuthority}</p>
                </div>
              </div>
              <div className="my-6 h-px bg-navy-foreground/10" />
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-navy-muted">LLPIN</dt>
                  <dd className="font-semibold text-navy-foreground">{company.llpin}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-navy-muted">Status</dt>
                  <dd className="flex items-center gap-2 font-semibold text-navy-foreground">
                    <span className="h-2 w-2 rounded-full bg-success" /> {company.status}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-navy-muted">Incorporated</dt>
                  <dd className="font-semibold text-navy-foreground">{company.incorporationDate}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gold-gradient opacity-60" />
      </section>

      {/* INTRODUCTION */}
      <section className="section-pad relative">
        <div className="pattern-dots pointer-events-none absolute right-0 top-10 h-64 w-64 opacity-70" />
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Who We Are" title={<>A considered approach to <em className="text-primary not-italic">employment</em>.</>} />
            <div className="gold-rule mt-8" />
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg leading-relaxed text-foreground/85">{about.intro}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <Icon name="compass" className="text-gold-deep" />
                <h3 className="mt-3 font-display text-xl font-semibold text-navy">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{about.vision}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <Icon name="target" className="text-gold-deep" />
                <h3 className="mt-3 font-display text-xl font-semibold text-navy">Our Approach</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{about.mission}</p>
              </div>
            </div>
            <Link to="/about" className="btn btn-navy mt-8">
              Read More <Icon name="arrow-right" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad bg-ivory">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <SectionHeading eyebrow="Our Services" title="Employment services, thoughtfully delivered." />
            </Reveal>
            <Reveal delay={100}>
              <Link to="/services" className="link-arrow">
                View all services <Icon name="arrow-right" size={16} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <Link
                  to="/services"
                  hash={s.id}
                  className="card-premium card-hover group relative flex h-full flex-col overflow-hidden p-8"
                >
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
                      <Icon name={s.icon} size={24} />
                    </span>
                    <span className="font-display text-4xl font-semibold text-border transition-colors group-hover:text-gold-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold text-navy">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                  <span className="link-arrow mt-6 text-sm">
                    Learn more <Icon name="arrow-right" size={15} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">Service categories are indicative and may be updated by SAGEVIK LLP.</p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-pad relative overflow-hidden bg-navy-gradient">
        <div className="pattern-grid absolute inset-0 opacity-50" />
        <div className="container-page relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Why Choose Us"
              title="Principles that guide every engagement."
              text="We are a young firm, and we intend to earn trust the right way — through how we work, not through claims."
            />
            <Link to="/approach" className="btn btn-outline-light mt-10">
              See our approach <Icon name="arrow-right" size={16} />
            </Link>
          </Reveal>
          <div className="divide-y divide-navy-foreground/10 border-y border-navy-foreground/10">
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div className="group flex gap-6 py-6 transition-colors">
                  <span className="font-display text-lg font-semibold text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <h3 className="flex items-center gap-3 font-display text-2xl font-semibold text-navy-foreground">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-muted">{w.text}</p>
                  </div>
                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-navy-foreground/15 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep sm:flex">
                    <Icon name={w.icon} size={20} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <SectionHeading align="center" eyebrow="Our Approach" title="Four steps to the right match." text="A clear process that keeps both organisations and candidates informed and confident." />
          </Reveal>
          <div className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-gold to-transparent lg:block" />
            {homeSteps.map((s, i) => (
              <Reveal key={s.id} delay={i * 110} className="relative text-center">
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-card text-primary shadow-soft">
                  <Icon name={s.icon} size={24} />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[0.65rem] font-bold text-gold">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-navy">{s.homeTitle}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/approach" className="link-arrow">
              Explore our full process <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="section-pad bg-ivory">
        <div className="container-page">
          <Reveal>
            <SectionHeading align="center" eyebrow="Leadership" title="Our Designated Partners" />
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2">
            {[...partners].sort((a, b) => a.order - b.order).map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <article className="card-premium card-hover group relative h-full overflow-hidden p-10 text-center">
                  <div className="pattern-dots absolute inset-x-0 top-0 h-28 opacity-60" />
                  <span className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-navy-gradient shadow-navy ring-4 ring-card ring-offset-2 ring-offset-gold/40">
                    <span className="font-display text-4xl font-semibold text-gold">{initials(p.name)}</span>
                  </span>
                  <h3 className="relative mt-7 font-display text-[1.7rem] font-semibold leading-tight text-navy">{p.name}</h3>
                  <p className="relative mt-2 text-xs font-bold uppercase tracking-[0.22em] text-gold-deep">{p.designation}</p>
                  <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESUME CTA */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
              <div className="p-10 md:p-14">
                <span className="eyebrow">For Job Seekers</span>
                <h2 className="display-lg mt-4 text-navy">Your next opportunity could start with one upload.</h2>
                <p className="mt-5 max-w-lg text-muted-foreground">
                  Share your resume with SAGEVIK LLP. We review profiles against current and upcoming requirements, and reach out when there's a relevant match.
                </p>
                <ul className="mt-6 grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
                  {["PDF, DOC or DOCX accepted", "Simple two-minute form", "Respectful handling of your details", "Relevant role matching"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Icon name="check" size={16} className="text-success" /> {t}
                    </li>
                  ))}
                </ul>
                <Link to="/careers" hash="apply" className="btn btn-primary mt-9">
                  <Icon name="upload" size={16} /> Upload Your Resume
                </Link>
              </div>
              <div className="relative flex items-center justify-center overflow-hidden bg-navy-gradient p-12">
                <div className="pattern-grid absolute inset-0 opacity-60" />
                <div className="animate-float-soft relative w-full max-w-xs rounded-2xl bg-card p-6 shadow-lift">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Icon name="file-text" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Your_Resume.pdf</p>
                      <p className="text-xs text-muted-foreground">Ready to share</p>
                    </div>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-4/5 rounded-full bg-gold-gradient" />
                  </div>
                  <div className="mt-5 space-y-2">
                    <div className="h-2 w-full rounded-full bg-muted" />
                    <div className="h-2 w-3/4 rounded-full bg-muted" />
                    <div className="h-2 w-1/2 rounded-full bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="pb-8">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
            {[
              { label: "Legal Status", value: `${company.status} LLP`, icon: "shield" },
              { label: "Registered With", value: company.registrationAuthority, icon: "building" },
              { label: "LLPIN", value: company.llpin, icon: "id-card" },
              { label: "Established", value: company.established, icon: "calendar" },
            ].map((h, i) => (
              <Reveal key={h.label} delay={i * 80} className="bg-card p-7 md:p-9">
                <Icon name={h.icon} className="text-gold-deep" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{h.label}</p>
                <p className="mt-2 font-display text-2xl font-semibold text-navy md:text-3xl">{h.value}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a hiring requirement or business enquiry?"
        text="Tell us about your organisation and what you are looking for. We'd be glad to understand your needs."
        primary={{ label: "Contact Us", to: "/contact" }}
        secondary={{ label: "Explore Services", to: "/services" }}
      />
    </>
  );
}

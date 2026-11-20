import { createFileRoute } from "@tanstack/react-router";
import { Icon } from "@/components/site/Icon";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Reveal, SectionHeading, SmartImage } from "@/components/site/primitives";
import { useSite } from "@/lib/site-store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — SAGEVIK LLP, Pune" },
      {
        name: "description",
        content: "Learn about SAGEVIK LLP: our background, vision, mission, values, Designated Partners and registered company details.",
      },
      { property: "og:title", content: "About SAGEVIK LLP" },
      { property: "og:description", content: "A people-first employment partner registered with ROC Pune — vision, values and leadership." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data } = useSite();
  const { about, coreValues, partners, company } = data;
  const legal: [string, string][] = [
    ["Business Name", company.name],
    ["Business Type", company.businessType],
    ["Legal Structure", company.legalStructure],
    ["Registration Authority", company.registrationAuthority],
    ["LLPIN", company.llpin],
    ["Status", company.status],
    ["Incorporation Date", company.incorporationDate],
  ];

  return (
    <>
      <PageHero page="about" image="about-workspace" crumb="About Us" />

      {/* Story */}
      <section className="section-pad">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border border-gold/40" />
            <SmartImage src="about-boardroom" alt="SAGEVIK LLP team discussion in a boardroom" className="img-zoom relative aspect-[4/5] rounded-[2rem] shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]" />
            <div className="absolute -bottom-8 right-4 rounded-2xl bg-navy-gradient px-7 py-5 shadow-navy sm:right-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Established</p>
              <p className="font-display text-4xl font-semibold text-navy-foreground">{company.established}</p>
              <p className="text-xs text-navy-muted">Pune, Maharashtra</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="Our Story" title="Built on the belief that the right match matters." />
            <p className="mt-6 text-lg leading-relaxed text-foreground/85">{about.intro}</p>
            <p className="mt-5 leading-relaxed text-muted-foreground">{about.background}</p>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-pad bg-ivory">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-navy-gradient p-10 md:p-12">
              <div className="pattern-grid absolute inset-0 opacity-50" />
              <div className="relative">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-navy-deep">
                  <Icon name="compass" size={24} />
                </span>
                <h2 className="display-md mt-8 text-navy-foreground">Our Vision</h2>
                <p className="mt-4 text-lg leading-relaxed text-navy-muted">{about.vision}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-premium h-full rounded-[2rem] p-10 md:p-12">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Icon name="target" size={24} />
              </span>
              <h2 className="display-md mt-8 text-navy">Our Mission</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{about.mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <SectionHeading align="center" eyebrow="Core Values" title="What we stand for." />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v, i) => (
              <Reveal key={v.id} delay={i * 80}>
                <div className="card-premium card-hover group h-full p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold-deep transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
                    <Icon name={v.icon} size={20} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-navy">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative overflow-hidden bg-secondary/60 py-24">
        <div className="pattern-dots absolute inset-0 opacity-70" />
        <Reveal className="container-page relative mx-auto max-w-4xl text-center">
          <Icon name="quote" size={42} className="mx-auto text-gold" strokeWidth={1.2} />
          <span className="eyebrow mt-6 justify-center">Our Business Philosophy</span>
          <p className="mt-6 font-display text-[1.7rem] font-medium leading-snug text-navy md:text-[2.2rem]">{about.philosophy}</p>
        </Reveal>
      </section>

      {/* Partners */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Leadership" title="Designated Partners" text="SAGEVIK LLP is led by its two Designated Partners, who oversee the firm's direction and conduct." />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[...partners].sort((a, b) => a.order - b.order).map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <article className="card-premium card-hover flex h-full gap-6 p-8">
                  <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-navy-gradient font-display text-3xl font-semibold text-gold shadow-navy">
                    {p.name.split(" ").filter(Boolean).map((w) => w[0]).filter((_, idx, arr) => idx === 0 || idx === arr.length - 1).join("")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-navy">{p.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">{p.designation}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="section-pad bg-ivory">
        <div className="container-page grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal>
            <div className="card-premium overflow-hidden">
              <div className="flex items-center gap-3 border-b border-border px-8 py-6">
                <Icon name="scale" className="text-gold-deep" />
                <h2 className="font-display text-2xl font-semibold text-navy">Legal Company Information</h2>
              </div>
              <dl className="divide-y divide-border">
                {legal.map(([k, v]) => (
                  <div key={k} className="grid gap-1 px-8 py-4 sm:grid-cols-[14rem_1fr]">
                    <dt className="text-sm text-muted-foreground">{k}</dt>
                    <dd className="text-sm font-semibold text-foreground">
                      {k === "Status" ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-success">
                          <span className="h-1.5 w-1.5 rounded-full bg-success" /> {v}
                        </span>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-[1.25rem] bg-navy-gradient p-8">
              <div className="pattern-grid absolute inset-0 opacity-50" />
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-navy-deep">
                  <Icon name="map-pin" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-navy-foreground">Registered Office</h3>
                <p className="mt-4 leading-relaxed text-navy-muted">{company.address}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Let's discuss how we can support you."
        text="Whether you're hiring or exploring opportunities, we're ready to listen."
        primary={{ label: "Contact Us", to: "/contact" }}
        secondary={{ label: "Submit Your Resume", to: "/careers", hash: "apply" }}
      />
    </>
  );
}

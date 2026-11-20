import { createFileRoute } from "@tanstack/react-router";
import { Icon } from "@/components/site/Icon";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Reveal, SectionHeading, SmartImage } from "@/components/site/primitives";
import { useSite } from "@/lib/site-store";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Our Approach — How SAGEVIK LLP Works" },
      {
        name: "description",
        content:
          "From understanding business requirements to relationship management — the five-stage process SAGEVIK LLP follows for every engagement.",
      },
      { property: "og:title", content: "Our Approach — SAGEVIK LLP" },
      { property: "og:description", content: "A considered five-stage process built around people, quality and clear communication." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApproachPage,
});

const PRINCIPLES = [
  { title: "Listen first", text: "Every engagement starts with understanding, not assumptions.", icon: "message" },
  { title: "Quality over volume", text: "A focused shortlist respects everyone's time.", icon: "target" },
  { title: "Fairness to candidates", text: "Clear, respectful communication throughout the process.", icon: "scale" },
  { title: "Continuity", text: "We stay engaged after a placement to support what comes next.", icon: "handshake" },
];

function ApproachPage() {
  const { data } = useSite();
  const steps = [...data.approach].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero page="approach" image="approach-listening" crumb="Our Approach" />

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Working Philosophy"
                title="People are not profiles."
                text="Our process is designed to understand both sides of every match — the organisation's needs and the candidate's aspirations — and to keep everyone informed along the way."
              />
              <div className="mt-10 grid grid-cols-5 gap-2">
                {steps.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="group rounded-xl border border-border bg-card p-3 text-center transition hover:border-gold">
                    <span className="font-display text-2xl font-semibold text-navy group-hover:text-gold-deep">{s.order}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <ol className="relative space-y-6 border-l border-border pl-8 md:pl-12">
            <span className="absolute -left-px top-0 h-40 w-px bg-gold-gradient" />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 60} className="relative">
                <div id={s.id} className="scroll-mt-32">
                  <span className="absolute -left-[3.05rem] top-8 flex h-9 w-9 items-center justify-center rounded-full border-4 border-background bg-navy text-xs font-bold text-gold md:-left-[4.05rem]">
                    {s.order}
                  </span>
                  <div className="card-premium card-hover group p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">Stage {String(s.order).padStart(2, "0")}</p>
                        <h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-tight text-navy">{s.title}</h3>
                      </div>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
                        <Icon name={s.icon} size={22} />
                      </span>
                    </div>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{s.description}</p>
                    {s.points.length ? (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {s.points.map((p) => (
                          <span key={p} className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground/80">
                            {p}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <SmartImage src="approach-evaluation" alt="Interview panel evaluating a candidate" className="img-zoom aspect-[4/3] rounded-[2rem] shadow-lift" />
            <div className="glass-dark absolute -bottom-6 left-6 right-6 rounded-2xl p-5 sm:left-auto sm:w-72">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Candidate Evaluation</p>
              <p className="mt-1 text-sm text-navy-foreground">Structured conversations help both sides make informed decisions.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="What Guides Us" title="Principles behind every stage." />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border bg-card p-6">
                  <Icon name={p.icon} className="text-gold-deep" />
                  <h3 className="mt-4 font-display text-xl font-semibold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Start with a conversation."
        text="Tell us about your requirement and we'll walk you through how we'd approach it."
        primary={{ label: "Contact Us", to: "/contact" }}
        secondary={{ label: "View Services", to: "/services" }}
      />
    </>
  );
}

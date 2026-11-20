import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/site/Icon";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Reveal, SmartImage } from "@/components/site/primitives";
import { useSite } from "@/lib/site-store";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Recruitment, Staffing & HR Support | SAGEVIK LLP" },
      {
        name: "description",
        content:
          "Recruitment & talent acquisition, workforce solutions, HR support, staffing, career opportunities and employment consultancy from SAGEVIK LLP, Pune.",
      },
      { property: "og:title", content: "Services — SAGEVIK LLP" },
      { property: "og:description", content: "Employment services shaped around the needs of organisations and candidates in Pune." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { data } = useSite();
  const { services } = data;

  return (
    <>
      <PageHero page="services" crumb="Services" />

      {/* Quick index */}
      <section className="border-b border-border bg-card">
        <div className="container-page flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
            >
              <Icon name={s.icon} size={14} /> {s.title}
            </a>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page space-y-24 lg:space-y-32">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article id={s.id} key={s.id} className="grid scroll-mt-32 items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <Reveal className={`relative ${flip ? "lg:order-2" : ""}`}>
                  <div className={`absolute -bottom-5 h-2/3 w-2/3 rounded-[2rem] bg-secondary ${flip ? "-left-5" : "-right-5"}`} />
                  <SmartImage src={s.image} alt={s.title} className="img-zoom relative aspect-[4/3] rounded-[2rem] shadow-lift" />
                  <span className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-primary shadow-soft">
                    <Icon name={s.icon} size={24} />
                  </span>
                </Reveal>
                <Reveal delay={120}>
                  <span className="font-display text-6xl font-semibold text-gold/50">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="display-lg mt-2 text-navy">{s.title}</h2>
                  <p className="mt-4 text-lg text-foreground/80">{s.summary}</p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{s.description}</p>
                  {s.benefits.length ? (
                    <div className="mt-8">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">Key benefits</p>
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {s.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                              <Icon name="check" size={12} strokeWidth={2.5} />
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <Link to="/contact" className="btn btn-primary mt-9">
                    Enquire about this service <Icon name="arrow-right" size={16} />
                  </Link>
                </Reveal>
              </article>
            );
          })}
        </div>
        <p className="container-page mt-20 text-center text-xs text-muted-foreground">
          Services described are indicative. Scope and terms are discussed individually with each organisation.
        </p>
      </section>

      <CtaBand
        title="Not sure which service fits your need?"
        text="Share your requirement and we'll help you identify the right starting point."
        primary={{ label: "Send an Enquiry", to: "/contact" }}
      />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ApplicationForm } from "@/components/site/ApplicationForm";
import { Icon } from "@/components/site/Icon";
import { PageHero } from "@/components/site/PageHero";
import { Modal, Reveal, SectionHeading, SmartImage } from "@/components/site/primitives";
import type { Job } from "@/lib/site-data";
import { useSite } from "@/lib/site-store";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Job Openings — SAGEVIK LLP" },
      {
        name: "description",
        content: "Explore job openings with SAGEVIK LLP in Pune or submit your resume for future opportunities.",
      },
      { property: "og:title", content: "Careers — SAGEVIK LLP" },
      { property: "og:description", content: "Current openings, why work with us, and a simple resume submission form." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

const TYPES = ["All", "Full-time", "Part-time", "Contract", "Internship"] as const;

function CareersPage() {
  const { data } = useSite();
  const { careers, perks, jobs } = data;
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [applyFor, setApplyFor] = useState<Job | null>(null);

  const openJobs = useMemo(
    () =>
      jobs
        .filter((j) => j.status === "Open")
        .filter((j) => type === "All" || j.type === type)
        .filter((j) => `${j.title} ${j.department} ${j.location}`.toLowerCase().includes(q.trim().toLowerCase())),
    [jobs, type, q],
  );

  return (
    <>
      <PageHero page="careers" image="careers-team" crumb="Careers" />

      {/* Why work with us */}
      <section className="section-pad">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Career Opportunities" title="Why work with us" text={careers.intro} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {perks.map((p, i) => (
                <Reveal key={p.id} delay={i * 70}>
                  <div className="card-premium card-hover h-full p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Icon name={p.icon} size={20} />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold text-navy">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] border border-gold/40" />
            <SmartImage src="careers-candidate" alt="Job seeker reviewing her resume" className="img-zoom relative aspect-[4/5] rounded-[2rem] shadow-lift" />
          </Reveal>
        </div>
      </section>

      {/* Openings */}
      <section className="section-pad bg-ivory" id="openings">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading eyebrow="Job Openings" title="Current opportunities" />
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Icon name="search" size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search roles or location" className="field-input pl-10 sm:w-64" aria-label="Search jobs" />
                </div>
                <div className="flex flex-wrap gap-1 rounded-full border border-border bg-card p-1">
                  {TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${type === t ? "bg-navy text-navy-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 space-y-4">
            {openJobs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
                <Icon name="briefcase" size={28} className="mx-auto text-muted-foreground" />
                <p className="mt-4 font-semibold text-foreground">No openings match your filters.</p>
                <p className="mt-1 text-sm text-muted-foreground">You can still share your resume for future opportunities below.</p>
              </div>
            ) : (
              openJobs.map((j, i) => {
                const isOpen = expanded === j.id;
                return (
                  <Reveal key={j.id} delay={i * 60}>
                    <article className={`card-premium overflow-hidden ${isOpen ? "border-gold/50 shadow-lift" : ""}`}>
                      <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:p-8">
                        <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-gradient text-gold md:flex">
                          <Icon name="briefcase" size={22} />
                        </span>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-secondary px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-primary">{j.type}</span>
                            <span className="text-xs text-muted-foreground">{j.department}</span>
                          </div>
                          <h3 className="mt-2 font-display text-2xl font-semibold text-navy">{j.title}</h3>
                          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Icon name="map-pin" size={15} /> {j.location}</span>
                            <span className="flex items-center gap-1.5"><Icon name="clock" size={15} /> {j.experience}</span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button className="btn btn-sm btn-outline" onClick={() => setExpanded(isOpen ? null : j.id)} aria-expanded={isOpen}>
                            {isOpen ? "Hide details" : "View details"}
                            <Icon name="chevron-down" size={15} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                          <button className="btn btn-sm btn-primary" onClick={() => setApplyFor(j)}>
                            Apply Now
                          </button>
                        </div>
                      </div>
                      <div className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden">
                          <div className="grid gap-8 border-t border-border bg-muted/40 p-6 md:grid-cols-3 md:p-8">
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">About the role</h4>
                              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{j.summary}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">Responsibilities</h4>
                              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                                {j.responsibilities.map((r) => (
                                  <li key={r} className="flex gap-2"><Icon name="check" size={15} className="mt-0.5 shrink-0 text-success" />{r}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gold-deep">Requirements</h4>
                              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                                {j.requirements.map((r) => (
                                  <li key={r} className="flex gap-2"><Icon name="check" size={15} className="mt-0.5 shrink-0 text-success" />{r}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })
            )}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Listings shown are sample openings for this demo website.</p>
        </div>
      </section>

      {/* General application */}
      <section id="apply" className="section-pad scroll-mt-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading eyebrow="Submit Your Resume" title="Share your profile with us." text={careers.applyNote} />
            <ul className="mt-8 space-y-4">
              {["Fill in your basic details", "Attach your resume (PDF, DOC or DOCX, up to 5 MB)", "We review profiles against relevant requirements"].map((t, i) => (
                <li key={t} className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg font-semibold text-gold">{i + 1}</span>
                  <span className="text-sm text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-premium p-6 md:p-10">
              <ApplicationForm position="" />
            </div>
          </Reveal>
        </div>
      </section>

      <Modal open={!!applyFor} onClose={() => setApplyFor(null)} title={applyFor ? `Apply — ${applyFor.title}` : "Apply"} size="lg">
        {applyFor ? <ApplicationForm key={applyFor.id} position={applyFor.title} onDone={() => setApplyFor(null)} /> : null}
      </Modal>
    </>
  );
}

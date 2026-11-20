import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Icon } from "@/components/site/Icon";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/primitives";
import { useSite } from "@/lib/site-store";
import { telHref, whatsappHref } from "@/lib/validation";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — SAGEVIK LLP, Dhanori, Pune" },
      {
        name: "description",
        content: "Send a business or career enquiry to SAGEVIK LLP. Registered office: Mantra Montana, Dhanori, Pune 411015.",
      },
      { property: "og:title", content: "Contact SAGEVIK LLP" },
      { property: "og:description", content: "Enquiry form, resume upload and registered office location for SAGEVIK LLP, Pune." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data } = useSite();
  const { company, settings } = data;
  const tel = company.phone ? telHref(company.phone) : null;
  const wa = company.whatsapp ? whatsappHref(company.whatsapp, settings.whatsappMessage) : null;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent("Mantra Montana, Dhanori, Pune, Maharashtra 411015")}&output=embed`;

  return (
    <>
      <PageHero page="contact" image="contact-reception" crumb="Contact Us" />

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-[1.5rem] bg-navy-gradient p-8">
                <div className="pattern-grid absolute inset-0 opacity-50" />
                <div className="relative">
                  <span className="eyebrow eyebrow-light">Registered Office</span>
                  <p className="mt-5 flex gap-3 text-lg leading-relaxed text-navy-foreground">
                    <Icon name="map-pin" size={22} className="mt-1 shrink-0 text-gold" />
                    {company.address}
                  </p>
                  {tel || wa || company.email ? (
                    <div className="mt-8 space-y-3 border-t border-navy-foreground/10 pt-6">
                      {tel ? (
                        <a href={tel} className="flex items-center gap-3 text-navy-foreground transition hover:text-gold">
                          <Icon name="phone" size={18} className="text-gold" /> {company.phone}
                        </a>
                      ) : null}
                      {wa ? (
                        <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-navy-foreground transition hover:text-gold">
                          <Icon name="whatsapp" size={18} className="text-gold" /> WhatsApp {company.whatsapp}
                        </a>
                      ) : null}
                      {company.email ? (
                        <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-navy-foreground transition hover:text-gold">
                          <Icon name="mail" size={18} className="text-gold" /> {company.email}
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                  {company.businessHours ? (
                    <p className="mt-6 flex items-center gap-3 text-sm text-navy-muted">
                      <Icon name="clock" size={16} className="text-gold" /> {company.businessHours}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card-premium p-8">
                <h3 className="font-display text-xl font-semibold text-navy">Company details</h3>
                <dl className="mt-5 space-y-3 text-sm">
                  {[
                    ["Legal Name", company.name],
                    ["Structure", company.legalStructure],
                    ["LLPIN", company.llpin],
                    ["Registered With", company.registrationAuthority],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-right font-semibold text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="rounded-[1.5rem] border border-gold/40 bg-gold-soft p-8">
                <Icon name="briefcase" className="text-gold-deep" />
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">Business enquiries</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  Hiring for your team? Choose “Business / Hiring Enquiry” in the form and tell us about the roles you need to fill.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <div className="card-premium p-6 md:p-10">
              <span className="eyebrow">Enquiry Form</span>
              <h2 className="display-md mt-3 text-navy">How can we help?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Fill in the form and attach a resume or document if relevant.</p>
              <div className="mt-8">
                <EnquiryForm source="Contact Page" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
              <div className="flex flex-col justify-between gap-4 border-b border-border px-8 py-6 md:flex-row md:items-center">
                <div>
                  <span className="eyebrow">Location</span>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-navy">Mantra Montana, Dhanori, Pune</h2>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  Open in Google Maps <Icon name="external" size={15} />
                </a>
              </div>
              <div className="relative aspect-[16/10] w-full bg-secondary md:aspect-[21/8]">
                <iframe
                  title="SAGEVIK LLP registered office location"
                  src={mapSrc}
                  className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

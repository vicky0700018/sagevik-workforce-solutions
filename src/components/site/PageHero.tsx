import { Link } from "@tanstack/react-router";
import { useBanner } from "@/lib/site-store";
import { Icon } from "./Icon";
import { SmartImage } from "./primitives";

export function PageHero({ page, image, crumb }: { page: string; image?: string; crumb: string }) {
  const banner = useBanner(page);
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      {image ? (
        <>
          <SmartImage src={image} alt="" eager className="absolute inset-0 -z-20 h-full w-full" imgClassName="animate-slow-zoom" />
          <div className="bg-banner-overlay absolute inset-0 -z-10" />
        </>
      ) : (
        <div className="bg-navy-gradient absolute inset-0 -z-20">
          <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full border border-gold/15" />
          <div className="absolute -right-10 top-10 h-72 w-72 rounded-full border border-gold/25" />
          <div className="absolute right-40 bottom-10 h-3 w-3 rounded-full bg-gold/70" />
        </div>
      )}
      <div className="pattern-grid absolute inset-0 -z-10 opacity-40" />
      <div className="container-page py-20 md:py-28">
        <nav aria-label="Breadcrumb" className="animate-fade-up flex items-center gap-2 text-xs font-semibold text-navy-muted">
          <Link to="/" className="transition hover:text-gold">
            Home
          </Link>
          <Icon name="chevron-right" size={14} />
          <span className="text-navy-foreground">{crumb}</span>
        </nav>
        <span className="eyebrow eyebrow-light animate-fade-up mt-8" style={{ animationDelay: "80ms" }}>
          {banner.eyebrow}
        </span>
        <h1 className="display-xl animate-fade-up mt-5 max-w-4xl text-navy-foreground" style={{ animationDelay: "140ms" }}>
          {banner.title}
        </h1>
        <p className="animate-fade-up mt-6 max-w-2xl text-base leading-relaxed text-navy-muted md:text-lg" style={{ animationDelay: "220ms" }}>
          {banner.subtitle}
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold-gradient opacity-60" />
    </section>
  );
}

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { label: string; to: "/contact" | "/careers" | "/services"; hash?: string };
  secondary?: { label: string; to: "/contact" | "/careers" | "/services"; hash?: string };
}) {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-gradient px-8 py-14 shadow-navy md:px-16 md:py-20">
          <div className="pattern-grid absolute inset-0 opacity-50" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold/20" />
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-gold/30" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="eyebrow eyebrow-light">Get in touch</span>
              <h2 className="display-lg mt-4 text-navy-foreground">{title}</h2>
              <p className="mt-4 text-navy-muted">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={primary.to} {...(primary.hash ? { hash: primary.hash } : {})} className="btn btn-gold">
                {primary.label} <Icon name="arrow-right" size={16} />
              </Link>
              {secondary ? (
                <Link to={secondary.to} {...(secondary.hash ? { hash: secondary.hash } : {})} className="btn btn-outline-light">
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

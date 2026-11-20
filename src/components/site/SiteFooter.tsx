import { Link } from "@tanstack/react-router";
import { useSite } from "@/lib/site-store";
import { telHref } from "@/lib/validation";
import { Icon } from "./Icon";
import { NAV_ITEMS } from "./SiteHeader";
import { Logo } from "./primitives";

function socialIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes("linkedin")) return "linkedin";
  if (p.includes("insta")) return "instagram";
  if (p.includes("face")) return "facebook";
  if (p.includes("you")) return "youtube";
  if (p.includes("twitter") || p === "x") return "twitter";
  return "globe";
}

export function SiteFooter() {
  const { data } = useSite();
  const { company, footer, services, socials } = data;
  const activeSocials = socials.filter((s) => s.enabled && s.url.trim());
  const phoneHref = company.phone ? telHref(company.phone) : null;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-gradient">
      <div className="pattern-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-page relative grid gap-12 pb-14 pt-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-navy-muted">{footer.about}</p>
          {activeSocials.length ? (
            <div className="mt-6 flex gap-3">
              {activeSocials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-foreground/15 text-navy-foreground transition hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <Icon name={socialIcon(s.platform)} size={17} />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Company</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_ITEMS.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-navy-muted transition hover:text-navy-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Services</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.id}>
                <Link to="/services" hash={s.id} className="text-navy-muted transition hover:text-navy-foreground">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Registered Office</h4>
          {footer.showAddress ? (
            <p className="mt-5 flex gap-3 text-sm leading-relaxed text-navy-muted">
              <Icon name="map-pin" size={18} className="mt-0.5 shrink-0 text-gold" />
              {company.address}
            </p>
          ) : null}
          <ul className="mt-4 space-y-3 text-sm">
            {phoneHref ? (
              <li>
                <a href={phoneHref} className="flex items-center gap-3 text-navy-muted transition hover:text-navy-foreground">
                  <Icon name="phone" size={16} className="text-gold" /> {company.phone}
                </a>
              </li>
            ) : null}
            {company.email ? (
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-navy-muted transition hover:text-navy-foreground">
                  <Icon name="mail" size={16} className="text-gold" /> {company.email}
                </a>
              </li>
            ) : null}
            <li className="flex items-center gap-3 text-navy-muted">
              <Icon name="award" size={16} className="text-gold" /> LLPIN: {company.llpin}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-navy-foreground/10">
        <div className="container-page flex flex-col gap-3 pb-28 pt-6 text-xs text-navy-muted sm:pb-6 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {footer.copyright}
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>
              Designed and development by <span className="font-semibold text-gold">SOSynch Ai Tech</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSite } from "@/lib/site-store";
import { Icon } from "./Icon";
import { Logo } from "./primitives";

export const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/approach", label: "Our Approach" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function SiteHeader() {
  const { data } = useSite();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {data.settings.showTopBar ? (
        <div className="bg-navy-deep text-navy-muted">
          <div className="container-page flex h-10 items-center justify-between gap-4 text-[0.72rem] font-medium tracking-wide">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {data.settings.announcement || `${data.company.legalStructure} · LLPIN ${data.company.llpin} · ${data.company.registrationAuthority}`}
            </span>
            <span className="hidden items-center gap-2 md:flex">
              <Icon name="map-pin" size={13} className="text-gold" /> Dhanori, Pune, Maharashtra
            </span>
          </div>
        </div>
      ) : null}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled ? "border-border bg-background/90 shadow-soft backdrop-blur-xl" : "border-transparent bg-background"
        }`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Link to="/" aria-label="SAGEVIK LLP home" className="shrink-0">
            <Logo />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link" activeOptions={{ exact: item.to === "/" }}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/careers" hash="apply" className="btn btn-gold btn-sm hidden sm:inline-flex">
              <Icon name="upload" size={16} /> Submit Your Resume
            </Link>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-navy transition hover:border-primary lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? "x" : "menu"} />
            </button>
          </div>
        </div>
        <div
          className={`overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-500 lg:hidden ${
            open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav aria-label="Mobile" className="container-page flex flex-col py-4">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="group flex items-center justify-between border-b border-border/70 py-3.5 font-display text-xl font-semibold text-navy last:border-0 data-[status=active]:text-primary"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {item.label}
                <Icon name="arrow-right" size={18} className="text-gold-deep transition group-hover:translate-x-1" />
              </Link>
            ))}
            <Link to="/careers" hash="apply" className="btn btn-gold mt-4">
              <Icon name="upload" size={16} /> Submit Your Resume
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

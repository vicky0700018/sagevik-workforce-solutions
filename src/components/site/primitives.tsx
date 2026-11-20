import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { resolveImage } from "@/lib/images";
import { useSite } from "@/lib/site-store";
import { Icon } from "./Icon";

/** Fades content up when it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Image with a branded fallback when the source fails to load. */
export function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
}: {
  src: string | undefined;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const resolved = resolveImage(src);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [resolved]);
  return (
    <div className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden bg-navy-gradient ${className}`}>
      {resolved && !failed ? (
        <img
          src={resolved}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div className="pattern-grid absolute inset-0 flex items-center justify-center" role="img" aria-label={alt}>
          <span className="font-display text-4xl font-semibold text-gold/80">S</span>
        </div>
      )}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</span>
      <h2 className={`display-lg mt-4 ${light ? "text-navy-foreground" : "text-navy"}`}>{title}</h2>
      {text ? (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-navy-muted" : "text-muted-foreground"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-navy-gradient shadow-navy">
        <span className="font-display text-2xl font-semibold leading-none text-gold">S</span>
        <span className="absolute inset-1 rounded-md border border-gold/30" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.35rem] font-semibold tracking-[0.08em] ${light ? "text-navy-foreground" : "text-navy"}`}>
          SAGEVIK
        </span>
        <span className={`mt-1 text-[0.6rem] font-bold uppercase tracking-[0.42em] ${light ? "text-gold" : "text-gold-deep"}`}>
          LLP
        </span>
      </span>
    </span>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  const width = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-5xl" }[size];
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <button aria-label="Close dialog" className="animate-fade-in absolute inset-0 bg-navy-deep/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`animate-fade-up relative flex max-h-[92vh] w-full ${width} flex-col overflow-hidden rounded-t-3xl bg-card shadow-lift sm:rounded-3xl`}>
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <h3 className="font-display text-2xl font-semibold text-navy">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <Icon name="x" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6">{children}</div>
        {footer ? <div className="flex flex-wrap justify-end gap-3 border-t border-border bg-muted/50 px-6 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      size="sm"
      title={title}
      footer={
        <>
          <button className="btn btn-sm btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-sm btn-danger" onClick={onConfirm}>
            <Icon name="trash" size={16} /> {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <Icon name="alert" />
        </span>
        <div className="text-sm leading-relaxed text-muted-foreground">{message}</div>
      </div>
    </Modal>
  );
}

export function Toaster() {
  const { toasts, dismissToast } = useSite();
  return (
    <div className="pointer-events-none fixed left-1/2 top-5 z-[90] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="animate-fade-up pointer-events-auto flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift"
        >
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              t.tone === "error" ? "bg-destructive/10 text-destructive" : t.tone === "info" ? "bg-secondary text-primary" : "bg-success-soft text-success"
            }`}
          >
            <Icon name={t.tone === "error" ? "alert" : t.tone === "info" ? "info" : "check"} size={16} />
          </span>
          <p className="flex-1 text-sm leading-snug text-foreground">{t.message}</p>
          <button aria-label="Dismiss" onClick={() => dismissToast(t.id)} className="text-muted-foreground hover:text-foreground">
            <Icon name="x" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export function Spinner({ size = 18 }: { size?: number }) {
  return <Icon name="loader" size={size} className="animate-spin-slow" />;
}

import type { ReactNode } from "react";
import { Icon, ICON_NAMES } from "@/components/site/Icon";
import { SmartImage } from "@/components/site/primitives";
import { IMAGE_LIBRARY, IMAGE_KEYS } from "@/lib/images";
import { formatBytes } from "@/lib/validation";

export type FieldType =
  | "text"
  | "email"
  | "url"
  | "textarea"
  | "select"
  | "list"
  | "image"
  | "icon"
  | "number"
  | "boolean"
  | "date"
  | "readonly-date"
  | "file-meta";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  options?: readonly string[];
  required?: boolean;
  placeholder?: string;
  help?: string;
  full?: boolean;
  hideInForm?: boolean;
};

export type FormValues = Record<string, unknown>;

export function formatDate(v: unknown): string {
  if (typeof v !== "string" || !v) return "—";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  const opts: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
  if (v.includes("T")) {
    opts.hour = "2-digit";
    opts.minute = "2-digit";
  }
  return d.toLocaleString("en-IN", opts);
}

export function FieldInput({
  field,
  value,
  onChange,
  error,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
  error?: string | undefined;
}) {
  const common = { className: "field-input", "aria-invalid": !!error, placeholder: field.placeholder };
  let control: ReactNode;
  switch (field.type) {
    case "textarea":
      control = <textarea {...common} className="field-input min-h-28" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "list":
      control = (
        <textarea
          {...common}
          className="field-input min-h-28"
          value={Array.isArray(value) ? (value as string[]).join("\n") : ""}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          placeholder={field.placeholder ?? "One item per line"}
        />
      );
      break;
    case "select":
      control = (
        <select {...common} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
      break;
    case "number":
      control = <input {...common} type="number" value={Number(value ?? 0)} onChange={(e) => onChange(Number(e.target.value))} />;
      break;
    case "boolean":
      control = (
        <button
          type="button"
          role="switch"
          aria-checked={!!value}
          onClick={() => onChange(!value)}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${value ? "bg-primary" : "bg-input"}`}
        >
          <span className={`inline-block h-5 w-5 rounded-full bg-card shadow transition-transform ${value ? "translate-x-6" : "translate-x-1"}`} />
        </button>
      );
      break;
    case "date":
      control = <input {...common} type="date" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "icon":
      control = (
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
            <Icon name={String(value ?? "")} />
          </span>
          <select {...common} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
            {ICON_NAMES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    case "image": {
      const v = String(value ?? "");
      const isLibrary = IMAGE_KEYS.includes(v);
      control = (
        <div className="flex flex-col gap-3 sm:flex-row">
          <SmartImage src={v} alt="Selected" className="h-24 w-36 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <select className="field-input" value={isLibrary ? v : "__url"} onChange={(e) => onChange(e.target.value === "__url" ? "" : e.target.value)}>
              {IMAGE_KEYS.map((k) => (
                <option key={k} value={k}>
                  {IMAGE_LIBRARY[k]?.label}
                </option>
              ))}
              <option value="__url">Custom image URL…</option>
            </select>
            {!isLibrary ? (
              <input className="field-input" placeholder="https://…" value={v} onChange={(e) => onChange(e.target.value)} />
            ) : null}
          </div>
        </div>
      );
      break;
    }
    case "readonly-date":
      control = <p className="rounded-lg bg-muted px-3 py-2.5 text-sm">{formatDate(value)}</p>;
      break;
    case "file-meta":
      control = <p className="rounded-lg bg-muted px-3 py-2.5 text-sm">{String(value || "No file attached")}</p>;
      break;
    default:
      control = (
        <input
          {...common}
          type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
  return (
    <div className={field.full || field.type === "textarea" || field.type === "list" || field.type === "image" ? "sm:col-span-2" : ""}>
      <span className="field-label">
        {field.label} {field.required ? <span className="text-destructive">*</span> : null}
      </span>
      {control}
      {field.help ? <p className="mt-1.5 text-xs text-muted-foreground">{field.help}</p> : null}
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}

export function FieldValue({ field, value, record }: { field: FieldDef; value: unknown; record?: FormValues }) {
  switch (field.type) {
    case "list":
      return Array.isArray(value) && value.length ? (
        <ul className="space-y-1.5">
          {(value as string[]).map((v) => (
            <li key={v} className="flex gap-2"><Icon name="check" size={15} className="mt-0.5 shrink-0 text-success" /> {v}</li>
          ))}
        </ul>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    case "boolean":
      return value ? <Badge tone="success">Yes</Badge> : <Badge tone="muted">No</Badge>;
    case "image":
      return <SmartImage src={String(value ?? "")} alt={field.label} className="aspect-video w-full max-w-sm rounded-xl" />;
    case "icon":
      return (
        <span className="inline-flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary"><Icon name={String(value)} size={18} /></span>
          {String(value)}
        </span>
      );
    case "readonly-date":
    case "date":
      return <>{formatDate(value)}</>;
    case "file-meta": {
      const name = String(value ?? "");
      if (!name) return <span className="text-muted-foreground">No file attached</span>;
      const size = Number(record?.["fileSize"] ?? 0);
      const type = String(record?.["fileType"] ?? "");
      return (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-primary"><Icon name="file-text" /></span>
          <div className="min-w-0">
            <p className="truncate font-semibold">{name}</p>
            <p className="text-xs text-muted-foreground">
              {size ? formatBytes(size) : "Size unknown"} {type ? `· ${type.split("/").pop()}` : ""} · Metadata only (file not stored)
            </p>
          </div>
        </div>
      );
    }
    default: {
      const s = String(value ?? "");
      return s ? <span className="whitespace-pre-line">{s}</span> : <span className="text-muted-foreground">—</span>;
    }
  }
}

const TONES = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-secondary text-primary",
  muted: "bg-muted text-muted-foreground",
  danger: "bg-destructive/10 text-destructive",
  gold: "bg-gold-soft text-gold-deep",
} as const;

export function Badge({ tone = "info", children }: { tone?: keyof typeof TONES; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.7rem] font-bold ${TONES[tone]}`}>{children}</span>;
}

export function statusTone(status: string): keyof typeof TONES {
  switch (status) {
    case "New":
    case "Received":
      return "info";
    case "In Progress":
    case "Under Review":
      return "warning";
    case "Responded":
    case "Shortlisted":
    case "Open":
      return "success";
    case "Closed":
    case "Not Selected":
      return "muted";
    default:
      return "info";
  }
}

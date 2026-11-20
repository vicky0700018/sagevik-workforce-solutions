import { useState, type FormEvent, type ReactNode } from "react";
import { ENQUIRY_TYPES, type Enquiry } from "@/lib/site-data";
import { newId, useSite } from "@/lib/site-store";
import { validateEnquiry, type EnquiryInput } from "@/lib/validation";
import { Icon } from "./Icon";
import { ResumeUpload } from "./ResumeUpload";
import { Spinner } from "./primitives";

const EMPTY: EnquiryInput = { name: "", email: "", mobile: "", company: "", subject: "", message: "" };

export function EnquiryForm({
  source = "Contact Page",
  compact = false,
  defaultSubject = "",
  onDone,
}: {
  source?: Enquiry["source"];
  compact?: boolean;
  defaultSubject?: string;
  onDone?: () => void;
}) {
  const { addItem, notify } = useSite();
  const [values, setValues] = useState<EnquiryInput>({ ...EMPTY, subject: defaultSubject });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryInput, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  function set<K extends keyof EnquiryInput>(key: K, v: string) {
    setValues((s) => ({ ...s, [key]: v }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      notify("Please correct the highlighted fields.", "error");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const record: Enquiry = {
      id: newId("enq"),
      name: values.name.trim(),
      email: values.email.trim(),
      mobile: values.mobile.trim(),
      company: values.company.trim(),
      subject: values.subject,
      message: values.message.trim(),
      fileName: file?.name ?? "",
      fileSize: file?.size ?? 0,
      fileType: file?.type ?? "",
      source,
      status: "New",
      createdAt: new Date().toISOString(),
      sample: false,
    };
    addItem("enquiries", record);
    setSubmitting(false);
    setDone(values.name.trim().split(" ")[0] ?? "");
    setValues({ ...EMPTY, subject: defaultSubject });
    setFile(null);
    notify("Demo enquiry recorded in this browser only.", "info");
  }

  if (done !== null) {
    return (
      <div className="animate-fade-up rounded-3xl border border-border bg-card p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
          <Icon name="check" size={30} />
        </span>
        <h3 className="display-md mt-5 text-navy">Thank you{done ? `, ${done}` : ""}.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          This is a demo website, so your enquiry has <strong className="text-foreground">not been sent</strong> to SAGEVIK LLP.
          It was saved only in this browser so it can be seen in the demo admin panel. Any attached file was not uploaded.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn btn-sm btn-outline" onClick={() => setDone(null)}>
            Send another enquiry
          </button>
          {onDone ? (
            <button className="btn btn-sm btn-primary" onClick={onDone}>
              Close
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  const grid = compact ? "grid gap-4" : "grid gap-5 sm:grid-cols-2";

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className={grid}>
        <Field label="Full Name" required error={errors.name}>
          <input className="field-input" aria-invalid={!!errors.name} value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" autoComplete="name" />
        </Field>
        <Field label="Email Address" required error={errors.email}>
          <input className="field-input" type="email" aria-invalid={!!errors.email} value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" autoComplete="email" />
        </Field>
        <Field label="Mobile Number" required error={errors.mobile}>
          <input className="field-input" type="tel" inputMode="tel" aria-invalid={!!errors.mobile} value={values.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="10-digit mobile number" autoComplete="tel" />
        </Field>
        <Field label="Company Name" optional>
          <input className="field-input" value={values.company} onChange={(e) => set("company", e.target.value)} placeholder="Organisation (if applicable)" autoComplete="organization" />
        </Field>
        <div className={compact ? "" : "sm:col-span-2"}>
          <Field label="Subject / Enquiry Type" required error={errors.subject}>
            <div className="relative">
              <select className="field-input appearance-none pr-10" aria-invalid={!!errors.subject} value={values.subject} onChange={(e) => set("subject", e.target.value)}>
                <option value="">Select an enquiry type</option>
                {ENQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <Icon name="chevron-down" size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </Field>
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <Field label="Message" required error={errors.message}>
            <textarea className="field-input min-h-32 resize-y" aria-invalid={!!errors.message} value={values.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us briefly about your requirement or enquiry" rows={compact ? 3 : 5} />
          </Field>
        </div>
      </div>
      <ResumeUpload file={file} onChange={setFile} />
      <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          <span className="text-destructive">*</span> Required fields. Demo form — nothing is sent or stored on a server.
        </p>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner /> Submitting…
            </>
          ) : (
            <>
              Submit Enquiry <Icon name="send" size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">
        {label} {required ? <span className="text-destructive">*</span> : null}
        {optional ? <span className="font-normal text-muted-foreground">(optional)</span> : null}
      </span>
      {children}
      {error ? <span className="field-error block" role="alert">{error}</span> : null}
    </label>
  );
}

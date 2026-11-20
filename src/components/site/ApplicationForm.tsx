import { useState, type FormEvent } from "react";
import type { Application } from "@/lib/site-data";
import { newId, useSite } from "@/lib/site-store";
import { isValidEmail, isValidMobile } from "@/lib/validation";
import { Field } from "./EnquiryForm";
import { Icon } from "./Icon";
import { ResumeUpload } from "./ResumeUpload";
import { Spinner } from "./primitives";

type Values = { name: string; email: string; mobile: string; position: string; experience: string; coverNote: string };

export function ApplicationForm({ position, onDone }: { position: string; onDone?: () => void }) {
  const { addItem, notify, data } = useSite();
  const openJobs = data.jobs.filter((j) => j.status === "Open");
  const [v, setV] = useState<Values>({ name: "", email: "", mobile: "", position, experience: "", coverNote: "" });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Values | "file", string | undefined>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function set<K extends keyof Values>(k: K, val: string) {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (v.name.trim().length < 2) errs.name = "Please enter your full name.";
    if (!isValidEmail(v.email)) errs.email = "Please enter a valid email address.";
    if (!isValidMobile(v.mobile)) errs.mobile = "Please enter a valid 10-digit mobile number.";
    if (!v.experience.trim()) errs.experience = "Please share your experience (e.g. Fresher, 2 years).";
    if (!file) errs.file = "Please attach your resume (PDF, DOC or DOCX).";
    setErrors(errs);
    if (Object.keys(errs).length) {
      notify("Please correct the highlighted fields.", "error");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const record: Application = {
      id: newId("app"),
      name: v.name.trim(),
      email: v.email.trim(),
      mobile: v.mobile.trim(),
      position: v.position || "General Application",
      experience: v.experience.trim(),
      coverNote: v.coverNote.trim(),
      fileName: file?.name ?? "",
      fileSize: file?.size ?? 0,
      fileType: file?.type ?? "",
      status: "Received",
      createdAt: new Date().toISOString(),
      sample: false,
    };
    addItem("applications", record);
    setSubmitting(false);
    setDone(true);
    notify("Demo application recorded in this browser only.", "info");
  }

  if (done) {
    return (
      <div className="animate-fade-up py-4 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
          <Icon name="check" size={30} />
        </span>
        <h3 className="display-md mt-5 text-navy">Application recorded (demo)</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your resume was <strong className="text-foreground">not uploaded or sent</strong> anywhere. This demo only saved the
          details and file name in this browser so they appear in the admin panel.
        </p>
        {onDone ? (
          <button className="btn btn-sm btn-primary mt-6" onClick={onDone}>
            Close
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" required error={errors.name}>
          <input className="field-input" aria-invalid={!!errors.name} value={v.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
        </Field>
        <Field label="Email Address" required error={errors.email}>
          <input className="field-input" type="email" aria-invalid={!!errors.email} value={v.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
        </Field>
        <Field label="Mobile Number" required error={errors.mobile}>
          <input className="field-input" type="tel" aria-invalid={!!errors.mobile} value={v.mobile} onChange={(e) => set("mobile", e.target.value)} autoComplete="tel" />
        </Field>
        <Field label="Experience" required error={errors.experience}>
          <input className="field-input" aria-invalid={!!errors.experience} value={v.experience} onChange={(e) => set("experience", e.target.value)} placeholder="e.g. Fresher, 3 years" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Position">
            <select className="field-input" value={v.position} onChange={(e) => set("position", e.target.value)}>
              <option value="">General Application</option>
              {openJobs.map((j) => (
                <option key={j.id} value={j.title}>
                  {j.title}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Short Note" optional>
            <textarea className="field-input min-h-24" value={v.coverNote} onChange={(e) => set("coverNote", e.target.value)} placeholder="Anything you would like us to know" />
          </Field>
        </div>
      </div>
      <ResumeUpload
        file={file}
        onChange={(f) => {
          setFile(f);
          if (f) setErrors((e) => ({ ...e, file: undefined }));
        }}
        label="Resume"
        optional={false}
        externalError={errors.file}
      />
      <div className="flex justify-end border-t border-border pt-5">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner /> Submitting…
            </>
          ) : (
            <>
              Submit Application <Icon name="send" size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

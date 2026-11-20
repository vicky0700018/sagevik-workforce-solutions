import { useEffect, useState } from "react";
import { Icon } from "@/components/site/Icon";
import { useSite } from "@/lib/site-store";
import { FieldInput, type FieldDef, type FormValues } from "./fields";

export function FormModule<T extends object>({
  title,
  value,
  fields,
  onSave,
  defaults,
}: {
  title: string;
  value: T;
  fields: FieldDef[];
  onSave: (v: T) => void;
  defaults: T;
}) {
  const { notify } = useSite();
  const [draft, setDraft] = useState<FormValues>({ ...(value as FormValues) });
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => setDraft({ ...(value as FormValues) }), [value]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(value);

  function save() {
    const errs: Record<string, string> = {};
    const out: FormValues = { ...draft };
    for (const f of fields) {
      if (f.type === "list" && Array.isArray(out[f.key])) out[f.key] = (out[f.key] as string[]).map((s) => s.trim()).filter(Boolean);
      if (f.required && typeof out[f.key] === "string" && !(out[f.key] as string).trim()) errs[f.key] = `${f.label} is required.`;
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      notify("Please fill in the required fields.", "error");
      return;
    }
    onSave(out as T);
    notify(`${title} saved. Changes are live on the website preview.`);
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
        <h2 className="font-display text-xl font-semibold text-navy">{title}</h2>
        {dirty ? <span className="text-xs font-semibold text-warning">Unsaved changes</span> : <span className="text-xs text-muted-foreground">All changes saved</span>}
      </div>
      <div className="grid gap-5 p-6 sm:grid-cols-2">
        {fields.map((f) => (
          <FieldInput key={f.key} field={f} value={draft[f.key]} error={errors[f.key]} onChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))} />
        ))}
      </div>
      <div className="flex flex-wrap justify-end gap-3 border-t border-border bg-muted/40 px-6 py-4">
        <button className="btn btn-sm btn-outline" onClick={() => setDraft({ ...(defaults as FormValues) })}>
          <Icon name="refresh" size={15} /> Restore defaults
        </button>
        <button className="btn btn-sm btn-outline" disabled={!dirty} onClick={() => setDraft({ ...(value as FormValues) })}>
          Discard
        </button>
        <button className="btn btn-sm btn-primary" disabled={!dirty} onClick={save}>
          <Icon name="check" size={15} /> Save changes
        </button>
      </div>
    </div>
  );
}

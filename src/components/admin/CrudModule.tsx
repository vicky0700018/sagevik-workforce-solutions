import { useMemo, useState, type ReactNode } from "react";
import { Icon } from "@/components/site/Icon";
import { ConfirmDialog, Modal } from "@/components/site/primitives";
import { useSite } from "@/lib/site-store";
import { FieldInput, FieldValue, type FieldDef, type FormValues } from "./fields";

export type Column<T> = { label: string; render: (row: T) => ReactNode; className?: string };

type Props<T extends { id: string }> = {
  title: string;
  singular: string;
  items: T[];
  fields: FieldDef[];
  columns: Column<T>[];
  searchKeys: (keyof T & string)[];
  filter?: { key: keyof T & string; label: string; options: readonly string[] };
  makeNew: () => T;
  onCreate: (item: T) => void;
  onUpdate: (id: string, patch: Partial<T>) => void;
  onDelete: (id: string) => void;
  rowTitle: (row: T) => string;
  inlineStatus?: { key: keyof T & string; options: readonly string[] };
  addLabel?: string;
};

export function ActionButton({
  label,
  icon,
  onClick,
  tone = "default",
}: {
  label: string;
  icon: string;
  onClick: () => void;
  tone?: "default" | "primary" | "danger";
}) {
  const tones = {
    default: "text-muted-foreground hover:border-primary hover:bg-secondary hover:text-primary",
    primary: "text-primary hover:border-primary hover:bg-secondary",
    danger: "text-destructive hover:border-destructive hover:bg-destructive/10",
  };
  return (
    <button type="button" onClick={onClick} aria-label={label} className={`group relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition ${tones[tone]}`}>
      <Icon name={icon} size={16} />
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-navy px-2 py-1 text-[0.68rem] font-semibold text-navy-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}

export function CrudModule<T extends { id: string }>(props: Props<T>) {
  const { title, singular, items, fields, columns, searchKeys, filter, makeNew, onCreate, onUpdate, onDelete, rowTitle, inlineStatus, addLabel } = props;
  const { notify } = useSite();
  const [q, setQ] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [viewing, setViewing] = useState<T | null>(null);
  const [editing, setEditing] = useState<{ mode: "add" | "edit"; values: FormValues; id?: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleting, setDeleting] = useState<T | null>(null);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((it) => {
      if (filter && filterValue !== "All" && String(it[filter.key]) !== filterValue) return false;
      if (!term) return true;
      return searchKeys.some((k) => String(it[k] ?? "").toLowerCase().includes(term));
    });
  }, [items, q, filter, filterValue, searchKeys]);

  function openAdd() {
    setErrors({});
    setEditing({ mode: "add", values: { ...(makeNew() as unknown as FormValues) } });
  }
  function openEdit(row: T) {
    setErrors({});
    setEditing({ mode: "edit", values: { ...(row as unknown as FormValues) }, id: row.id });
  }

  function save() {
    if (!editing) return;
    const errs: Record<string, string> = {};
    const values: FormValues = { ...editing.values };
    for (const f of fields) {
      if (f.type === "list" && Array.isArray(values[f.key])) {
        values[f.key] = (values[f.key] as string[]).map((s) => s.trim()).filter(Boolean);
      }
      if (f.required) {
        const v = values[f.key];
        if (v === undefined || v === null || (typeof v === "string" && !v.trim()) || (Array.isArray(v) && v.length === 0)) {
          errs[f.key] = `${f.label} is required.`;
        }
      }
      if (f.type === "email" && typeof values[f.key] === "string" && values[f.key] && !/^\S+@\S+\.\S+$/.test(String(values[f.key]))) {
        errs[f.key] = "Enter a valid email address.";
      }
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (editing.mode === "add") {
      onCreate(values as unknown as T);
      notify(`${singular} added.`);
    } else if (editing.id) {
      onUpdate(editing.id, values as unknown as Partial<T>);
      notify(`${singular} updated.`);
    }
    setEditing(null);
  }

  const formFields = fields.filter((f) => !f.hideInForm);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft md:flex-row md:items-center">
        <div className="relative flex-1">
          <Icon name="search" size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${title.toLowerCase()}…`} className="field-input pl-10" aria-label={`Search ${title}`} />
        </div>
        {filter ? (
          <div className="flex items-center gap-2">
            <Icon name="filter" size={16} className="text-muted-foreground" />
            <select className="field-input md:w-48" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} aria-label={`Filter by ${filter.label}`}>
              <option value="All">All {filter.label}</option>
              {filter.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <button className="btn btn-primary btn-sm" onClick={openAdd}>
          <Icon name="plus" size={16} /> {addLabel ?? `Add ${singular}`}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border px-5 py-3 text-xs text-muted-foreground">
          <span>
            Showing <strong className="text-foreground">{rows.length}</strong> of {items.length} records
          </span>
        </div>
        {rows.length === 0 ? (
          <div className="p-12 text-center">
            <Icon name="inbox" size={28} className="mx-auto text-muted-foreground" />
            <p className="mt-3 text-sm font-semibold">No records found</p>
            <p className="mt-1 text-xs text-muted-foreground">Try a different search, or add a new {singular.toLowerCase()}.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-muted/60 text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                <tr>
                  {columns.map((c) => (
                    <th key={c.label} className={`px-5 py-3 font-bold ${c.className ?? ""}`}>
                      {c.label}
                    </th>
                  ))}
                  {inlineStatus ? <th className="px-5 py-3 font-bold">Status</th> : null}
                  <th className="px-5 py-3 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row) => (
                  <tr key={row.id} className="transition hover:bg-muted/40">
                    {columns.map((c) => (
                      <td key={c.label} className={`px-5 py-4 align-middle ${c.className ?? ""}`}>
                        {c.render(row)}
                      </td>
                    ))}
                    {inlineStatus ? (
                      <td className="px-5 py-4">
                        <select
                          aria-label="Change status"
                          value={String(row[inlineStatus.key])}
                          onChange={(e) => {
                            onUpdate(row.id, { [inlineStatus.key]: e.target.value } as Partial<T>);
                            notify(`Status changed to “${e.target.value}”.`);
                          }}
                          className="rounded-lg border border-input bg-card px-2.5 py-1.5 text-xs font-semibold focus:border-primary focus:outline-none"
                        >
                          {inlineStatus.options.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </td>
                    ) : null}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <ActionButton label="View" icon="eye" tone="primary" onClick={() => setViewing(row)} />
                        <ActionButton label="Edit" icon="pencil" onClick={() => openEdit(row)} />
                        <ActionButton label="Delete" icon="trash" tone="danger" onClick={() => setDeleting(row)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View */}
      <Modal
        open={!!viewing}
        onClose={() => setViewing(null)}
        title={viewing ? rowTitle(viewing) : ""}
        size="lg"
        footer={
          viewing ? (
            <>
              <button className="btn btn-sm btn-outline" onClick={() => setViewing(null)}>
                Close
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  const r = viewing;
                  setViewing(null);
                  openEdit(r);
                }}
              >
                <Icon name="pencil" size={15} /> Edit
              </button>
            </>
          ) : null
        }
      >
        {viewing ? (
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.full || ["textarea", "list", "image", "file-meta"].includes(f.type) ? "sm:col-span-2" : ""}>
                <dt className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                <dd className="mt-1.5 text-sm text-foreground">
                  <FieldValue field={f} value={(viewing as unknown as FormValues)[f.key]} record={viewing as unknown as FormValues} />
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Modal>

      {/* Add / Edit */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.mode === "add" ? `Add ${singular}` : `Edit ${singular}`}
        size="lg"
        footer={
          <>
            <button className="btn btn-sm btn-outline" onClick={() => setEditing(null)}>
              Cancel
            </button>
            <button className="btn btn-sm btn-primary" onClick={save}>
              <Icon name="check" size={15} /> {editing?.mode === "add" ? "Add" : "Save changes"}
            </button>
          </>
        }
      >
        {editing ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {formFields.map((f) => (
              <FieldInput
                key={f.key}
                field={f}
                value={editing.values[f.key]}
                error={errors[f.key]}
                onChange={(v) => setEditing((e) => (e ? { ...e, values: { ...e.values, [f.key]: v } } : e))}
              />
            ))}
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={`Delete ${singular.toLowerCase()}?`}
        message={
          <>
            <strong className="text-foreground">{deleting ? rowTitle(deleting) : ""}</strong> will be removed from this demo. This cannot be undone (except by resetting demo data in Website Settings).
          </>
        }
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) {
            onDelete(deleting.id);
            notify(`${singular} deleted.`);
          }
          setDeleting(null);
        }}
      />
    </div>
  );
}

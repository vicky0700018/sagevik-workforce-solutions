import { useId, useRef, useState, type DragEvent } from "react";
import { formatBytes, validateResumeFile } from "@/lib/validation";
import { Icon } from "./Icon";

export function ResumeUpload({
  file,
  onChange,
  label = "Upload Resume / Document",
  optional = true,
  externalError,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  label?: string;
  optional?: boolean;
  externalError?: string | undefined;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function accept(f: File | undefined) {
    if (!f) return;
    const err = validateResumeFile(f);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    onChange(f);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    accept(e.dataTransfer.files?.[0]);
  }

  const shownError = error ?? externalError;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {optional ? <span className="font-normal text-muted-foreground">(optional)</span> : <span className="text-destructive">*</span>}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={(e) => {
          accept(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {file ? (
        <div className="animate-fade-up flex flex-wrap items-center gap-4 rounded-2xl border border-primary/25 bg-secondary/60 p-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card text-primary shadow-soft">
            <Icon name="file-text" size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground" title={file.name}>
              {file.name}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatBytes(file.size)} · Ready (kept in this browser only)
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn btn-sm btn-outline" onClick={() => inputRef.current?.click()}>
              <Icon name="refresh" size={15} /> Replace
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline hover:!border-destructive hover:!text-destructive"
              onClick={() => {
                onChange(null);
                setError(null);
              }}
            >
              <Icon name="trash" size={15} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          aria-describedby={`${id}-help`}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all duration-300 ${
            dragging
              ? "border-primary bg-secondary"
              : shownError
                ? "border-destructive/50 bg-destructive/5"
                : "border-input bg-muted/40 hover:border-primary/60 hover:bg-secondary/50"
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-card text-primary shadow-soft transition-transform duration-500 group-hover:-translate-y-1">
            <Icon name="upload" size={24} />
          </span>
          <p className="mt-4 text-sm font-semibold text-foreground">
            {dragging ? "Drop your file here" : "Drag & drop your file, or click to browse"}
          </p>
          <p id={`${id}-help`} className="mt-1 text-xs text-muted-foreground">
            PDF, DOC or DOCX · Maximum 5 MB
          </p>
        </div>
      )}
      {shownError ? <p className="field-error" role="alert">{shownError}</p> : null}
      <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
        <Icon name="info" size={14} className="mt-px shrink-0" />
        Demo notice: files are not uploaded to any server or stored permanently. Only the file name and size are recorded in this browser.
      </p>
    </div>
  );
}

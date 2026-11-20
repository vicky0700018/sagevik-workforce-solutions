/** Demo-only rules shared by the public forms and the admin panel. */

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
export const ALLOWED_RESUME_EXTENSIONS = ["pdf", "doc", "docx"] as const;

export const DEMO_ADMIN = {
  email: "admin@sagevikllp.com",
  password: "Sagevik@123",
} as const;

export function checkAdminCredentials(email: string, password: string): boolean {
  return email.trim().toLowerCase() === DEMO_ADMIN.email && password === DEMO_ADMIN.password;
}

export function fileExtension(name: string): string {
  const idx = name.lastIndexOf(".");
  return idx === -1 ? "" : name.slice(idx + 1).toLowerCase();
}

/** Returns an error message, or null when the file is acceptable. */
export function validateResumeFile(file: { name: string; size: number }): string | null {
  const ext = fileExtension(file.name);
  if (!(ALLOWED_RESUME_EXTENSIONS as readonly string[]).includes(ext)) {
    return "Only PDF, DOC or DOCX files are accepted.";
  }
  if (file.size === 0) return "This file appears to be empty.";
  if (file.size > MAX_RESUME_BYTES) {
    return "File is larger than 5 MB. Please upload a smaller file.";
  }
  return null;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

/** Accepts 10-digit Indian mobiles, optionally prefixed with +91 / 91 / 0, spaces and dashes allowed. */
export function isValidMobile(v: string): boolean {
  const digits = v.replace(/[\s-]/g, "").replace(/^\+?91/, "").replace(/^0/, "");
  return /^[6-9]\d{9}$/.test(digits);
}

export function digitsOnly(v: string): string {
  return v.replace(/\D/g, "");
}

export function telHref(phone: string): string | null {
  const d = digitsOnly(phone);
  if (d.length < 8) return null;
  return `tel:+${d.length === 10 ? `91${d}` : d}`;
}

export function whatsappHref(phone: string, message?: string): string | null {
  const d = digitsOnly(phone);
  if (d.length < 8) return null;
  const full = d.length === 10 ? `91${d}` : d;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${full}${text}`;
}

export type EnquiryInput = {
  name: string;
  email: string;
  mobile: string;
  company: string;
  subject: string;
  message: string;
};

export function validateEnquiry(v: EnquiryInput): Partial<Record<keyof EnquiryInput, string>> {
  const e: Partial<Record<keyof EnquiryInput, string>> = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!isValidEmail(v.email)) e.email = "Please enter a valid email address.";
  if (!isValidMobile(v.mobile)) e.mobile = "Please enter a valid 10-digit mobile number.";
  if (!v.subject) e.subject = "Please choose an enquiry type.";
  if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
  return e;
}

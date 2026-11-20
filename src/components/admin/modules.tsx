import type { ReactNode } from "react";
import { Icon } from "@/components/site/Icon";
import { ConfirmDialog, SmartImage } from "@/components/site/primitives";
import { IMAGE_KEYS } from "@/lib/images";
import {
  DEFAULT_DATA,
  ENQUIRY_TYPES,
  type Application,
  type ApproachStep,
  type CoreValue,
  type Enquiry,
  type GalleryImage,
  type Job,
  type PageBanner,
  type Partner,
  type Perk,
  type Service,
  type SocialLink,
} from "@/lib/site-data";
import { newId, useSite, type CollectionKey, type ItemOf } from "@/lib/site-store";
import { useState } from "react";
import { CrudModule, type Column } from "./CrudModule";
import { Badge, formatDate, statusTone, type FieldDef } from "./fields";
import { FormModule } from "./FormModule";

export type AdminModule = {
  slug: string;
  title: string;
  icon: string;
  description: string;
  preview?: string;
  Component: () => ReactNode;
};

/** Binds a CrudModule to a store collection. */
function useCollection<K extends CollectionKey>(key: K) {
  const { data, addItem, updateItem, removeItem } = useSite();
  return {
    items: data[key] as unknown as Array<ItemOf<K> & { id: string }>,
    onCreate: (item: ItemOf<K>) => addItem(key, item),
    onUpdate: (id: string, patch: Partial<ItemOf<K>>) => updateItem(key, id, patch),
    onDelete: (id: string) => removeItem(key, id),
  };
}

const titleCell = (title: string, sub?: string): ReactNode => (
  <div className="min-w-0">
    <p className="font-semibold text-foreground">{title}</p>
    {sub ? <p className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">{sub}</p> : null}
  </div>
);

/* ---------------- Field definitions ---------------- */

const serviceFields: FieldDef[] = [
  { key: "title", label: "Service title", type: "text", required: true, full: true },
  { key: "icon", label: "Icon", type: "icon" },
  { key: "featured", label: "Featured", type: "boolean" },
  { key: "image", label: "Image", type: "image" },
  { key: "summary", label: "Short summary", type: "textarea", required: true },
  { key: "description", label: "Detailed description", type: "textarea", required: true },
  { key: "benefits", label: "Key benefits", type: "list", help: "One benefit per line." },
];

const approachFields: FieldDef[] = [
  { key: "order", label: "Order", type: "number", required: true },
  { key: "icon", label: "Icon", type: "icon" },
  { key: "title", label: "Stage title (Approach page)", type: "text", required: true },
  { key: "homeTitle", label: "Short title (Home page)", type: "text", required: true },
  { key: "showOnHome", label: "Show on Home page", type: "boolean" },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "points", label: "Key points", type: "list" },
];

const partnerFields: FieldDef[] = [
  { key: "name", label: "Full name", type: "text", required: true },
  { key: "designation", label: "Designation", type: "text", required: true },
  { key: "order", label: "Display order", type: "number" },
  { key: "bio", label: "Short profile", type: "textarea" },
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;
const jobFields: FieldDef[] = [
  { key: "title", label: "Job title", type: "text", required: true },
  { key: "department", label: "Department", type: "text", required: true },
  { key: "type", label: "Job type", type: "select", options: JOB_TYPES },
  { key: "status", label: "Status", type: "select", options: ["Open", "Closed"] },
  { key: "location", label: "Location", type: "text", required: true },
  { key: "experience", label: "Experience", type: "text", required: true },
  { key: "postedOn", label: "Posted on", type: "date" },
  { key: "summary", label: "Job description", type: "textarea", required: true },
  { key: "responsibilities", label: "Responsibilities", type: "list" },
  { key: "requirements", label: "Requirements", type: "list" },
];

const ENQ_STATUS = ["New", "In Progress", "Responded", "Closed"] as const;
const enquiryFields: FieldDef[] = [
  { key: "name", label: "Full name", type: "text", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "mobile", label: "Mobile", type: "text", required: true },
  { key: "company", label: "Company", type: "text" },
  { key: "subject", label: "Enquiry type", type: "select", options: ENQUIRY_TYPES },
  { key: "status", label: "Status", type: "select", options: ENQ_STATUS },
  { key: "message", label: "Message", type: "textarea", required: true },
  { key: "fileName", label: "Attached document", type: "file-meta", hideInForm: false },
  { key: "source", label: "Source", type: "select", options: ["Contact Page", "Quick Enquiry", "Admin"] },
  { key: "createdAt", label: "Received", type: "readonly-date" },
];

const APP_STATUS = ["Received", "Under Review", "Shortlisted", "Not Selected"] as const;
const applicationFields: FieldDef[] = [
  { key: "name", label: "Candidate name", type: "text", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "mobile", label: "Mobile", type: "text", required: true },
  { key: "position", label: "Position", type: "text", required: true },
  { key: "experience", label: "Experience", type: "text" },
  { key: "status", label: "Status", type: "select", options: APP_STATUS },
  { key: "coverNote", label: "Note", type: "textarea" },
  { key: "fileName", label: "Resume file", type: "file-meta" },
  { key: "createdAt", label: "Submitted", type: "readonly-date" },
];

const valueFields: FieldDef[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "icon", label: "Icon", type: "icon" },
  { key: "description", label: "Description", type: "textarea", required: true },
];

/* ---------------- Modules ---------------- */

function CompanyModule() {
  const { data, setSection } = useSite();
  return (
    <div className="space-y-5">
      <div className="flex gap-3 rounded-2xl border border-gold/40 bg-gold-soft p-4 text-sm text-foreground/80">
        <Icon name="info" className="shrink-0 text-gold-deep" />
        Add a phone or WhatsApp number here to show the Call and WhatsApp floating buttons. Leave blank to keep them hidden.
      </div>
      <FormModule
        title="Company Profile"
        value={data.company}
        defaults={DEFAULT_DATA.company}
        onSave={(v) => setSection("company", v)}
        fields={[
          { key: "name", label: "Business name", type: "text", required: true },
          { key: "shortName", label: "Short name", type: "text", required: true },
          { key: "tagline", label: "Tagline", type: "text", full: true },
          { key: "businessType", label: "Business type", type: "text" },
          { key: "legalStructure", label: "Legal structure", type: "text" },
          { key: "registrationAuthority", label: "Registration authority", type: "text" },
          { key: "llpin", label: "LLPIN", type: "text" },
          { key: "status", label: "Status", type: "text" },
          { key: "incorporationDate", label: "Incorporation date", type: "text" },
          { key: "established", label: "Established (year)", type: "text" },
          { key: "address", label: "Registered address", type: "textarea", required: true },
          { key: "phone", label: "Phone number", type: "text", placeholder: "Not configured", help: "Shown on Contact page, footer and Call button." },
          { key: "whatsapp", label: "WhatsApp number", type: "text", placeholder: "Not configured", help: "Include country code, e.g. +91 98…" },
          { key: "email", label: "Email address", type: "email", placeholder: "Not configured" },
          { key: "businessHours", label: "Business hours", type: "text", placeholder: "Not configured" },
        ]}
      />
    </div>
  );
}

function AboutModule() {
  const { data, setSection } = useSite();
  const c = useCollection("coreValues");
  return (
    <div className="space-y-8">
      <FormModule
        title="About Us content"
        value={data.about}
        defaults={DEFAULT_DATA.about}
        onSave={(v) => setSection("about", v)}
        fields={[
          { key: "intro", label: "Company introduction", type: "textarea", required: true },
          { key: "background", label: "Company background", type: "textarea" },
          { key: "vision", label: "Vision", type: "textarea" },
          { key: "mission", label: "Mission", type: "textarea" },
          { key: "philosophy", label: "Business philosophy", type: "textarea" },
        ]}
      />
      <div>
        <h3 className="mb-4 font-display text-2xl font-semibold text-navy">Core Values</h3>
        <CrudModule<CoreValue>
          title="Core values"
          singular="Core value"
          {...c}
          fields={valueFields}
          searchKeys={["title", "description"]}
          rowTitle={(r) => r.title}
          makeNew={() => ({ id: newId("cv"), title: "", description: "", icon: "star" })}
          columns={[
            { label: "Value", render: (r) => <span className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary"><Icon name={r.icon} size={17} /></span>{titleCell(r.title, r.description)}</span> },
          ]}
        />
      </div>
    </div>
  );
}

function ServicesModule() {
  const c = useCollection("services");
  return (
    <CrudModule<Service>
      title="Services"
      singular="Service"
      {...c}
      fields={serviceFields}
      searchKeys={["title", "summary", "description"]}
      rowTitle={(r) => r.title}
      makeNew={() => ({ id: newId("svc"), title: "", icon: "briefcase", image: IMAGE_KEYS[0] ?? "", summary: "", description: "", benefits: [], featured: false })}
      columns={[
        { label: "Service", render: (r) => <span className="flex items-center gap-3"><SmartImage src={r.image} alt="" className="h-11 w-16 shrink-0 rounded-lg" />{titleCell(r.title, r.summary)}</span> },
        { label: "Benefits", render: (r) => <span className="text-muted-foreground">{r.benefits.length}</span> },
        { label: "Featured", render: (r) => (r.featured ? <Badge tone="gold">Featured</Badge> : <Badge tone="muted">Standard</Badge>) },
      ]}
    />
  );
}

function ApproachModule() {
  const c = useCollection("approach");
  return (
    <CrudModule<ApproachStep>
      title="Approach stages"
      singular="Stage"
      {...c}
      items={[...c.items].sort((a, b) => a.order - b.order)}
      fields={approachFields}
      searchKeys={["title", "homeTitle", "description"]}
      rowTitle={(r) => r.title}
      makeNew={() => ({ id: newId("ap"), order: c.items.length + 1, title: "", homeTitle: "", description: "", points: [], icon: "route", showOnHome: false })}
      columns={[
        { label: "#", render: (r) => <span className="font-display text-xl font-semibold text-gold-deep">{r.order}</span> },
        { label: "Stage", render: (r) => titleCell(r.title, r.description) },
        { label: "Home page", render: (r) => (r.showOnHome ? <Badge tone="success">Shown</Badge> : <Badge tone="muted">Hidden</Badge>) },
      ]}
    />
  );
}

function PartnersModule() {
  const c = useCollection("partners");
  return (
    <CrudModule<Partner>
      title="Designated partners"
      singular="Partner"
      {...c}
      fields={partnerFields}
      searchKeys={["name", "designation"]}
      rowTitle={(r) => r.name}
      makeNew={() => ({ id: newId("p"), name: "", designation: "Designated Partner", bio: "", order: c.items.length + 1 })}
      columns={[
        { label: "Name", render: (r) => titleCell(r.name, r.bio) },
        { label: "Designation", render: (r) => <Badge tone="gold">{r.designation}</Badge> },
        { label: "Order", render: (r) => r.order },
      ]}
    />
  );
}

function CareersModule() {
  const { data, setSection } = useSite();
  const c = useCollection("perks");
  return (
    <div className="space-y-8">
      <FormModule
        title="Careers page content"
        value={data.careers}
        defaults={DEFAULT_DATA.careers}
        onSave={(v) => setSection("careers", v)}
        fields={[
          { key: "intro", label: "Introduction (Why work with us)", type: "textarea", required: true },
          { key: "applyNote", label: "Resume submission note", type: "textarea" },
        ]}
      />
      <div>
        <h3 className="mb-4 font-display text-2xl font-semibold text-navy">Why work with us — highlights</h3>
        <CrudModule<Perk>
          title="Highlights"
          singular="Highlight"
          {...c}
          fields={valueFields}
          searchKeys={["title", "description"]}
          rowTitle={(r) => r.title}
          makeNew={() => ({ id: newId("pk"), title: "", description: "", icon: "star" })}
          columns={[{ label: "Highlight", render: (r) => <span className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary"><Icon name={r.icon} size={17} /></span>{titleCell(r.title, r.description)}</span> }]}
        />
      </div>
    </div>
  );
}

function JobsModule() {
  const c = useCollection("jobs");
  return (
    <CrudModule<Job>
      title="Job listings"
      singular="Job listing"
      {...c}
      fields={jobFields}
      searchKeys={["title", "department", "location"]}
      filter={{ key: "type", label: "job types", options: JOB_TYPES }}
      inlineStatus={{ key: "status", options: ["Open", "Closed"] }}
      rowTitle={(r) => r.title}
      makeNew={() => ({
        id: newId("job"),
        title: "",
        department: "",
        type: "Full-time",
        location: "Pune, Maharashtra",
        experience: "",
        summary: "",
        responsibilities: [],
        requirements: [],
        status: "Open",
        postedOn: new Date().toISOString().slice(0, 10),
      })}
      columns={[
        { label: "Role", render: (r) => titleCell(r.title, r.department) },
        { label: "Type", render: (r) => <Badge tone="info">{r.type}</Badge> },
        { label: "Location", render: (r) => <span className="text-muted-foreground">{r.location}</span> },
        { label: "Posted", render: (r) => <span className="whitespace-nowrap text-muted-foreground">{formatDate(r.postedOn)}</span> },
      ]}
    />
  );
}

function EnquiriesModule() {
  const c = useCollection("enquiries");
  return (
    <CrudModule<Enquiry>
      title="Enquiries"
      singular="Enquiry"
      {...c}
      items={[...c.items].sort((a, b) => b.createdAt.localeCompare(a.createdAt))}
      fields={enquiryFields}
      searchKeys={["name", "email", "mobile", "company", "subject", "message"]}
      filter={{ key: "status", label: "statuses", options: ENQ_STATUS }}
      inlineStatus={{ key: "status", options: ENQ_STATUS }}
      rowTitle={(r) => r.name}
      addLabel="Add enquiry"
      makeNew={() => ({
        id: newId("enq"),
        name: "",
        email: "",
        mobile: "",
        company: "",
        subject: ENQUIRY_TYPES[0] ?? "General Enquiry",
        message: "",
        fileName: "",
        fileSize: 0,
        fileType: "",
        source: "Admin",
        status: "New",
        createdAt: new Date().toISOString(),
        sample: false,
      })}
      columns={[
        { label: "From", render: (r) => <div>{titleCell(r.name, r.email)}{r.sample ? <span className="mt-1 inline-block"><Badge tone="muted">Sample</Badge></span> : null}</div> },
        { label: "Subject", render: (r) => <span className="text-muted-foreground">{r.subject}</span> },
        { label: "File", render: (r) => (r.fileName ? <span className="flex items-center gap-1.5 text-xs text-primary"><Icon name="file-text" size={14} /> Yes</span> : <span className="text-xs text-muted-foreground">—</span>) },
        { label: "Received", render: (r) => <span className="whitespace-nowrap text-xs text-muted-foreground">{formatDate(r.createdAt)}</span> },
      ]}
    />
  );
}

function ApplicationsModule() {
  const c = useCollection("applications");
  return (
    <CrudModule<Application>
      title="Resume submissions"
      singular="Submission"
      {...c}
      items={[...c.items].sort((a, b) => b.createdAt.localeCompare(a.createdAt))}
      fields={applicationFields}
      searchKeys={["name", "email", "position", "fileName"]}
      filter={{ key: "status", label: "statuses", options: APP_STATUS }}
      inlineStatus={{ key: "status", options: APP_STATUS }}
      rowTitle={(r) => r.name}
      addLabel="Add submission"
      makeNew={() => ({
        id: newId("app"),
        name: "",
        email: "",
        mobile: "",
        position: "General Application",
        experience: "",
        coverNote: "",
        fileName: "",
        fileSize: 0,
        fileType: "",
        status: "Received",
        createdAt: new Date().toISOString(),
        sample: false,
      })}
      columns={[
        { label: "Candidate", render: (r) => <div>{titleCell(r.name, r.email)}{r.sample ? <span className="mt-1 inline-block"><Badge tone="muted">Sample</Badge></span> : null}</div> },
        { label: "Position", render: (r) => <span className="text-muted-foreground">{r.position}</span> },
        { label: "Resume", render: (r) => (r.fileName ? <span className="flex max-w-40 items-center gap-1.5 truncate text-xs text-primary"><Icon name="file-text" size={14} /> {r.fileName}</span> : "—") },
        { label: "Submitted", render: (r) => <span className="whitespace-nowrap text-xs text-muted-foreground">{formatDate(r.createdAt)}</span> },
      ]}
    />
  );
}

function GalleryModule() {
  const c = useCollection("gallery");
  return (
    <CrudModule<GalleryImage>
      title="Gallery images"
      singular="Image"
      {...c}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "category", label: "Page / category", type: "select", options: ["Home", "About", "Services", "Approach", "Careers", "Contact", "Other"] },
        { key: "image", label: "Image", type: "image", required: true },
        { key: "alt", label: "Alt text (accessibility)", type: "text", full: true },
      ]}
      searchKeys={["title", "category", "alt"]}
      filter={{ key: "category", label: "categories", options: ["Home", "About", "Services", "Approach", "Careers", "Contact", "Other"] }}
      rowTitle={(r) => r.title}
      makeNew={() => ({ id: newId("g"), title: "", image: IMAGE_KEYS[0] ?? "", category: "Other", alt: "" })}
      columns={[
        { label: "Image", render: (r) => <SmartImage src={r.image} alt={r.alt} className="h-14 w-20 rounded-lg" /> },
        { label: "Title", render: (r) => titleCell(r.title, r.alt) },
        { label: "Category", render: (r) => <Badge tone="info">{r.category}</Badge> },
      ]}
    />
  );
}

function ContentModule() {
  const c = useCollection("banners");
  return (
    <CrudModule<PageBanner>
      title="Page banners"
      singular="Page banner"
      {...c}
      fields={[
        { key: "page", label: "Page key", type: "select", options: ["home", "about", "services", "approach", "careers", "contact"], help: "Each page uses the first banner with its key." },
        { key: "eyebrow", label: "Eyebrow label", type: "text", required: true },
        { key: "title", label: "Headline", type: "textarea", required: true },
        { key: "subtitle", label: "Supporting text", type: "textarea" },
      ]}
      searchKeys={["page", "title", "subtitle"]}
      rowTitle={(r) => `${r.page} banner`}
      makeNew={() => ({ id: newId("b"), page: "home", eyebrow: "", title: "", subtitle: "" })}
      columns={[
        { label: "Page", render: (r) => <Badge tone="gold">{r.page}</Badge> },
        { label: "Headline", render: (r) => titleCell(r.title, r.subtitle) },
      ]}
    />
  );
}

function FooterModule() {
  const { data, setSection } = useSite();
  return (
    <div className="space-y-5">
      <FormModule
        title="Footer"
        value={data.footer}
        defaults={DEFAULT_DATA.footer}
        onSave={(v) => setSection("footer", v)}
        fields={[
          { key: "about", label: "Company introduction", type: "textarea", required: true },
          { key: "copyright", label: "Copyright text", type: "text", required: true, full: true, help: "The current year is added automatically." },
          { key: "showAddress", label: "Show registered address", type: "boolean" },
        ]}
      />
      <div className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <Icon name="lock" className="shrink-0" /> The credit “Designed and development by SOSynch Ai Tech” is fixed and always shown.
      </div>
    </div>
  );
}

function SocialsModule() {
  const c = useCollection("socials");
  return (
    <CrudModule<SocialLink>
      title="Social links"
      singular="Social link"
      {...c}
      fields={[
        { key: "platform", label: "Platform", type: "select", options: ["LinkedIn", "Instagram", "Facebook", "YouTube", "X (Twitter)", "Website"] },
        { key: "url", label: "Profile URL", type: "url", placeholder: "https://…", full: true },
        { key: "enabled", label: "Show in footer", type: "boolean", help: "Only enabled links with a URL are shown." },
      ]}
      searchKeys={["platform", "url"]}
      rowTitle={(r) => r.platform}
      makeNew={() => ({ id: newId("s"), platform: "LinkedIn", url: "", enabled: true })}
      columns={[
        { label: "Platform", render: (r) => <span className="font-semibold">{r.platform}</span> },
        { label: "URL", render: (r) => <span className="text-xs text-muted-foreground">{r.url || "Not configured"}</span> },
        { label: "Visible", render: (r) => (r.enabled && r.url ? <Badge tone="success">Visible</Badge> : <Badge tone="muted">Hidden</Badge>) },
      ]}
    />
  );
}

function SettingsModule() {
  const { data, setSection, resetDemo, notify } = useSite();
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="space-y-6">
      <FormModule
        title="Website settings"
        value={data.settings}
        defaults={DEFAULT_DATA.settings}
        onSave={(v) => setSection("settings", v)}
        fields={[
          { key: "siteTitle", label: "Site title", type: "text", required: true },
          { key: "announcement", label: "Top bar message", type: "text", placeholder: "Defaults to LLP registration details" },
          { key: "showTopBar", label: "Show top information bar", type: "boolean" },
          { key: "showFloatingButtons", label: "Show floating buttons", type: "boolean" },
          { key: "showQuickEnquiry", label: "Show Quick Enquiry button", type: "boolean" },
          { key: "whatsappMessage", label: "WhatsApp pre-filled message", type: "textarea" },
        ]}
      />
      <div className="flex flex-col gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Reset demo data</h3>
          <p className="mt-1 text-sm text-muted-foreground">Restore all content, enquiries and submissions to the original demo state in this browser.</p>
        </div>
        <button className="btn btn-sm btn-danger" onClick={() => setConfirm(true)}>
          <Icon name="refresh" size={15} /> Reset everything
        </button>
      </div>
      <ConfirmDialog
        open={confirm}
        title="Reset all demo data?"
        confirmLabel="Reset"
        message="All changes made in the admin panel and any enquiries or submissions recorded in this browser will be removed."
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          resetDemo();
          setConfirm(false);
          notify("Demo data has been reset.");
        }}
      />
    </div>
  );
}

export const ADMIN_MODULES: AdminModule[] = [
  { slug: "company", title: "Company Profile", icon: "building", description: "Business name, registration details and contact information.", preview: "/about", Component: CompanyModule },
  { slug: "about", title: "About Us", icon: "info", description: "Introduction, background, vision, mission, philosophy and core values.", preview: "/about", Component: AboutModule },
  { slug: "services", title: "Services", icon: "layers", description: "Service categories shown on Home and Services pages.", preview: "/services", Component: ServicesModule },
  { slug: "approach", title: "Our Approach", icon: "route", description: "Process stages for the Approach and Home pages.", preview: "/approach", Component: ApproachModule },
  { slug: "partners", title: "Designated Partners", icon: "id-card", description: "Leadership profiles.", preview: "/about", Component: PartnersModule },
  { slug: "careers", title: "Careers", icon: "graduation", description: "Careers page content and highlights.", preview: "/careers", Component: CareersModule },
  { slug: "jobs", title: "Job Listings", icon: "briefcase", description: "Openings shown on the Careers page.", preview: "/careers", Component: JobsModule },
  { slug: "enquiries", title: "Enquiries", icon: "inbox", description: "Enquiries from the Contact form and Quick Enquiry.", Component: EnquiriesModule },
  { slug: "applications", title: "Resume Submissions", icon: "file-text", description: "Job applications and resume metadata.", Component: ApplicationsModule },
  { slug: "gallery", title: "Gallery / Images", icon: "image", description: "Website image library.", Component: GalleryModule },
  { slug: "content", title: "Website Content", icon: "type", description: "Page banner headlines and supporting text.", preview: "/", Component: ContentModule },
  { slug: "footer", title: "Footer", icon: "panel-bottom", description: "Footer introduction, address and copyright.", preview: "/", Component: FooterModule },
  { slug: "socials", title: "Social Links", icon: "link", description: "Social media profiles shown in the footer.", preview: "/", Component: SocialsModule },
  { slug: "settings", title: "Website Settings", icon: "sliders", description: "Global display options and demo reset.", preview: "/", Component: SettingsModule },
];

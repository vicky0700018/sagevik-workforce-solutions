import { useSite } from "@/lib/site-store";
import { telHref, whatsappHref } from "@/lib/validation";
import { EnquiryForm } from "./EnquiryForm";
import { Icon } from "./Icon";
import { Modal } from "./primitives";

export function FloatingActions() {
  const { data, quickEnquiryOpen, setQuickEnquiryOpen } = useSite();
  const { company, settings } = data;
  const wa = company.whatsapp ? whatsappHref(company.whatsapp, settings.whatsappMessage) : null;
  const tel = company.phone ? telHref(company.phone) : null;

  if (!settings.showFloatingButtons) return null;

  const base =
    "group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lift transition-all duration-300 hover:-translate-y-1 hover:scale-105 sm:h-14 sm:w-14";

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-3 sm:bottom-6 sm:right-6">
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className={`${base} animate-pulse-ring bg-whatsapp text-navy-foreground`}>
            <Icon name="whatsapp" size={24} />
            <span className="tooltip-left group-hover:translate-x-0 group-hover:opacity-100">WhatsApp us</span>
          </a>
        ) : null}
        {tel ? (
          <a href={tel} aria-label="Call us" className={`${base} bg-royal-gradient text-primary-foreground`}>
            <Icon name="phone" size={21} />
            <span className="tooltip-left group-hover:translate-x-0 group-hover:opacity-100">Call {company.phone}</span>
          </a>
        ) : null}
        {settings.showQuickEnquiry ? (
          <button onClick={() => setQuickEnquiryOpen(true)} aria-label="Quick enquiry" className={`${base} bg-gold-gradient text-navy-deep`}>
            <Icon name="message" size={21} />
            <span className="tooltip-left group-hover:translate-x-0 group-hover:opacity-100">Quick Enquiry</span>
          </button>
        ) : null}
      </div>
      <Modal open={quickEnquiryOpen} onClose={() => setQuickEnquiryOpen(false)} title="Quick Enquiry" size="md">
        <p className="mb-5 text-sm text-muted-foreground">Share a few details and your requirement. This demo keeps submissions in your browser only.</p>
        <EnquiryForm compact source="Quick Enquiry" onDone={() => setQuickEnquiryOpen(false)} />
      </Modal>
    </>
  );
}

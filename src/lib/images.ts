import heroOffice from "@/assets/hero-office.jpg";
import aboutBoardroom from "@/assets/about-boardroom.jpg";
import aboutWorkspace from "@/assets/about-workspace.jpg";
import serviceRecruitment from "@/assets/service-recruitment.jpg";
import serviceWorkforce from "@/assets/service-workforce.jpg";
import serviceHr from "@/assets/service-hr.jpg";
import serviceStaffing from "@/assets/service-staffing.jpg";
import serviceCareers from "@/assets/service-careers.jpg";
import serviceConsultancy from "@/assets/service-consultancy.jpg";
import approachListening from "@/assets/approach-listening.jpg";
import approachEvaluation from "@/assets/approach-evaluation.jpg";
import careersTeam from "@/assets/careers-team.jpg";
import careersCandidate from "@/assets/careers-candidate.jpg";
import contactReception from "@/assets/contact-reception.jpg";

/** Built-in image library. Records store an image key (or a full URL) and resolve through here. */
export const IMAGE_LIBRARY: Record<string, { src: string; label: string }> = {
  "hero-office": { src: heroOffice, label: "Home – professionals in a Pune office" },
  "about-boardroom": { src: aboutBoardroom, label: "About – boardroom discussion" },
  "about-workspace": { src: aboutWorkspace, label: "About – modern office interior" },
  "service-recruitment": { src: serviceRecruitment, label: "Services – recruitment interview" },
  "service-workforce": { src: serviceWorkforce, label: "Services – workforce planning" },
  "service-hr": { src: serviceHr, label: "Services – HR support" },
  "service-staffing": { src: serviceStaffing, label: "Services – staffing team" },
  "service-careers": { src: serviceCareers, label: "Services – career guidance" },
  "service-consultancy": { src: serviceConsultancy, label: "Services – employment consultancy" },
  "approach-listening": { src: approachListening, label: "Approach – understanding requirements" },
  "approach-evaluation": { src: approachEvaluation, label: "Approach – candidate evaluation" },
  "careers-team": { src: careersTeam, label: "Careers – collaborative team" },
  "careers-candidate": { src: careersCandidate, label: "Careers – candidate with resume" },
  "contact-reception": { src: contactReception, label: "Contact – reception desk" },
};

export const IMAGE_KEYS = Object.keys(IMAGE_LIBRARY);

export function resolveImage(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return IMAGE_LIBRARY[value]?.src ?? value;
}

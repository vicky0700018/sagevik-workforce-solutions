/** Types and default mock content for the SAGEVIK LLP demo site. */

export type Company = {
  name: string;
  shortName: string;
  tagline: string;
  businessType: string;
  legalStructure: string;
  registrationAuthority: string;
  llpin: string;
  status: string;
  incorporationDate: string;
  established: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  businessHours: string;
};

export type AboutContent = {
  intro: string;
  background: string;
  vision: string;
  mission: string;
  philosophy: string;
};

export type CoreValue = { id: string; title: string; description: string; icon: string };

export type Service = {
  id: string;
  title: string;
  icon: string;
  image: string;
  summary: string;
  description: string;
  benefits: string[];
  featured: boolean;
};

export type ApproachStep = {
  id: string;
  order: number;
  title: string;
  homeTitle: string;
  description: string;
  points: string[];
  icon: string;
  showOnHome: boolean;
};

export type Partner = {
  id: string;
  name: string;
  designation: string;
  bio: string;
  order: number;
};

export type CareersContent = { intro: string; applyNote: string };

export type Perk = { id: string; title: string; description: string; icon: string };

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type Job = {
  id: string;
  title: string;
  department: string;
  type: JobType;
  location: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  status: "Open" | "Closed";
  postedOn: string;
};

export type EnquiryStatus = "New" | "In Progress" | "Responded" | "Closed";
export type Enquiry = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  company: string;
  subject: string;
  message: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  source: "Contact Page" | "Quick Enquiry" | "Admin";
  status: EnquiryStatus;
  createdAt: string;
  sample: boolean;
};

export type ApplicationStatus = "Received" | "Under Review" | "Shortlisted" | "Not Selected";
export type Application = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  position: string;
  experience: string;
  coverNote: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  status: ApplicationStatus;
  createdAt: string;
  sample: boolean;
};

export type GalleryImage = { id: string; title: string; image: string; category: string; alt: string };

export type PageBanner = {
  id: string;
  page: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type FooterContent = { about: string; copyright: string; showAddress: boolean };

export type SocialLink = { id: string; platform: string; url: string; enabled: boolean };

export type Settings = {
  siteTitle: string;
  showFloatingButtons: boolean;
  showQuickEnquiry: boolean;
  whatsappMessage: string;
  showTopBar: boolean;
  announcement: string;
};

export type SiteData = {
  company: Company;
  about: AboutContent;
  coreValues: CoreValue[];
  services: Service[];
  approach: ApproachStep[];
  partners: Partner[];
  careers: CareersContent;
  perks: Perk[];
  jobs: Job[];
  enquiries: Enquiry[];
  applications: Application[];
  gallery: GalleryImage[];
  banners: PageBanner[];
  footer: FooterContent;
  socials: SocialLink[];
  settings: Settings;
};

export const ENQUIRY_TYPES = [
  "Business / Hiring Enquiry",
  "Workforce Solutions",
  "HR Support",
  "Career / Job Seeker",
  "Partnership",
  "General Enquiry",
];

export const DEFAULT_DATA: SiteData = {
  company: {
    name: "SAGEVIK LLP",
    shortName: "SAGEVIK",
    tagline: "Connecting talent with opportunity",
    businessType: "Employment Activities",
    legalStructure: "Limited Liability Partnership",
    registrationAuthority: "ROC Pune",
    llpin: "ADB-1043",
    status: "Active",
    incorporationDate: "12 August 2026",
    established: "2026",
    address:
      "Flat No. B9-702, Mantra Montana, Dhanori, Pune City, Maharashtra – 411015, India.",
    phone: "",
    whatsapp: "",
    email: "",
    businessHours: "",
  },
  about: {
    intro:
      "SAGEVIK LLP is a Pune-based Limited Liability Partnership engaged in employment activities. We work to bring organisations and professionals together through a considered, people-first approach to talent and workforce needs.",
    background:
      "Incorporated on 12 August 2026 and registered with ROC Pune, SAGEVIK LLP was founded by its Designated Partners with a shared belief: that the right match between a person and a role creates lasting value for both. As a newly established firm, we are building our practice on clarity, diligence and respect for every individual we work with.",
    vision:
      "To be a trusted employment partner in Pune and beyond — known for thoughtful matching, honest communication and relationships that endure.",
    mission:
      "To understand each organisation's needs in depth, identify suitable talent with care, and support candidates with transparent guidance throughout their journey.",
    philosophy:
      "We believe employment is personal. Behind every requirement is a team with goals, and behind every resume is a person with aspirations. Our work begins by listening, continues with careful evaluation, and is measured by the quality of relationships we build.",
  },
  coreValues: [
    { id: "cv-1", title: "Integrity", description: "Honest guidance and fair conduct with organisations and candidates alike.", icon: "shield" },
    { id: "cv-2", title: "People First", description: "Every decision considers the individual behind the profile.", icon: "heart" },
    { id: "cv-3", title: "Transparency", description: "Clear expectations, open communication and no hidden surprises.", icon: "eye" },
    { id: "cv-4", title: "Diligence", description: "A careful, quality-oriented process at every step.", icon: "target" },
  ],
  services: [
    {
      id: "svc-recruitment",
      title: "Recruitment & Talent Acquisition",
      icon: "user-search",
      image: "service-recruitment",
      summary: "Structured support to source, screen and present candidates aligned with your roles.",
      description:
        "We work with you to define the role, the skills it needs and the culture it sits in. From there, we source and screen candidates and present a considered shortlist, keeping you informed at each stage.",
      benefits: ["Role definition support", "Candidate sourcing & screening", "Curated shortlists", "Interview coordination"],
      featured: true,
    },
    {
      id: "svc-workforce",
      title: "Workforce Solutions",
      icon: "layers",
      image: "service-workforce",
      summary: "Planning support for teams that need to grow, restructure or scale for projects.",
      description:
        "Workforce needs change with projects, seasons and growth plans. We help you think through team structure and staffing requirements so you can plan hiring with greater confidence.",
      benefits: ["Workforce requirement mapping", "Team structure discussions", "Project-based planning", "Flexible engagement"],
      featured: true,
    },
    {
      id: "svc-hr",
      title: "Human Resource Support",
      icon: "users",
      image: "service-hr",
      summary: "Practical HR assistance around hiring processes and employee onboarding.",
      description:
        "Smaller and growing organisations often need dependable HR help without a large in-house team. We offer support around recruitment workflows, documentation coordination and onboarding.",
      benefits: ["Hiring process support", "Onboarding coordination", "Documentation assistance", "People-focused guidance"],
      featured: true,
    },
    {
      id: "svc-staffing",
      title: "Staffing Solutions",
      icon: "briefcase",
      image: "service-staffing",
      summary: "Support for permanent, contract and temporary staffing requirements.",
      description:
        "Whether you need permanent team members or contract professionals for a defined period, we help identify suitable people and coordinate the process from requirement to joining.",
      benefits: ["Permanent staffing", "Contract & temporary staffing", "Requirement-to-joining coordination", "Ongoing communication"],
      featured: true,
    },
    {
      id: "svc-careers",
      title: "Career Opportunities",
      icon: "graduation",
      image: "service-careers",
      summary: "Helping job seekers discover roles that suit their skills and aspirations.",
      description:
        "For candidates, we aim to be a supportive point of contact — understanding your experience and goals, and connecting you with relevant openings as they become available.",
      benefits: ["Profile understanding", "Relevant role matching", "Interview preparation guidance", "Transparent updates"],
      featured: false,
    },
    {
      id: "svc-consultancy",
      title: "Employment Consultancy",
      icon: "compass",
      image: "service-consultancy",
      summary: "Advisory conversations on hiring strategy and employment-related decisions.",
      description:
        "We offer consultative discussions to help organisations think through hiring priorities, role design and recruitment approaches suited to their stage and sector.",
      benefits: ["Hiring strategy discussions", "Role design input", "Recruitment approach advice", "Tailored recommendations"],
      featured: false,
    },
  ],
  approach: [
    {
      id: "ap-1",
      order: 1,
      title: "Understanding Business Requirements",
      homeTitle: "Understand Requirements",
      description:
        "We begin by listening. We learn about your organisation, the role, the team it supports and the outcomes you are looking for.",
      points: ["Discovery conversation", "Role and skill mapping", "Culture and team context"],
      icon: "message",
      showOnHome: true,
    },
    {
      id: "ap-2",
      order: 2,
      title: "Talent Identification",
      homeTitle: "Identify Suitable Talent",
      description:
        "Using the brief, we search for and identify people whose experience, skills and aspirations align with the requirement.",
      points: ["Targeted sourcing", "Initial profile screening", "Alignment with brief"],
      icon: "user-search",
      showOnHome: true,
    },
    {
      id: "ap-3",
      order: 3,
      title: "Candidate Evaluation",
      homeTitle: "Connect & Evaluate",
      description:
        "Shortlisted candidates are evaluated through structured conversations so that both sides can make informed decisions.",
      points: ["Structured discussions", "Skill and fit assessment", "Considered shortlist"],
      icon: "target",
      showOnHome: true,
    },
    {
      id: "ap-4",
      order: 4,
      title: "Professional Coordination",
      homeTitle: "Coordinate the Process",
      description:
        "We coordinate interviews, feedback and next steps, keeping communication clear and timely for everyone involved.",
      points: ["Interview scheduling", "Feedback loops", "Offer-stage coordination"],
      icon: "calendar",
      showOnHome: false,
    },
    {
      id: "ap-5",
      order: 5,
      title: "Relationship Management",
      homeTitle: "Build Professional Relationships",
      description:
        "Our engagement continues beyond a placement. We stay in touch to understand how things are going and to support future needs.",
      points: ["Post-joining check-ins", "Long-term partnership", "Continuous improvement"],
      icon: "handshake",
      showOnHome: true,
    },
  ],
  partners: [
    {
      id: "p-1",
      name: "Manisha Madhukar Bidikar",
      designation: "Designated Partner",
      bio: "Designated Partner of SAGEVIK LLP, contributing to the firm's direction and its people-first approach to employment activities.",
      order: 1,
    },
    {
      id: "p-2",
      name: "Jitendra Chauhan",
      designation: "Designated Partner",
      bio: "Designated Partner of SAGEVIK LLP, contributing to the firm's direction and its commitment to transparent, relationship-led work.",
      order: 2,
    },
  ],
  careers: {
    intro:
      "Whether you are exploring your next role or looking to share your profile for future opportunities, we would be glad to hear from you.",
    applyNote:
      "Submitted resumes are reviewed against current and upcoming requirements. We will reach out when there is a suitable match.",
  },
  perks: [
    { id: "pk-1", title: "Thoughtful Matching", description: "We take time to understand your experience and what you want next.", icon: "target" },
    { id: "pk-2", title: "Transparent Updates", description: "Clear communication about where your application stands.", icon: "message" },
    { id: "pk-3", title: "Respectful Process", description: "Your information is handled with care and discretion.", icon: "shield" },
    { id: "pk-4", title: "Growth Focused", description: "We look for roles that support your long-term career path.", icon: "trending" },
  ],
  jobs: [
    {
      id: "job-1",
      title: "HR Recruitment Executive",
      department: "Human Resources",
      type: "Full-time",
      location: "Pune, Maharashtra",
      experience: "1–3 years",
      summary: "Support end-to-end recruitment activities including sourcing, screening and interview coordination.",
      responsibilities: ["Source candidates through job portals and networks", "Conduct initial screening calls", "Coordinate interviews and feedback", "Maintain candidate records"],
      requirements: ["Graduate in any discipline (HR preferred)", "Good communication in English and Hindi/Marathi", "Familiarity with job portals", "Organised and detail-oriented"],
      status: "Open",
      postedOn: "2026-11-02",
    },
    {
      id: "job-2",
      title: "Talent Acquisition Associate",
      department: "Recruitment",
      type: "Full-time",
      location: "Pune (Dhanori)",
      experience: "0–2 years",
      summary: "Assist the team in identifying, engaging and shortlisting candidates for client requirements.",
      responsibilities: ["Search and shortlist profiles", "Engage candidates professionally", "Update trackers", "Support offer-stage coordination"],
      requirements: ["Graduate in any discipline", "Strong interpersonal skills", "Basic MS Office / Google Sheets", "Willingness to learn"],
      status: "Open",
      postedOn: "2026-11-08",
    },
    {
      id: "job-3",
      title: "Client Relationship Coordinator",
      department: "Business Development",
      type: "Full-time",
      location: "Pune, Maharashtra",
      experience: "2–4 years",
      summary: "Act as a point of contact for organisations, understanding requirements and coordinating delivery.",
      responsibilities: ["Understand client hiring needs", "Coordinate with recruitment team", "Share regular updates", "Build long-term relationships"],
      requirements: ["Experience in client servicing or staffing", "Excellent communication", "Professional presentation", "Problem-solving mindset"],
      status: "Open",
      postedOn: "2026-11-12",
    },
    {
      id: "job-4",
      title: "HR Operations Intern",
      department: "Human Resources",
      type: "Internship",
      location: "Pune (Hybrid)",
      experience: "Freshers",
      summary: "A learning opportunity across recruitment support, documentation and onboarding coordination.",
      responsibilities: ["Assist with documentation", "Support onboarding tasks", "Maintain HR records", "Help with candidate communication"],
      requirements: ["Pursuing or completed graduation / MBA-HR", "Good written communication", "Eagerness to learn", "Basic computer skills"],
      status: "Open",
      postedOn: "2026-11-15",
    },
  ],
  enquiries: [
    {
      id: "enq-sample-1",
      name: "Sample: Rohan Deshpande",
      email: "rohan.sample@example.com",
      mobile: "9800000001",
      company: "Sample Manufacturing Co.",
      subject: "Business / Hiring Enquiry",
      message: "This is a sample enquiry to demonstrate the admin panel. We are looking to hire two production supervisors.",
      fileName: "",
      fileSize: 0,
      fileType: "",
      source: "Contact Page",
      status: "New",
      createdAt: "2026-11-18T10:24:00.000Z",
      sample: true,
    },
    {
      id: "enq-sample-2",
      name: "Sample: Priya Kulkarni",
      email: "priya.sample@example.com",
      mobile: "9800000002",
      company: "",
      subject: "Career / Job Seeker",
      message: "Sample enquiry: I would like to know about HR roles available in Pune.",
      fileName: "Priya_Kulkarni_Resume.pdf",
      fileSize: 248000,
      fileType: "application/pdf",
      source: "Quick Enquiry",
      status: "In Progress",
      createdAt: "2026-11-19T15:05:00.000Z",
      sample: true,
    },
  ],
  applications: [
    {
      id: "app-sample-1",
      name: "Sample: Aditya Patil",
      email: "aditya.sample@example.com",
      mobile: "9800000003",
      position: "HR Recruitment Executive",
      experience: "2 years",
      coverNote: "Sample application created to demonstrate resume submission management.",
      fileName: "Aditya_Patil_CV.docx",
      fileSize: 182000,
      fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      status: "Under Review",
      createdAt: "2026-11-17T09:40:00.000Z",
      sample: true,
    },
    {
      id: "app-sample-2",
      name: "Sample: Sneha Joshi",
      email: "sneha.sample@example.com",
      mobile: "9800000004",
      position: "General Application",
      experience: "Fresher",
      coverNote: "Sample general resume submission.",
      fileName: "Sneha_Joshi_Resume.pdf",
      fileSize: 310000,
      fileType: "application/pdf",
      status: "Received",
      createdAt: "2026-11-19T12:12:00.000Z",
      sample: true,
    },
  ],
  gallery: [
    { id: "g-1", title: "Home hero", image: "hero-office", category: "Home", alt: "Indian professionals talking in a modern Pune office at sunset" },
    { id: "g-2", title: "Boardroom discussion", image: "about-boardroom", category: "About", alt: "Team meeting in a boardroom" },
    { id: "g-3", title: "Office interior", image: "about-workspace", category: "About", alt: "Modern office lobby" },
    { id: "g-4", title: "Recruitment", image: "service-recruitment", category: "Services", alt: "Recruiter shaking hands with a candidate" },
    { id: "g-5", title: "Workforce planning", image: "service-workforce", category: "Services", alt: "Manager explaining an organisation chart" },
    { id: "g-6", title: "HR support", image: "service-hr", category: "Services", alt: "HR professional reviewing documents with an employee" },
    { id: "g-7", title: "Staffing", image: "service-staffing", category: "Services", alt: "Professionals walking in a corporate corridor" },
    { id: "g-8", title: "Career guidance", image: "service-careers", category: "Services", alt: "Mentor guiding a graduate" },
    { id: "g-9", title: "Consultancy", image: "service-consultancy", category: "Services", alt: "Consultant advising a business owner" },
    { id: "g-10", title: "Listening to requirements", image: "approach-listening", category: "Approach", alt: "Consultant taking notes in a meeting" },
    { id: "g-11", title: "Candidate evaluation", image: "approach-evaluation", category: "Approach", alt: "Interview panel evaluating a candidate" },
    { id: "g-12", title: "Collaborative team", image: "careers-team", category: "Careers", alt: "Young professionals collaborating around laptops" },
    { id: "g-13", title: "Candidate with resume", image: "careers-candidate", category: "Careers", alt: "Job seeker reviewing her resume" },
    { id: "g-14", title: "Reception", image: "contact-reception", category: "Contact", alt: "Receptionist greeting a visitor" },
  ],
  banners: [
    {
      id: "b-home",
      page: "home",
      eyebrow: "Employment Activities · Pune",
      title: "Connecting the right people with the right opportunities.",
      subtitle:
        "SAGEVIK LLP supports organisations and professionals with a thoughtful, people-first approach to recruitment and workforce solutions.",
    },
    { id: "b-about", page: "about", eyebrow: "About Us", title: "A people-first employment partner from Pune.", subtitle: "Built on integrity, transparency and lasting professional relationships." },
    { id: "b-services", page: "services", eyebrow: "Our Services", title: "Employment services shaped around your needs.", subtitle: "From recruitment to workforce planning — support designed for organisations and candidates." },
    { id: "b-approach", page: "approach", eyebrow: "Our Approach", title: "A considered process, from first conversation to lasting partnership.", subtitle: "Five clear stages that keep people, quality and communication at the centre." },
    { id: "b-careers", page: "careers", eyebrow: "Careers", title: "Find a role that fits where you want to go.", subtitle: "Explore current openings or share your resume for future opportunities." },
    { id: "b-contact", page: "contact", eyebrow: "Contact Us", title: "Let's start a conversation.", subtitle: "Share your requirement or enquiry and we'll get back to you." },
  ],
  footer: {
    about:
      "SAGEVIK LLP is a Limited Liability Partnership engaged in employment activities, registered with ROC Pune. We connect organisations with suitable talent through a transparent, people-first approach.",
    copyright: "SAGEVIK LLP. All rights reserved.",
    showAddress: true,
  },
  socials: [
    { id: "s-1", platform: "LinkedIn", url: "", enabled: false },
    { id: "s-2", platform: "Instagram", url: "", enabled: false },
    { id: "s-3", platform: "Facebook", url: "", enabled: false },
  ],
  settings: {
    siteTitle: "SAGEVIK LLP",
    showFloatingButtons: true,
    showQuickEnquiry: true,
    whatsappMessage: "Hello SAGEVIK LLP, I would like to know more about your services.",
    showTopBar: true,
    announcement: "",
  },
};

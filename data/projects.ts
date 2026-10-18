import { en, type Localized } from "@/i18n/localized";

export type AppAppearance = "light" | "dark";
export type PhoneDevice = "android" | "iphone";
export type ProjectScreenId = "home" | "equipment" | "tasks" | "records" | "more" | "about";

export interface ProjectScreen {
  id: ProjectScreenId;
  title: Localized<string>;
  description: Localized<string>;
  light: string;
  dark: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: Localized<string>;
  summary: Localized<string>;
  category: Localized<string>;
  status: "in-development" | "completed";
  platform: string;
  version: string;
  previewUrl: string;
  story: {
    motivation: Localized<string[]>;
    vision: Localized<string>;
    development: Localized<string>;
  };
  modalities: string[];
  capabilities: { title: Localized<string>; description: Localized<string> }[];
  screens: ProjectScreen[];
}

const asset = (name: string, appearance: AppAppearance) =>
  `/assets/projects/radpulse-africa/${name}-${appearance}.webp`;

export const projects: Project[] = [
  {
    slug: "radpulse-africa",
    title: "RadPulse Africa",
    tagline: en("The beat of diagnosis, quality and safety."),
    summary: en("A digital quality-control notebook for medical physicists and radiographers, bringing diagnostic imaging equipment checks, records, and reporting together on a phone."),
    category: en("Healthcare technology"),
    status: "in-development",
    platform: "Android",
    version: "1.0.0",
    previewUrl: "https://expo.dev/accounts/ikacquahs-team/projects/radpulse-africa/builds/b3bf204d-5bd1-4c1e-ad3c-506147da6829",
    story: {
      motivation: en([
        "Quality control does not end with a measurement. Medical physicists and radiographers also need to document readings, interpret results, maintain equipment histories, and prepare reports, often across different healthcare facilities.",
        "Drawing on his practical experience in medical physics, Dr Isaac Kwesi Acquah developed RadPulse Africa to explore how mobile technology could make that work more organised, accessible, and efficient, particularly within African healthcare settings.",
      ]),
      vision: en("The aim is to support consistent quality-control practices, improve documentation, and help professionals monitor diagnostic imaging equipment performance over time."),
      development: en("RadPulse Africa is at version 1.0.0 and remains in ongoing development. Functionality, usability, testing procedures, and reporting capabilities will continue to evolve through practical evaluation and feedback from medical physicists and radiographers."),
    },
    modalities: ["Radiography", "Fluoroscopy", "CT", "Mammography"],
    capabilities: [
      { title: en("Guided QC testing"), description: en("Follow structured procedures, record measurements, and refer to acceptance limits for diagnostic imaging equipment.") },
      { title: en("Automatic result evaluation"), description: en("Assess entered measurements automatically, with practical next steps to help interpret the result.") },
      { title: en("Hospitals & equipment"), description: en("Keep equipment inventories and historical QC records organised for the different healthcare facilities you visit.") },
      { title: en("Reports that travel"), description: en("Export and share QC records as PDF, Excel, or CSV reports, extending the notebook into your reporting workflow.") },
      { title: en("Instrument management"), description: en("Maintain an inventory of QC instruments and keep track of their calibration dates.") },
      { title: en("Checks & reminders"), description: en("Plan periodic equipment checks and manage reminders for future quality-control work.") },
    ],
    screens: [
      { id: "home", title: en("Your QC notebook"), description: en("A starting point for equipment checks, saved drafts, completed tests, and upcoming work."), light: asset("home", "light"), dark: asset("home", "dark") },
      { id: "equipment", title: en("Imaging systems"), description: en("Keep equipment identities, service status, and QC histories together, organised by hospital and imaging modality."), light: asset("equipment", "light"), dark: asset("equipment", "dark") },
      { id: "tasks", title: en("QC tasks"), description: en("Plan equipment checks and find the scheduled work and reminders saved on your device."), light: asset("tasks", "light"), dark: asset("tasks", "dark") },
      { id: "records", title: en("A record of every visit"), description: en("Find hospital visits, equipment checks, drafts, and completed test results in one QC history."), light: asset("records", "light"), dark: asset("records", "dark") },
      { id: "more", title: en("Tools for the work"), description: en("Reach QC procedures, hospital records, exports, instrument inventories, schedules, and settings."), light: asset("more", "light"), dark: asset("more", "dark") },
      { id: "about", title: en("The person behind RadPulse"), description: en("Created by Dr Isaac Kwesi Acquah, a medical physicist and lecturer turning professional experience into a digital QC notebook."), light: asset("creator", "light"), dark: asset("creator", "dark") },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function creatorScreen(appearance: AppAppearance): string {
  return asset("creator", appearance);
}

import type { Localized } from "@/i18n/localized";

export interface Image {
  /** Path relative to `/public`, e.g. `/assets/imgs/portrait.jpg`. */
  src: string;
  alt: Localized<string>;
  width: number;
  height: number;
}

export interface Link {
  label: Localized<string>;
  href: string;
  external?: boolean;
}

/** A primary navigation entry; the label comes from the `Nav` messages. */
export interface NavItem {
  key: "about" | "research" | "projects" | "publications" | "services" | "contact" | "blog";
  /** Locale-aware pathname. Homepage acts also carry a `hash`. */
  pathname: "/" | "/projects" | "/publications" | "/blog";
  hash?: string;
  /** Hidden until the destination route ships. */
  enabled: boolean;
}

export interface Appointment {
  role: Localized<string>;
  institution: Localized<string>;
  unit?: Localized<string>;
}

export interface Professor {
  honorific: string;
  fullName: string;
  /** Wordmark form of the name. */
  shortName: string;
  initials: string;
  title: Localized<string>;
  roles: Localized<string[]>;
  current: Appointment;
  former: Appointment[];
  location: Localized<string>;
  countryCode: string;
  values: Localized<string[]>;
  shortBio: Localized<string>;
  portrait: Image;
  /** Public professional contact address. */
  email?: string;
  cv: { href: string; fileName: string; placeholder: boolean };
  /** Academic profile links; empty until personal URLs are supplied. */
  links: Link[];
}

export interface ResearchArea {
  title: Localized<string>;
  /** Unique lowercase kebab-case identifier, also used for future routes. */
  slug: string;
  description: Localized<string>;
  tags: Localized<string[]>;
  longDescription?: Localized<string>;
  image?: Image;
}

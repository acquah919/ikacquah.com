import type { NavItem } from "@/types/content";

export const sectionIds = {
  about: "about",
  research: "research",
  impact: "impact",
  teaching: "teaching",
  services: "services",
  perspective: "perspective",
  connect: "connect",
} as const;

// Owner-specified order. Until a route ships, an item points at the homepage
// act that covers it; `enabled: false` hides an item whose destination does
// not exist yet rather than linking to a missing page.
export const primaryNavigation: NavItem[] = [
  { key: "about", pathname: "/", hash: sectionIds.about, enabled: true },
  { key: "research", pathname: "/", hash: sectionIds.research, enabled: true },
  { key: "services", pathname: "/", hash: sectionIds.services, enabled: true },
  { key: "contact", pathname: "/", hash: sectionIds.connect, enabled: true },
  { key: "publications", pathname: "/publications", enabled: true },
  { key: "blog", pathname: "/blog", enabled: true },
];

export const visibleNavigation = primaryNavigation.filter(item => item.enabled);

export function navHref(item: NavItem) {
  return item.hash
    ? { pathname: item.pathname, hash: item.hash }
    : { pathname: item.pathname };
}

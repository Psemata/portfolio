// Configuration array for navigation items
export const PORTFOLIO_NAV = [
  {
    label: "Myself", // Display label for the navigation item
    value: "myself" as const, // Unique value associated with the navigation item
    href: "/portfolio#myself", // URL or path to navigate to when the item is clicked
    face: 0,
  },
  {
    label: "Path",
    value: "path" as const,
    href: "/portfolio#path",
    face: 1,
  },
  {
    label: "Passions",
    value: "passions" as const,
    href: "/portfolio#passions",
    face: 2,
  },
  {
    label: "Projects",
    value: "projects" as const,
    href: "/portfolio#projects",
    face: 3,
  },
  {
    label: "Contacts",
    value: "contacts" as const,
    href: "/portfolio#contacts",
    face: 4,
  },
  {
    label: "Exploration",
    value: "Exploration" as const,
    href: "/",
    face: 5,
  },
];

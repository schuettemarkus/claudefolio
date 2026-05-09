export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  url?: string | null;
  repo?: string | null;
  status: 'live' | 'in-development' | 'archived';
  theme: {
    accent: string;
    accentSoft: string;
    bg: string;
    text: string;
    mood: 'electric' | 'warm' | 'clinical' | 'playful' | 'editorial';
  };
  screenshots: {
    desktop: string;
    mobile: string;
    desktopAlt?: string;
  };
};

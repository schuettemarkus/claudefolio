import { Project } from '@/data/types';

const LIGHT_FLASH_SLUGS = ['paddlerank-com', 'seed'];

export function isLightFlash(project: Project): boolean {
  return LIGHT_FLASH_SLUGS.includes(project.slug);
}

export function applyProjectTheme(project: Project) {
  const root = document.documentElement;
  const light = isLightFlash(project);

  root.style.setProperty('--accent', project.theme.accent);
  root.style.setProperty('--accent-soft', project.theme.accentSoft);
  root.style.setProperty('--foreground', project.theme.text);

  if (light) {
    root.style.setProperty('--background', project.theme.bg);
    root.style.setProperty('--grain-opacity', '0.015');
  } else {
    root.style.setProperty('--background', '#0A0A0B');
    root.style.setProperty('--grain-opacity', '0.04');
  }
}

export function resetTheme() {
  const root = document.documentElement;
  root.style.setProperty('--background', '#0A0A0B');
  root.style.setProperty('--foreground', '#f5f7fa');
  root.style.setProperty('--accent', '#1f77d9');
  root.style.setProperty('--accent-soft', '#4a9eff');
  root.style.setProperty('--grain-opacity', '0.04');
}

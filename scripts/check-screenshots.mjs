import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');

const slugs = [
  'nbavault',
  'paddlerank-com',
  'beacon',
  'tn-tracker',
  'forge',
  'cookieiq',
  'holofolio',
  'grandtheftotto',
  'sidebet',
  'travelfire',
  'seed',
  'vibestack',
];

console.log('\\n📸 Screenshot Check\\n');

const missing = [];
const present = [];

for (const slug of slugs) {
  const desktop = path.join(screenshotsDir, slug, 'desktop.png');
  const mobile = path.join(screenshotsDir, slug, 'mobile.png');
  const hasDesktop = fs.existsSync(desktop);
  const hasMobile = fs.existsSync(mobile);

  if (hasDesktop && hasMobile) {
    present.push(slug);
  } else {
    const needs = [];
    if (!hasDesktop) needs.push('desktop.png');
    if (!hasMobile) needs.push('mobile.png');
    missing.push({ slug, needs });
  }
}

if (present.length > 0) {
  console.log(`✅ Have screenshots (${present.length}):`);
  present.forEach((s) => console.log(`   ${s}`));
}

if (missing.length > 0) {
  console.log(`\\n⚠️  Need screenshots (${missing.length}):`);
  missing.forEach((m) => console.log(`   ${m.slug} — missing: ${m.needs.join(', ')}`));
}

console.log(`\\nTotal: ${present.length}/${slugs.length} complete\\n`);

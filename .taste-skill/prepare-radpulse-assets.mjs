import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const source = 'C:/Users/morte/Downloads';
const destination = 'public/assets/projects/radpulse-africa';
const images = {
  'home-light': '201319', 'equipment-light': '201351', 'tasks-light': '201336',
  'records-light': '201404', 'more-light': '201100', 'about-light': '201122',
  'creator-light': '201150', 'home-dark': '213502', 'tasks-dark': '213513',
  'equipment-dark': '213525', 'records-dark': '213538', 'more-dark': '213612',
  'more-tools-dark': '213628', 'about-dark': '213641', 'creator-dark': '213653',
};
await mkdir(destination, { recursive: true });
for (const [name, time] of Object.entries(images)) {
  const input = path.join(source, `Screenshot_20261017_${time}_RadPulse Africa Preview.png`);
  const metadata = await sharp(input).metadata();
  const output = path.join(destination, `${name}.webp`);
  await sharp(input).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 86, effort: 5 }).toFile(output);
  console.log(`${name}: ${metadata.width}x${metadata.height}`);
}

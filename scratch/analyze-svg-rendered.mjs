import sharp from 'sharp';
import fs from 'fs';

async function analyze() {
  const p = 'scratch/logo-gace-from-svg.png';
  if (!fs.existsSync(p)) {
    console.error('File not found');
    return;
  }
  
  const meta = await sharp(p).metadata();
  console.log(`Metadata for SVG-rendered image:`);
  console.log(`  Width: ${meta.width}`);
  console.log(`  Height: ${meta.height}`);
  console.log(`  Format: ${meta.format}`);
  console.log(`  Channels: ${meta.channels}`);
  console.log(`  Has Alpha: ${meta.hasAlpha}`);
}

analyze();

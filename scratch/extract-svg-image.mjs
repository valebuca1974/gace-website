import fs from 'fs';
import path from 'path';

function extract() {
  const svgPath = 'public/logo-gace.svg';
  if (!fs.existsSync(svgPath)) {
    console.error('No SVG found');
    return;
  }

  console.log('Reading SVG...');
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  console.log('Searching for base64 image data...');
  // We match everything inside xlink:href="data:image/png;base64,...
  const match = svgContent.match(/xlink:href="data:image\/png;base64,([^"]+)"/);
  if (!match) {
    console.error('No base64 image found in SVG!');
    return;
  }

  let base64Data = match[1];
  console.log(`Found base64 data. Original length: ${base64Data.length} chars.`);

  // Clean the base64 string:
  // 1. Replace xml character reference &#10; with empty string
  base64Data = base64Data.replace(/&#10;/g, '');
  base64Data = base64Data.replace(/&#xd;/g, '');
  // 2. Remove all whitespace and newlines
  base64Data = base64Data.replace(/\s+/g, '');

  console.log(`Cleaned base64 data. Cleaned length: ${base64Data.length} chars. Converting to file...`);

  const buffer = Buffer.from(base64Data, 'base64');
  const outputPath = 'scratch/svg-embedded.png';
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully saved to ${outputPath}`);
}

extract();

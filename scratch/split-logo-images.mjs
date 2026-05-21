import sharp from 'sharp';
import fs from 'fs';

async function splitLogo() {
  const input = 'public/gace-trimmed.png';
  if (!fs.existsSync(input)) {
    console.error('Source gace-trimmed.png not found!');
    return;
  }

  try {
    console.log('Loading gace-trimmed.png...');
    const image = sharp(input);

    // Isotype rolls on the left: columns 9 to 381 (from inspect-image-layout.mjs)
    // We add a tiny safety margin and then use .trim() to get the perfect tight crop
    console.log('Extracting isotype rolls (Segment 1)...');
    const isotypeBuffer = await sharp(input)
      .extract({ left: 5, top: 0, width: 390, height: 423 })
      .trim()
      .png({ quality: 100 })
      .toBuffer();

    await sharp(isotypeBuffer).toFile('public/logo-isotype.png');
    console.log('Saved public/logo-isotype.png');

    // GACE typography on the right: columns 427 to 794 (from inspect-image-layout.mjs)
    console.log('Extracting GACE typography text (Segment 2)...');
    const textBuffer = await sharp(input)
      .extract({ left: 410, top: 0, width: 393, height: 423 })
      .trim()
      .png({ quality: 100 })
      .toBuffer();

    await sharp(textBuffer).toFile('public/logo-text.png');
    console.log('Saved public/logo-text.png');

    // Let's get metadata of the new cropped files
    const isotypeMeta = await sharp('public/logo-isotype.png').metadata();
    const textMeta = await sharp('public/logo-text.png').metadata();

    console.log(`\nNew Split Assets:`);
    console.log(`  logo-isotype.png: ${isotypeMeta.width}x${isotypeMeta.height}`);
    console.log(`  logo-text.png: ${textMeta.width}x${textMeta.height}`);

  } catch (err) {
    console.error('Error splitting logo images:', err.message);
  }
}

splitLogo();

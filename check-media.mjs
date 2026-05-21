import sharp from 'sharp';

async function checkMedia() {
  const files = [
    'C:/Users/dean valentin/.gemini/antigravity/brain/6a604d82-1425-4bd1-a32d-7c373d44cc84/media__1779135803496.jpg',
    'C:/Users/dean valentin/.gemini/antigravity/brain/6a604d82-1425-4bd1-a32d-7c373d44cc84/media__1779135836413.png'
  ];

  for (const file of files) {
    try {
      const metadata = await sharp(file).metadata();
      console.log(`File: ${file}`);
      console.log(`Format: ${metadata.format}`);
      console.log(`Width: ${metadata.width}, Height: ${metadata.height}`);
      console.log('---');
    } catch (err) {
      console.error(`Error reading ${file}:`, err.message);
    }
  }
}

checkMedia();

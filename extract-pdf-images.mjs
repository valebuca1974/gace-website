import * as mupdf from "mupdf";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pdfPath = join(__dirname, "CATÁLOGO GACE.pdf");
const outputDir = join(__dirname, "public");

console.log("Reading PDF:", pdfPath);
const data = readFileSync(pdfPath);

const doc = mupdf.Document.openDocument(data, "application/pdf");
const pageCount = doc.countPages();
console.log(`PDF has ${pageCount} pages`);

// Render each page at high resolution
const dpi = 200; // 200 DPI for good quality
const scale = dpi / 72; // PDF uses 72 DPI internally

for (let i = 0; i < pageCount; i++) {
  console.log(`Rendering page ${i + 1}...`);
  const page = doc.loadPage(i);
  
  // Get page bounds
  const bounds = page.getBounds();
  const width = Math.floor((bounds[2] - bounds[0]) * scale);
  const height = Math.floor((bounds[3] - bounds[1]) * scale);
  
  console.log(`  Dimensions: ${width}x${height}`);
  
  // Render to pixmap
  const pixmap = page.toPixmap(
    mupdf.Matrix.scale(scale, scale),
    mupdf.ColorSpace.DeviceRGB,
    false, // no alpha
    true   // annots
  );
  
  // Convert to PNG
  const pngData = pixmap.asPNG();
  const outputPath = join(outputDir, `catalog-page-${i + 1}.png`);
  writeFileSync(outputPath, pngData);
  console.log(`  Saved: catalog-page-${i + 1}.png (${(pngData.length / 1024).toFixed(0)} KB)`);
}

// Also extract embedded images
console.log("\nExtracting embedded images...");
for (let i = 0; i < pageCount; i++) {
  const page = doc.loadPage(i);
  const pageObj = page.getObject();
  
  // Try to find XObject images in the page resources
  try {
    const resources = pageObj.get("Resources");
    if (resources) {
      const xObjects = resources.get("XObject");
      if (xObjects) {
        const keys = [];
        xObjects.forEach((val, key) => {
          keys.push(key);
        });
        
        for (const key of keys) {
          const xObj = xObjects.get(key);
          if (xObj) {
            const subtype = xObj.get("Subtype");
            if (subtype && subtype.toString() === "/Image") {
              const w = xObj.get("Width");
              const h = xObj.get("Height");
              console.log(`  Page ${i+1}, Image "${key}": ${w}x${h}`);
              
              // Extract the image
              try {
                const image = doc.loadImage(xObj);
                const pixmap = image.toPixmap();
                const pngData = pixmap.asPNG();
                const outputPath = join(outputDir, `catalog-extracted-p${i+1}-${key}.png`);
                writeFileSync(outputPath, pngData);
                console.log(`    -> Saved: catalog-extracted-p${i+1}-${key}.png (${(pngData.length / 1024).toFixed(0)} KB)`);
              } catch (e) {
                console.log(`    -> Could not extract: ${e.message}`);
              }
            }
          }
        }
      }
    }
  } catch (e) {
    console.log(`  Page ${i+1}: Error reading resources: ${e.message}`);
  }
}

console.log("\nDone!");

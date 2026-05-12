import fs from 'fs';
import path from 'path';
import * as mupdf from 'mupdf';

const pdfPath = "C:/Users/dean valentin/Desktop/WEB FABRICA DE MALLA/CATÁLOGO GACE.pdf";
const outDir = "C:/Users/dean valentin/Desktop/WEB FABRICA DE MALLA/public/extracted_images";

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function extractImages() {
  try {
    const data = fs.readFileSync(pdfPath);
    const doc = mupdf.Document.openDocument(data, "application/pdf");
    const numPages = doc.countPages();
    
    let imgCount = 0;
    console.log(`Analyzing ${numPages} pages...`);

    for (let i = 0; i < numPages; i++) {
      const page = doc.loadPage(i);
      // Wait, mupdf JS API might not easily extract raw images from objects.
      // Let's just use the page.toPixmap() but we know that renders everything.
      console.log("Checking page " + i);
    }
    
    console.log("Done.");
  } catch (err) {
    console.error(err);
  }
}

extractImages();

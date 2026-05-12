import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function extractText() {
  const standardFontDataUrl = path.join(__dirname, 'node_modules/pdfjs-dist/standard_fonts/').replace(/\\/g, '/') + '/';
  
  const loadingTask = pdfjsLib.getDocument({
    url: path.join(__dirname, 'CATÁLOGO GACE.pdf'),
    standardFontDataUrl: standardFontDataUrl
  });
  
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  
  let fullText = "";
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += `\n--- PAGE ${i} ---\n${pageText}\n`;
  }
  
  fs.writeFileSync('catalog-text-dump.txt', fullText);
  console.log("Text dumped to catalog-text-dump.txt");
}

extractText().catch(console.error);

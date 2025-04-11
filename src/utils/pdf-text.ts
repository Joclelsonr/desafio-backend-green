import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractTextsFromPdf(filePath: string): Promise<string[]> {
  const fileData = await fs.readFile(filePath);
  const data = new Uint8Array(fileData);
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;

  const texts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
    texts.push(strings.join(" "));
  }
  return texts;
}

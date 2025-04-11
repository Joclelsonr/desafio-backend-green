import fs from "fs/promises";
import path from "path";
import { PDFDocument } from "pdf-lib";

export async function splitPDF(filePath: string, ids: number[]) {
  const pdfBytes = await fs.readFile(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const totalPages = pdfDoc.getPageCount();

  const outputDir = path.resolve(__dirname, "../uploads/split");
  await fs.mkdir(outputDir, { recursive: true });

  for (let i = 0; i < totalPages; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);

    const pdfBytes = await newPdf.save();
    const fileName = path.join(outputDir, `${ids[i]}.pdf`);

    await fs.writeFile(fileName, pdfBytes);
  }
}

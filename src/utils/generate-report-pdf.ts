import PDFDocument from "pdfkit";
import { Boleto } from "@prisma/client";

export async function generateReportPdf(boletos: Boleto[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const buffers: Buffer[] = [];

    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      const base64 = pdfBuffer.toString("base64");
      resolve(base64);
    });
    doc.on("error", (err) => reject(err));

    const startY = 80;
    let y = startY;
    const lineHeight = 20;

    doc.fontSize(18).text("Relatório de Boletos", { align: "center" });
    y += 30;

    doc.font("Helvetica-Bold");
    doc.fontSize(12).text(`ID`, 40, y);
    doc.text(`Nome Sacado`, 80, y);
    doc.text(`ID Lote`, 250, y);
    doc.text(`Valor`, 320, y);
    doc.text(`Linha Digitável`, 400, y);
    y += lineHeight;

    doc.moveTo(40, y).lineTo(550, y).stroke();
    y += 10;

    doc.font("Helvetica").fontSize(10);
    boletos.forEach((b) => {
      doc.text(`${b.id}`, 40, y);
      doc.text(`${b.nome_sacado}`, 80, y, { width: 160, ellipsis: true });
      doc.text(`${b.id_lote}`, 250, y);
      doc.text(`R$ ${b.valor.toFixed(2)}`, 320, y);
      doc.text(`${b.linha_digitavel}`, 400, y, { width: 150 });

      y += lineHeight;

      if (y > 750) {
        doc.addPage();
        y = startY;
      }
    });

    doc.end();
  });
}

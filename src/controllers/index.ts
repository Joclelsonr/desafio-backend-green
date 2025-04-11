import { Request, Response } from "express";
import { Service } from "../services";
import { parseCsv } from "../utils/csv-parser";
import { generateReportPdf } from "../utils/generate-report-pdf";

export class Controller {
  constructor(private service: Service) {}

  public bankSlip = async (req: Request, res: Response) => {
    const { name, value_start, value_end, id_lot, report, order } = req.query;

    try {
      const result = await this.service.getAllBankSlips(
        name as string,
        value_start as string,
        value_end as string,
        id_lot as string,
        order as "asc" | "desc" | undefined
      );

      if (report === "1") {
        const base64 = await generateReportPdf(result);
        // const pdfBuffer = await generateReportPdf(result);
        // res.setHeader("Content-Type", "application/pdf");
        // res.setHeader("Content-Disposition",'inline; filename="relatorio-boletos.pdf"');
        // res.send(pdfBuffer);
        res.status(200).json({ base64 });
      }

      res.status(200).json({ data: result });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public importCsv = async (req: Request, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const dataParser = await parseCsv(file.path);

      const result = await this.service.saveSlip(dataParser);

      res.status(200).json({ message: result });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public importPdf = async (req: Request, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const result = await this.service.splitPDFIntoPages(file.path);

      res.status(200).json({ message: result });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

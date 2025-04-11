import { Request, Response } from "express";
import { Service } from "../services";
import { parseCsv } from "../utils/csv-parser";

export class Controller {
  constructor(private service: Service) {}

  public bankSlip = async (req: Request, res: Response) => {
    console.log("request", await req.params);
    try {
      res.status(200).json({ message: "Bank Slip" });
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

import { Boleto } from "@prisma/client";
import { Prisma } from "../config/prisma";
import { splitPDF } from "../utils/split-pdf";
import { extractTextsFromPdf } from "../utils/pdf-text";

export class Service {
  constructor(private prisma: Prisma) {}

  public getAllBankSlips = async (
    name?: string,
    value_start?: string,
    value_end?: string,
    id_lot?: string,
    order?: "asc" | "desc"
  ) => {
    const slips = await this.prisma.boleto.findMany({
      where: {
        nome_sacado: { contains: name },
        valor: {
          gte: value_start ? Number(value_start) : undefined,
          lte: value_end ? Number(value_end) : undefined,
        },
        id_lote: { equals: id_lot ? Number(id_lot) : undefined },
      },
      orderBy: { id: order },
    });
    return slips;
  };

  public saveSlip = async (data: Boleto[]) => {
    for (const item of data) {
      const id = await this.getLotByUnit(item.unidade);
      await this.prisma.boleto.create({
        data: {
          id_lote: Number(id),
          nome_sacado: item.nome_sacado,
          valor: item.valor,
          linha_digitavel: item.linha_digitavel,
          unidade: item.unidade,
        },
      });
    }
    return "Data imported successfully";
  };

  public getLotByUnit = async (unit: string) => {
    const lot = await this.prisma.lote.findFirst({
      where: { nome: { endsWith: unit.padStart(4, "0") } },
    });
    return lot?.id;
  };

  public splitPDFIntoPages = async (filePath: string) => {
    const pdfTexts = await extractTextsFromPdf(filePath);

    const parsedSlips = this.parseSlipFromText(pdfTexts);

    const ids = await Promise.all(
      parsedSlips.map(async (slip) => {
        const query = await this.getSlipByName(slip.nome_sacado);
        return query?.id;
      })
    );

    splitPDF(filePath, ids as number[]);
    return "PDF imported successfully";
  };

  public getSlipByName = async (name: string) => {
    const slip = await this.prisma.boleto.findFirst({
      where: { nome_sacado: name },
    });
    return slip;
  };

  private parseSlipFromText = (text: string[]) => {
    return text.map((text, index) => {
      const nameMatch = text.match(/Nome:\s*(.+?)\s+Valor:/);
      const valueMatch = text.match(/Valor:\s*R\$ ([\d.,]+)/);
      const dueDate = text.match(/Vencimento:\s*([\d/]+)/);
      return {
        nome_sacado: nameMatch?.[1] || "",
        valor: valueMatch
          ? parseFloat(valueMatch[1].replace(".", "").replace(",", "."))
          : 0,
        vencimento: dueDate?.[1] || "",
        position: index + 1,
      };
    });
  };
}

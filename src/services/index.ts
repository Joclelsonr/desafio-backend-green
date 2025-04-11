import { Boleto } from "@prisma/client";
import { Prisma } from "../config/prisma";

export class Service {
  constructor(private prisma: Prisma) {}

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
}

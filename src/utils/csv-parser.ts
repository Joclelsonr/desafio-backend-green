import { parse } from "csv-parse";
import stripBomStream from "strip-bom-stream";
import fs from "fs";

import { Boleto } from "@prisma/client";

export function parseCsv(filePath: string): Promise<Boleto[]> {
  return new Promise((resolve, reject) => {
    const results: Partial<Boleto[]> = [];
    fs.createReadStream(filePath)
      .pipe(stripBomStream())
      .pipe(
        parse({
          delimiter: ";",
          columns: true,
          trim: true,
          skip_empty_lines: true,
          relax_column_count: true,
        })
      )
      .on("data", (row) => {
        const rowWithRenamedKey = { ...row, nome_sacado: row["nome"] };
        delete rowWithRenamedKey["nome"];
        results.push(rowWithRenamedKey);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(results as Boleto[]);
      })
      .on("error", (error) => {
        console.error("Error processing CSV file:", error);
        reject(error);
      });
  });
}

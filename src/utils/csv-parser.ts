import { parse } from "csv-parse";
import fs from "fs";

import { Boleto } from "@prisma/client";

export function parseCsv(filePath: string): Promise<Boleto[]> {
  return new Promise((resolve, reject) => {
    const results: Boleto[] = [];
    fs.createReadStream(filePath)
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
        results.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(results);
      })
      .on("error", (error) => {
        console.error("Error processing CSV file:", error);
        reject(error);
      });
  });
}

/*
  Warnings:

  - Added the required column `unidade` to the `Boleto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boleto" ADD COLUMN     "unidade" TEXT NOT NULL;

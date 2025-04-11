-- CreateTable
CREATE TABLE "Lote" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boleto" (
    "id" SERIAL NOT NULL,
    "nome_sacado" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "linha_digitavel" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_lote" INTEGER NOT NULL,

    CONSTRAINT "Boleto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Boleto" ADD CONSTRAINT "Boleto_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

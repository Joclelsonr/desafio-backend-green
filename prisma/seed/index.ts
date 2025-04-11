import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const seed1 = await prisma.lote.create({
    data: { nome: "0017" },
  });
  const seed2 = await prisma.lote.create({
    data: { nome: "0018" },
  });
  const seed3 = await prisma.lote.create({
    data: { nome: "0019" },
  });

  console.log("Database seeded", { seed1 }, { seed2 }, { seed3 });
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});

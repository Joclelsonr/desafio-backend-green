import { PrismaClient } from "@prisma/client";

export class Prisma extends PrismaClient {
  constructor() {
    super();
  }

  async connect() {
    await this.$connect();
  }
}

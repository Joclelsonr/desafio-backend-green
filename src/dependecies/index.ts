import { Controller } from "../controllers";
import { Service } from "../services";
import { Prisma } from "../config/prisma";

const prisma = new Prisma();
const service = new Service(prisma);
const controller = new Controller(service);

export default controller;

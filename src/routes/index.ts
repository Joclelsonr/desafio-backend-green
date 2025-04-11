import { Router } from "express";
import { upload } from "../config/multer";

import controller from "../dependecies";

const router = Router();

router.post("/import/csv", upload.single("file"), controller.importCsv);
router.post("/import/pdf", upload.single("file"), controller.importPdf);
router.get("/bank-slips", controller.bankSlip);

export default router;

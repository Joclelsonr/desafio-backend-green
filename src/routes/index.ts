import { Router } from "express";
import { upload } from "../config/multer";

import controller from "../dependecies";

const router = Router();

router.post("/import/csv", upload.single("file"), controller.importCsv);

export default router;

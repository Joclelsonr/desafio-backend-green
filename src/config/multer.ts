import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.originalname.split(".").pop()?.toLowerCase();
    let uploadPath = "";

    switch (fileType) {
      case "csv":
        fs.mkdirSync(path.join(__dirname, "../uploads/csv"), {
          recursive: true,
        });
        uploadPath = "../uploads/csv";
        break;
      case "pdf":
        fs.mkdirSync(path.join(__dirname, "../uploads/pdf"), {
          recursive: true,
        });
        uploadPath = "../uploads/pdf";
        break;
      default:
        fs.mkdirSync(path.join(__dirname), { recursive: true });
        uploadPath = "../uploads/others";
    }

    cb(null, path.join(__dirname, uploadPath));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

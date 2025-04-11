import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.originalname.split(".").pop()?.toLowerCase();
    let uploadPath = "";

    switch (fileType) {
      case "csv":
        uploadPath = "../uploads/csv";
        break;
      case "pdf":
        uploadPath = "../uploads/pdf";
        break;
      default:
        uploadPath = "../uploads/others";
    }

    cb(null, path.join(__dirname, uploadPath));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

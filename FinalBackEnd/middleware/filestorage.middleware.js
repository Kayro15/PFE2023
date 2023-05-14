const multer = require("multer");

const imageStorage = multer.memoryStorage();
const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Seules les images sont autorisées"));
    }
  },
});

const pdfStorage = multer.memoryStorage();
const pdfUpload = multer({
  storage: pdfStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Seuls les fichiers PDF sont autorisés"));
    }
  },
});

module.exports ={imageUpload , pdfUpload}
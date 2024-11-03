const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join("..", "public", "attach"));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + (Math.random() * 1000) + file.originalname;
        const ext = path.extname(file.originalname);

        const validFormats = [".zip", ".rar"];
        if (!validFormats.includes(ext)) return cb(new Error("Unsupported format"));

        cb(null, fileName + ext);
    },
});

const attachUploader = multer({
    storage,
    limits: {
        fileSize: 512 * 1024 * 1024
    },
});

module.exports = attachUploader;
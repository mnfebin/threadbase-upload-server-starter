import multer from "multer";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const uploadsDirectory = fileURLToPath(new URL("../uploads/", import.meta.url));
const extensionsByMimeType = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/gif", ".gif"],
  ["image/webp", ".webp"],
]);

const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename(req, file, callback) {
    const extension = extensionsByMimeType.get(file.mimetype);
    callback(null, `${randomUUID()}${extension}`);
  },
});

function fileFilter(req, file, callback) {
  callback(null, extensionsByMimeType.has(file.mimetype));
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;

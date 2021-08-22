const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

const multerMiddleware = upload.single("image");
module.exports = { upload, multerMiddleware };

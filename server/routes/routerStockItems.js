const router = require("express").Router();
const Controller = require("../controller/stockItemController");
const { multerMiddleware } = require("../middlewares/multer");
const { postImage } = require("../middlewares/uploadImage");
const validateImage = require("../middlewares/validateImage");
router.get("/validate-stock", Controller.validate);
router.get("/:id", Controller.findById);
router.delete("/:id", Controller.delete);
router.put(
  "/:id",
  multerMiddleware,
  validateImage,
  postImage,
  Controller.update
);
router.post("/", multerMiddleware, validateImage, postImage, Controller.create);
router.get("/", Controller.list);

module.exports = router;

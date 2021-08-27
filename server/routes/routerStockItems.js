const router = require("express").Router();
const Sale = require("../model/Sale");
const Controller = require("../controller/stockItemController");
const { multerMiddleware } = require("../middlewares/multer");
const { postImage } = require("../middlewares/uploadImage");
const validateImage = require("../middlewares/validateImage");
router.get("/:id", Controller.findById);
router.delete(
  "/:id",
  async (req, res, next) => {
    await Sale.deleteMany({ "items.item": req.params.id });
    next();
  },
  Controller.delete
);
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

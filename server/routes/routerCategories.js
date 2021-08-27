const router = require("express").Router();
const Sale = require("../model/Sale");
const StockItem = require("../model/StockItem");
const Controller = require("../controller/categoryController");
router.post("/", Controller.create);
router.get("/:id", Controller.getById);
router.put("/:id", Controller.update);
router.delete(
  "/:id",
  async (req, res, next) => {
    let response = await StockItem.find({ category: req.params.id });
    console.log(response);
    response.forEach(async (el) => {
      await Sale.deleteMany({ "items.item": el._id });
    });
    await StockItem.deleteMany({ category: req.params.id });
    next();
  },
  Controller.delete
);
router.get("/", Controller.getAll);
module.exports = router;

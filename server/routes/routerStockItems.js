const router = require("express").Router();
const Controller = require("../controller/stockItemController");
router.get("/:id", Controller.findById);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);
router.get("/", Controller.list);
router.post("/", Controller.create);

module.exports = router;

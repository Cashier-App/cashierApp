const router = require("express").Router();
const Controller = require("../controller/stockItemController");
router.get("/", Controller.list);
router.get("/:id", Controller.findById);
// router.post("/", Controller.register);

module.exports = router;

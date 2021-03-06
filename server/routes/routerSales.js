const router = require("express").Router();
const Controller = require("../controller/salesController");
router.get("/", Controller.getAll);
router.get("/:id", Controller.getById);
router.post("/", Controller.create);
module.exports = router;

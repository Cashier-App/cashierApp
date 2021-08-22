const router = require("express").Router();
const Controller = require("../controller/categoryController");
router.post("/", Controller.create);
router.get("/:id", Controller.getById);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);
router.get("/", Controller.getAll);
module.exports = router;

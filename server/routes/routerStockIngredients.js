const router = require("express").Router();
const Controller = require("../controller/ingredientsController");
router.get("/:id", Controller.getById);
router.delete("/:id", Controller.delete);
router.put("/:id", Controller.update);
router.post("/", Controller.create);
router.get("/", Controller.getAll);

module.exports = router;

const router = require("express").Router();
const Controller = require("../controller/userController");
router.post("/login", Controller.login);
router.post("/", Controller.register);

module.exports = router;

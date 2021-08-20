const router = require("express").Router();
const routerStockItems = require("./routerStockItems");
const routerStockIngredients = require("./routerStockIngredients");
const routerSales = require("./routerSales");
const routerCategories = require("./routerCategories");
const routerUser = require("./routerUser");

<<<<<<< HEAD
router.use("/StockItems", routerStockItems);
// router.use("/StockIngredients", StockIngredients);
=======
// router.use("/StockItems", routerStockItems);
router.use("/StockIngredients", routerStockIngredients);
>>>>>>> origin/tdd-stockIngredient
// router.use("/Sales", routerSales);
router.use("/Categories", routerCategories);
router.use("/User", routerUser);

module.exports = router;

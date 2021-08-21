const router = require("express").Router();
const routerStockItems = require("./routerStockItems");
const routerStockIngredients = require("./routerStockIngredients");
const routerSales = require("./routerSales");
const routerCategories = require("./routerCategories");
const routerUser = require("./routerUser");

router.use("/StockItems", routerStockItems);
router.use("/StockIngredients", routerStockIngredients);
router.use("/Sales", routerSales);
router.use("/Categories", routerCategories);
router.use("/User", routerUser);

module.exports = router;

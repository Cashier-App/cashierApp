const StockIngredient = require("../model/StockIngredient");
const Category = require("../model/Category");

const getMaxStock = async (category, recipes) => {
  let responseCategory = await Category.findOne({ _id: category });
  /* istanbul ignore next */
  if (responseCategory.name === "Food") {
    let allStock = recipes.map(async (recipe) => {
      let responseIngredient = await StockIngredient.findOne({
        _id: recipe.ingredient,
      });
      let stock = responseIngredient.total / recipe.qty;
      return stock;
    });
    await Promise.all(allStock).then((values) => {
      // console.log(values);
    });
    let maxStock = await allStock.sort((a, b) => a - b)[0];
    return Math.floor(maxStock);
  }
};

module.exports = { getMaxStock };

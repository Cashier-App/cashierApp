const StockItem = require("../model/StockItem");
const StockIngredient = require("../model/StockIngredient");
const Category = require("../model/Category");
const { getMaxStock } = require("../helpers/getStock");
class Controller {
  static async list(req, res, next) {
    try {
      const response = await StockItem.find({}).populate("category").populate("recipes.ingredient").lean();
      res.status(200).json(response);
    } catch (error) {
      /* istanbul ignore next */
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findById(req, res, next) {
    const id = req.params.id;
    try {
      let response = await StockItem.findOne({ _id: id }).populate("category").populate("recipes.ingredient");
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Stock Item not found" });
      }
    } catch (error) {
      /* istanbul ignore next */
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async create(req, res, next) {
    let { name, category, price, stock, imageUrl, recipes } = req.body;
    try {
      let responseCategory = await Category.findOne({ _id: category });
      /* istanbul ignore next */
      if (responseCategory.name === "Food") {
        let maxStock = await getMaxStock(category, recipes);
        if (stock > maxStock) {
          return res.status(400).json({
            message: `maximum stock for this item is ${maxStock} based on ingredients stock`,
          });
        }
      }
      let newStockItem = new StockItem({
        name,
        category,
        price,
        stock,
        imageUrl,
        recipes,
      });

      let saveStockItem = await newStockItem.save();
      let response = await StockItem.findOne({ _id: saveStockItem._id }).populate("category").populate("recipes.ingredient");
      return res.status(201).json(response);
    } catch (error) {
      /* istanbul ignore next */
      if (error.message !== undefined) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    const { stock, category, recipes } = req.body;
    console.log(req.body);
    let responseCategory;
    try {
      let responseById = await StockItem.findOne({ _id: id });
      /* istanbul ignore next */
      if (!category) {
        responseCategory = await Category.findOne({ _id: responseById.category._id });
      } else {
        responseCategory = await Category.findOne({ _id: category });
      }
      /* istanbul ignore next */
      if (stock && !recipes) {
        console.log(1111);
        if (responseCategory.name === "Food") {
          let maxStock;
          if (!category) {
            maxStock = await getMaxStock(responseById.category._id, responseById.recipes);
          } else {
            maxStock = await getMaxStock(category, responseById.recipes);
          }
          if (stock > maxStock) {
            return res.status(400).json({
              message: `maximum stock for this item is ${maxStock} based on ingredients stock`,
            });
          }
        }
      }
      /* istanbul ignore next */
      if (!stock && recipes) {
        console.log(2222);
        if (responseCategory.name === "Food") {
          let maxStock;
          if (!category) {
            maxStock = await getMaxStock(responseById.category._id, recipes);
          } else {
            maxStock = await getMaxStock(category, recipes);
          }
          if (responseById.stock > maxStock) {
            return res.status(400).json({
              message: `maximum stock for this item is ${maxStock} based on ingredients stock`,
            });
          }
        }
      }
      /* istanbul ignore next */
      if (!stock && !recipes) {
        console.log(33333);
        if (responseCategory.name === "Food") {
          let maxStock;
          if (!category) {
            maxStock = await getMaxStock(responseById.category._id, responseById.recipes);
          } else {
            maxStock = await getMaxStock(category, responseById.recipes);
          }
          if (responseById.stock > maxStock) {
            return res.status(400).json({
              message: `maximum stock for this item is ${maxStock} based on ingredients stock`,
            });
          }
        }
      }

      /* istanbul ignore next */
      if (stock && recipes) {
        console.log(4444);
        if (responseCategory.name === "Food") {
          let maxStock;
          if (!category) {
            maxStock = await getMaxStock(responseById.category._id, recipes);
          } else {
            maxStock = await getMaxStock(category, recipes);
          }
          if (stock > maxStock) {
            return res.status(400).json({
              message: `maximum stock for this item is ${maxStock} based on ingredients stock`,
            });
          }
        }
      }
      let response = await StockItem.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });
      let responseUpdated = await StockItem.findOne({ _id: id }).populate({ path: "category" }).populate({ path: "recipes.ingredient" });
      if (response) {
        res.status(200).json(responseUpdated);
      } else {
        res.status(404).json({ message: "Stock Item not found" });
      }
    } catch (error) {
      /* istanbul ignore next */
      if (error.message !== undefined) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async delete(req, res, next) {
    const id = req.params.id;
    try {
      let response = await StockItem.findOne({ _id: id });
      if (response) {
        response = await StockItem.deleteOne({ _id: id });
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Stock Item not found" });
      }
    } catch (error) {
      /* istanbul ignore next */
      if (error.message !== undefined) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = Controller;

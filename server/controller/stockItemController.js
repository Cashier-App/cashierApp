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
      let response = await StockItem.findOne({ _id: id });
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
    let { name, category, price, stock, imageUrl, recipes, ingredient, qty } = req.body;
    console.log(req.body, "reqbody create");
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

      let response = await newStockItem.save();
      console.log(response, "<<<< response create");
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
      let response = await StockItem.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Stock Item not found" });
      }
    } catch (error) {
      /* istanbul ignore next */
      if (error.message !== undefined) {
        /* istanbul ignore next */
        res.status(400).json({ message: error.message });
      } else {
        /* istanbul ignore next */
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

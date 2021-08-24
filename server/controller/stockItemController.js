const StockItem = require("../model/StockItem");
const StockIngredient = require("../model/StockIngredient");
const Category = require("../model/Category");
const { getMaxStock } = require("../helpers/getStock");
class Controller {
  static async list(req, res, next) {
    try {
      const response = await StockItem.find({})
        .populate("category")
        .populate("recipes.ingredient")
        .lean();
      res.status(200).json(response);
    } catch (error) {
      /* istanbul ignore next */
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async validate(req, res, next) {
    const updateAllItem = async (cb) => {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await StockItem.find({})
            .populate("category")
            .populate("recipes.ingredient")
            .lean();
          console.log(response, "<<<<<<<<");
          if (response.length === 0) {
            return resolve(response);
          }
          await response.forEach(async (currentItem) => {
            if (currentItem.category.name === "Food") {
              let maxStock = await getMaxStock(
                currentItem.category._id,
                currentItem.recipes
              );
              if (currentItem.stock > maxStock) {
                console.log(currentItem.stock, maxStock);
                response = await StockItem.findOneAndUpdate(
                  { _id: currentItem._id },
                  { stock: maxStock },
                  {
                    new: true,
                  }
                )
                  .populate("category")
                  .populate("recipes.ingredient")
                  .lean();
                return resolve(response);
              } else {
                return resolve(response);
              }
            }
          });
        } catch (err) {
          /* istanbul ignore next*/
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
    };
    let response = await updateAllItem();
    console.log(response);
    return res.status(200).json(response);
  }
  static async findById(req, res, next) {
    const id = req.params.id;
    try {
      let response = await StockItem.findOne({ _id: id })
        .populate("category")
        .populate("recipes.ingredient");
      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ message: "Stock Item not found" });
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
      let response = await StockItem.findOne({ _id: saveStockItem._id })
        .populate("category")
        .populate("recipes.ingredient");
      return res.status(201).json(response);
    } catch (error) {
      /* istanbul ignore else*/
      if (error.message !== undefined) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    let { stock, category, recipes } = req.body;
    let maxStock;
    try {
      let responseById = await StockItem.findOne({ _id: id });
      if (!category) {
        category = responseById.category._id;
      }
      if (!stock) {
        stock = responseById.stock;
      }
      if (!recipes) {
        recipes = responseById.recipes;
      }
      maxStock = await getMaxStock(category, recipes);
      if (stock > maxStock) {
        return res.status(400).json({
          message: `maximum stock for this item is ${maxStock} based on ingredients stock`,
        });
      } else {
        let response = await StockItem.findOneAndUpdate(
          { _id: id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
          // untuk populate
        );
        let responseUpdated = await StockItem.findOne({ _id: id })
          .populate({ path: "category" })
          .populate({ path: "recipes.ingredient" });
        /* istanbul ignore else*/
        if (response) {
          return res.status(200).json(responseUpdated);
        } else {
          return res.status(404).json({ message: "Stock Item not found" });
        }
      }
    } catch (error) {
      /* istanbul ignore else*/
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
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ message: "Stock Item not found" });
      }
    } catch (error) {
      /* istanbul ignore next*/
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;

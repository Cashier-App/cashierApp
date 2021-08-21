const StockItem = require("../model/StockItem");

class Controller {
  static async list(req, res, next) {
    try {
      const response = await StockItem.find({}).populate("category").populate("recipes.ingredient").lean();
      //   console.log(response);
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
    const { name, category, price, stock, imageUrl, recipes } = req.body;
    // console.log(req.body, 123123);
    try {
      let newStockItem = new StockItem({
        name,
        category,
        price,
        stock,
        imageUrl,
        recipes,
      });
      let response = await newStockItem.save();
      console.log(newStockItem);
      res.status(201).json(response);
    } catch (error) {
      console.log(error.message);
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
    try {
      let response = await StockItem.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });
      console.log(response, 9999);
      if (response) {
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

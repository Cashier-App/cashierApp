const StockIngredient = require("../model/StockIngredient");

class Controller {
  static async getAll(req, res) {
    try {
      let response = await StockIngredient.find();
      return res.status(200).json(response);
    } catch (err) {
      /* istanbul ignore next */
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getById(req, res) {
    const { id } = req.params;
    try {
      let response = await StockIngredient.findOne({ _id: id });
      if (response) return res.status(200).json(response);
      else
        return res.status(404).json({ message: "Stock Ingredient not found" });
    } catch (err) {
      /* istanbul ignore next */
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async create(req, res) {
    const { name, unit, total } = req.body;
    try {
      let response = await StockIngredient.findOne({ name });

      let newStockIngredient = new StockIngredient({
        name,
        unit,
        total,
      });
      response = await StockIngredient.create(newStockIngredient);
      return res.status(201).json(response);
    } catch (err) {
      /* istanbul ignore else */
      if (err.message !== undefined) {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  static async delete(req, res) {
    const { id } = req.params;
    try {
      let response = await StockIngredient.findOne({ _id: id });
      if (response) {
        response = await StockIngredient.deleteOne({ _id: id });
        res.status(200).json(response);
      } else {
        /* istanbul ignore next */
        return res.status(404).json({ message: "Stock Ingredient not found" });
      }
    } catch (err) {
      /* istanbul ignore next */
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async update(req, res) {
    const { id } = req.params;
    try {
      let response = await StockIngredient.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (response) return res.status(200).json(response);
      else
        return res.status(404).json({ message: "Stock Ingredient not found" });
    } catch (err) {
      /* istanbul ignore else */
      if (err.message !== undefined) {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = Controller;

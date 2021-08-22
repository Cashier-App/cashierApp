const Sale = require("../model/Sale");

class Controller {
  static async getAll(req, res) {
    try {
      let response = await Sale.find({}).populate({
        path: "items.item",
        populate: [{ path: "category" }, { path: "recipes.ingredient" }],
      });
      res.status(200).json(response);
    } catch (error) {
      /* istanbul ignore next */
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    const id = req.params.id;
    try {
      let response = await Sale.findOne({ _id: id }).populate("items.item", [
        "name",
      ]);
      if (response) {
        res.status(200).json(response);
        git;
      } else {
        res.status(404).json({ message: "Sale not found" });
      }
    } catch (error) {
      /* istanbul ignore next */
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async create(req, res, next) {
    let { items, payment } = req.body;
    try {
      let newSale = new Sale({
        items,
        payment,
      });
      let response = await newSale.save();
      res.status(201).json(response);
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

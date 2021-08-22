const Sale = require("../model/Sale");

class Controller {
  static async getAll(req, res) {
    try {
      let response = await Sale.find({}).populate({
        path: "items.item",
        populate: [{ path: "category" }, { path: "recipes.ingredient" }],
      });
      return res.status(200).json(response);
    } catch (error) {
      /* istanbul ignore next */
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getById(req, res) {
    const id = req.params.id;
    try {
      let response = await Sale.findOne({ _id: id }).populate("items.item");
      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ message: "Sale not found" });
      }
    } catch (error) {
      /* istanbul ignore next */
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async create(req, res, next) {
    let { items, payment, adminName } = req.body;
    let total = 0;
    try {
      let newSale = new Sale({
        items,
        payment,
        adminName,
        total,
      });
      let response = await newSale.save();
      let responsePopulated = await Sale.findOne({
        _id: response._id,
      }).populate({
        path: "items.item",
        populate: [{ path: "category" }, { path: "recipes.ingredient" }],
      });
      responsePopulated.items.forEach((item) => {
        total += item.item.price * item.qty;
        // console.log(total);
      });
      newSale.total = total;
      await newSale.save();
      responsePopulated = await Sale.findOne({
        _id: response._id,
      }).populate({
        path: "items.item",
        populate: [{ path: "category" }, { path: "recipes.ingredient" }],
      });
      console.log(responsePopulated);
      return res.status(201).json(responsePopulated);
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

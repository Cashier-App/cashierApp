const StockItem = require("../model/StockItem");

class Controller {
  static async list(req, res, next) {
    try {
      const response = await StockItem.find().toArray();
      console.log(response);
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
}

module.exports = Controller;

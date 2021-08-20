const Category = require("../model/Category");

class Controller {
  static async getAll(req, res) {
    try {
      let response = await Category.find();
      res.status(200).json(response);
    } catch (err) {
      /* istanbul ignore next */
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async create(req, res) {
    const { name } = req.body;
    try {
      let response = await Category.findOne({ name });
      if (!response) {
        let category = new Category({ name });
        response = await category.save();
        return res.status(201).json(response);
      } else return res.status(400).json({ message: "Category already exist" });
    } catch (err) {
      /* istanbul ignore next */
      if (err.errors !== undefined) {
        return res.status(400).json({ message: "name is required" });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async getById(req, res) {
    const { id } = req.params;
    try {
      let response = await Category.findOne({ _id: id });
      if (response) return res.status(200).json(response);
      else return res.status(404).json({ message: "Category not found" });
    } catch (err) {
      /* istanbul ignore next */
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    if (name) {
      try {
        let response = await Category.findOneAndUpdate(
          { _id: id },
          { name },
          {
            new: true,
          }
        );
        if (response) return res.status(200).json(response);
        else return res.status(404).json({ message: "Category not found" });
      } catch (err) {
        /* istanbul ignore next */
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      return res.status(400).json({ message: "name is required" });
    }
  }
  static async delete(req, res) {
    const { id } = req.params;
    try {
      let response = await Category.findOne({ _id: id });
      if (response) {
        response = await Category.deleteOne({ _id: id });
        return res.status(200).json(response);
      } else return res.status(404).json({ message: "Category not found" });
    } catch (err) {
      /* istanbul ignore next */
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Controller;

const mongoose = require("mongoose");
const StockItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String], //Array of apa?
    required: true,
  },
});

module.exports = StockItem = mongoose.model("stockItem", StockItemSchema);

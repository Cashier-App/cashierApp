const mongoose = require("mongoose");
const StockItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
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
    type: [], //Array of apa?
    required: true,
  },
});

module.exports = StockItem = mongoose.model("stockItem", StockItemSchema);

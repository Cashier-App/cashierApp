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
  recipes: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stockIngredient",
      },
      qty: Number,
    },
  ],
});

module.exports = StockItem = mongoose.model("stockItem", StockItemSchema);

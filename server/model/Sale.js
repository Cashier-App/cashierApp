const mongoose = require("mongoose");
const saleSchema = new mongoose.Schema({
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stockItem",
      },
      qty: Number,
    },
  ],
  payment: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  adminName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = StockIngredient = mongoose.model("sale", saleSchema);

const mongoose = require("mongoose");
const stockIngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    min: 0,
    required: true,
  },
});

module.exports = StockIngredient = mongoose.model(
  "stockIngredient",
  stockIngredientSchema
);

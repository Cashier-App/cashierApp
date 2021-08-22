const mongoose = require("mongoose");
const url = "";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/cashierFox", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    /* istanbul ignore next */
  } catch (err) {}
};

module.exports = connectDB;

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
  } catch (err) {
    /* istanbul ignore next */
    console.log(err.message);
  }
};

module.exports = connectDB;

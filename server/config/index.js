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
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    // to exit if there is error with failure
    process.exit(1);
  }
};

module.exports = connectDB;

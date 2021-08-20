const express = require("express");
const connectDB = require("./config");
const app = express();
const Router = require("./routes");
app.use(Router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// connectDB();

module.exports = app;

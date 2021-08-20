const express = require("express");
const connectDB = require("./config");
const app = express();
const Router = require("./routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Router);
connectDB();

module.exports = app;

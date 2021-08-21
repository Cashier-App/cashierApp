const axios = require("axios");
const API = axios.create({
  baseURL: "http://localhost:4001",
});

module.exports = { API };

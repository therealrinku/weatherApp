const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  DB_URL: process.env.DB_URL,
  API_KEY: process.env.API_KEY,
};

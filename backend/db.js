const pg = require("pg");
const configs = require("./config");

const db = new pg.Client(configs.DB_URL);

db.connect()
  .then(() => {
    console.log("connected to postgres successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;

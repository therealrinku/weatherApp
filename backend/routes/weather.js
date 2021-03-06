const { default: axios } = require("axios");
const db = require("../db");
const router = require("express").Router();
const configs = require("../config");
const jwt = require("jsonwebtoken");

const apiURL = "https://api.openweathermap.org/data/2.5/weather?";

router.get("/:cityName", verifyJWT, async (req, res) => {
  const data = await axios.get(apiURL + `q=${req.params.cityName}&appid=${configs.API_KEY}`).then((dta) => {
    return dta.data;
  });

  //saving queries to the database
  db.query(`INSERT INTO queries(queryTime,queryBy,queryData) 
  VALUES('${new Date()}','${req.user.email}','${JSON.stringify(data)}')`);

  res.send(data);
});

function verifyJWT(req, res, next) {
  //getting token from the header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) res.status(401).send("Invalid Token");

  jwt.verify(token, configs.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).status("No Access");
    req.user = user;
    next();
  });
}

module.exports = router;

const { default: axios } = require("axios");
const router = require("express").Router();
const configs = require("../config");
const jwt = require("jsonwebtoken");
const configs = require("../config");

const apiURL = "https://api.openweathermap.org/data/2.5/weather?";

function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) res.status(401).send("Invalid Token");

  jwt.verify(token, configs.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).status("No Access");
    req.user = user;
    next();
  });
}

router.get("/:cityName", verifyJWT, async (req, res) => {
  const data = await axios.get(apiURL + `q=${req.params.cityName}&appid=${configs.API_KEY}`).then((dta) => {
    return dta.data;
  });

  res.send(data);
});

module.exports = router;

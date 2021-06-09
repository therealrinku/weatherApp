const { default: axios } = require("axios");
const router = require("express").Router();
const configs = require("../config");

const apiURL = "https://api.openweathermap.org/data/2.5/weather?";

router.get("/:cityName", async (req, res) => {
  const data = await axios.get(apiURL + `q=${req.params.cityName}&appid=${configs.API_KEY}`).then((dta) => {
    return dta.data;
  });

  res.send(data);
});

module.exports = router;

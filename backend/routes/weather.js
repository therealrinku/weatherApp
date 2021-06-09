const { default: axios } = require("axios");

const router = require("express").Router();

//it's defintely not a good idea to keep apiKey here but due to lack of time , i was unable to store it in env
const apiKey = "d289ddb0716da059849493624687c4d5";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";

router.get("/:cityName", async (req, res) => {
  const data = await axios.get(apiURL + `q=${req.params.cityName}&appid=${apiKey}`).then((dta) => {
    return dta.data;
  });

  res.send(data);
});

module.exports = router;

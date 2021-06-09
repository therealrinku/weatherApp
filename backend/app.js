const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//routes import
const authRoute = require("./routes/auth");
const weather = require("./routes/weather");

//adding middleware
app.use("/auth", authRoute);
app.use("/weather", weather);

module.exports = app;

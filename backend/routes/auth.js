const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const configs = require("../config");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  db.query(`SELECT email,password FROM users WHERE email='${req.body.email}'`, (err, res1) => {
    if (res1.rows.length > 0) {
      const { email, password } = res1.rows[0];

      //validating password
      bcrypt.compare(req.body.password, password, (err, result) => {
        if (result) {
          //creating jwt if password matched
          const user = { email };
          const token = jwt.sign(user, configs.ACCESS_TOKEN_SECRET);

          res.status(200).send({ email, token });
        } else res.status(401).send("invalid password");
      });
    } else {
      res.status(401).send("invalid username");
    }
  });
});

router.post("/signup", (req, res) => {
  db.query(`SELECT email FROM users WHERE email='${req.body.email}'`, (err, res1) => {
    if (res1.rows.length <= 0) {
      //hashing password
      bcrypt.hash(req.body.password, 10, (err1, hashedPassword) => {
        if (!err) {
          db.query(
            `INSERT INTO users(email,password,joined_date)
            VALUES('${req.body.email}','${hashedPassword}','${new Date()}')`,
            (err2, res2) => {
              if (!err2) res.status(200).send("success");
              else throw err2;
            }
          );
        } else {
          res.status(404).send(err);
        }
      });
    } else {
      res.status(409).send("email already taken!");
    }
  });
});

module.exports = router;

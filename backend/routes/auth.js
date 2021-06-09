const router = require("express").Router();

router.post("/login", (req, res) => {
  db.query(`SELECT email,password FROM users WHERE email='${req.body.email}'`, (err, res1) => {
    if (res1.rows.length > 0) {
      const { email, password } = res1.rows[0];
      //jwt logic here

      /*
      bcrypt.compare(req.body.password, password, (err, result) => {
        if (result) res.send({ profile_image_url, uid, username, bio, email });
        else res.send("invalid password");
      });

      */
    } else {
      res.send("invalid username");
    }
  });
});

//signup user
router.post("/signup", (req, res) => {
  db.query(`SELECT email FROM users WHERE email='${req.body.email}'`, (err, res1) => {
    if (res1.rows.length <= 0) {
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

var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");
/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/register", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - Email and password required!",
    });
  }

  const queryUsers = req.db.from("users").select("*").where("email", "=", email);
  queryUsers.then(users => {
    if (users.length > 0) {
      res.status(400).json({
        error: true,
        message: "User already exists"
      });
      return
    }
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return req.db.from("users").insert({ email, hash })
  }).then(() => {
    res.status(201).json({
      error: false,
      message: "User created"
    })
  })
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password required"
    });
    return;
  }

  const queryUsers = req.db.from("users").select("email", "hash").where("email", "=", email).then(users => {
    if (users.length == 0) {
      res.status(401).json({
        error: true,
        message: "User doesn't exist"
      })
    }

    const user = users[0];
    return bcrypt.compare(password, user.hash);
  }).then(match => {
    if (!match) {
      res.status(401).json({
        error: true,
        message: "Passwords do not match"
      })
    }
    const secretKey = "secretkey"
    const expires_in = 60 * 60 * 24
    const exp = Date.now() + expires_in * 1000;
    const token = jwt.sign({ email, exp }, secretKey);
    // const token = jwt.sign({ email, exp }, process.env.JWT_SECRET, {
    //   expiresIn: "1h"
    // });
    res.json({ token_type: "Bearer", token, expires_in })
  });

})

//put in own file
const authorize = (req, res, next) => {
  const authorization = req.headers.authorization;
  let token = null;
  // console.log(authorization);
  if (authorization && authorization.split(" ").length === 2) {
    token = authorization.split(" ")[1];
    console.log("Token: ", token);
  } else {
    res.json({
      error: true,
      message: "No authorization token"
    })
  }
  try {
    const secretKey = "secretkey"
    const decoded = jwt.verify(token, secretKey)
    if (decoded.exp < Date.now()) {
      console.log("Token has expired");
      res.json({
        error: true,
        message: "Expired token"
      })
    }
    req.email = decoded.email;
    next();
  } catch (err) {
    res.json({
      error: true,
      message: "Token is not valid: ", error
    })
  }

}

// router.post("/city", authorize, function (req, res) {
//   res.json({ doSomething: req.email })
// })

module.exports = router;

var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require('morgan');

router.get("/", (req, res, next) => {
  const userId = req.body.userId;
  if (!userId) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - UserID is required!",
    });
  }

  const queryUsers = req.db.from("tasks").select("*").where("userId", "=", userId);
  queryUsers.then(tasks => {
    res.status(200).json({
      tasks
    }).catch((error) => {
      console.log("Unexpected error: ", error)
      res.status(500).json({
        error: true,
        message: "Unexpected error"
      })
    })
  });
});



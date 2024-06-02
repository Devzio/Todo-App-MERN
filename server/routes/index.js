var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Post User credentials for signup 
router.post("/register", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password required!",
    });
  }

  try {
    const users = req.db.from("users").select("*").where("username", "=", email);
    users.then(users => {
      if (users.length > 0) {
        res.status(400).json({
          error: true,
          message: "User already exists",
        });
        return
      }

      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds);
      return req.db.from("users").insert({ username: email, password: hash });
    }).then(() => {
      res.status(201).json({
        error: false,
        message: "User created",
      });
    })

  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
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

  req.db.from("users").select("username", "password").where("username", "=", email).then(users => {
    if (users.length == 0) {
      res.status(401).json({
        error: true,
        message: "User doesn't exist"
      });
    }

    const user = users[0];
    return bcrypt.compare(password, user.password).then(match => {
      if (!match) {
        res.status(401).json({
          error: true,
          message: "Passwords do not match"
        });
      }

      const secretKey = "secretkey";
      const expires_in = 60 * 60 * 24;
      const exp = Date.now() + expires_in * 1000;
      const token = jwt.sign({ email, exp }, secretKey);
      res.json({ token_type: "Bearer", token, expires_in });
    });
  });
});

// Add the authorize middleware function
const authorize = (req, res, next) => {
  const authorization = req.headers.authorization;
  let token = null;
  if (authorization && authorization.split(" ").length === 2) {
    token = authorization.split(" ")[1];
  } else {
    return res.status(401).json({
      error: true,
      message: "No authorization token provided"
    });
  }
  try {
    const secretKey = "secretkey"; // Ensure to use environment variables in production
    const decoded = jwt.verify(token, secretKey);
    if (decoded.exp < Date.now()) {
      return res.status(401).json({
        error: true,
        message: "Expired token"
      });
    }
    req.email = decoded.email;
    next();
  } catch (err) {
    res.status(401).json({
      error: true,
      message: "Invalid token",
      error: err
    });
  }
};

// Add the authorized GET API for retrieving users
router.get('/users', authorize, async (req, res) => {
  try {
    const users = await req.db.from('users').select('id', 'user'); // Exclude passwords from response
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Get API to get all tasks
router.get('/tasks', async (req, res) => {
  try {
    console.log('Get All Tasks');
    const tasks = await req.db.from('tasks').select('*');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get API to get only User's own Tasks
router.get('/tasks/:userId', async (req, res) => {
  try {
    console.log('Get User Tasks');
    const tasks = await req.db.from('tasks').select('id', 'userId', 'text', 'dueDate', 'completed').where({ "userId": req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST API to add a new task
router.post('/tasks', async (req, res) => {
  const { userId, text, dueDate, completed } = req.body;

  if (!userId || !text || !dueDate || completed === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [newTaskId] = await req.db('tasks').insert({
      userId,
      text,
      dueDate: new Date(dueDate), // Ensure dueDate is in proper date format
      completed: completed ? 1 : 0
    });

    const newTask = await req.db('tasks').select('*').where({ id: newTaskId }).first();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE API to delete a task
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await req.db('tasks').where({ id }).del();

    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT API to mark a task as completed or incomplete
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (completed === undefined) {
    return res.status(400).json({ error: 'Missing required field: completed' });
  }

  try {
    const result = await req.db('tasks').where({ id }).update({ completed: completed ? 1 : 0 });

    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

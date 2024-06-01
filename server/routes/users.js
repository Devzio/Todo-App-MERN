// server/routes/users.js

var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// GET users listing
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await req.db.from('users').select('*');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await req.db('users').insert({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update user info
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const user = await req.db('users').where({ id }).first();
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updatedUser = {
      username: username || user.username,
      password: password ? await bcrypt.hash(password, 10) : user.password
    };

    await req.db('users').where({ id }).update(updatedUser);
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE user
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await req.db('users').where({ id }).first();
    if (!user) return res.status(404).json({ error: 'User not found' });

    await req.db('users').where({ id }).del();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

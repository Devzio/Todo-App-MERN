// server/routes/tasks.js

var express = require('express');
var router = express.Router();
const authenticateToken = require('./authenticateToken');


router.get('/tasks', async (req, res) => {
  try {
    console.log('anythng');
    const tasks = await req.db.from('tasks').select('id');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Internal Serverrrr Error' });
  }
});


router.post('/', async (req, res) => {
  const { text, dueDate } = req.body;
  if (!text || !dueDate) return res.status(400).json({ error: 'Text and due date are required' });

  try {
    await req.db('tasks').insert({ userId: req.user.id, text, dueDate, completed: false });
    res.status(201).json({ message: 'Task created' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update a task
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { text, dueDate, completed } = req.body;

  try {
    const task = await req.db('tasks').where({ id, userId: req.user.id }).first();
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const updatedTask = {
      text: text || task.text,
      dueDate: dueDate || task.dueDate,
      completed: completed !== undefined ? completed : task.completed
    };

    await req.db('tasks').where({ id, userId: req.user.id }).update(updatedTask);
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a task
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await req.db('tasks').where({ id, userId: req.user.id }).first();
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await req.db('tasks').where({ id, userId: req.user.id }).del();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
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

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tasks', async (req, res) => {
  try {
    console.log('something');
    const tasks = await req.db.from('tasks').select('*');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/tasks/:userId', async (req, res) => {
  try {
    console.log('anythng');
    const tasks = await req.db.from('tasks').select('id', 'userId', 'text', 'dueDate', 'completed').where({ "userId": req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/tasks', async (req, res) => {
  const { taskName, dateDue } = req.body;
  if (!taskName || !dateDue) {
    console.log('Missing taskName or dateDue');
    return res.status(400).json({ error: 'taskName and due date are required' });
  }

  console.log('Received task:', { taskName, dateDue });

  try {
    await req.db('tasks').insert({ id, taskName, dateDue, userId, isDone });
    res.status(201).json({ message: 'Task created' });
  } catch (err) {
    console.error('Database insertion error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

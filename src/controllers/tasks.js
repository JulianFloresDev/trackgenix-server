import express from 'express';
import fs from 'fs';

const router = express.Router();

const tasks = require('../data/tasks.json');

router.get('/:taskName', (req, res) => {
  const { taskName } = req.params;
  const foundTask = tasks.filter((task) => task.taskName === taskName);
  if (foundTask.length > 0) {
    res.json({ success: true, msg: 'Task found successfully', data: foundTask });
  } else {
    res.status(400).json({ success: false });
  }
});

router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.status(200).json({ success: true, msg: 'Task found successfully', data: foundTask });
  } else {
    res.status(404).json({ success: false, msg: 'There is no task with this id' });
  }
});

router.post('/', (req, res) => {
  const task = req.body;
  const { taskName, description } = task;
  const ids = tasks.map((t) => t.id);
  const maxId = Math.max(...ids);
  const newTask = {
    id: maxId + 1,
    taskName,
    description,
  };

  if (!taskName && !description) {
    res.status(400).json({ success: false, msg: 'You must add name and description' });
  } else if (!taskName) {
    res.status(400).json({ success: false, msg: 'You must add a name' });
  } else {
    tasks.push(newTask);
  }

  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, msg: 'Task Created', data: newTask });
    }
  });
});

router.put('/', (req, res) => {
  const newTask = req.body;
  const taskExists = tasks.find((task) => task.id === newTask.id);
  const allTasks = tasks;
  allTasks.forEach((task, index) => {
    if (task.id === newTask.id) {
      allTasks[index] = newTask;
    }
  });
  if (!taskExists) {
    res.status(404).json({
      success: false,
      msg: `There is no task with this id (${newTask.id})`,
    });
    return;
  }
  if (!newTask.taskName) {
    res.status(400).json({
      success: false,
      msg: 'Task must have a name. ',
    });
    return;
  }
  fs.writeFile('./src/data/tasks.json', JSON.stringify(allTasks, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        success: false,
      });
      return;
    }
    res.status(200).json({
      success: true,
      msg: `Task ${newTask.id} modified successfully`,
      data: newTask,
    });
  });
});

router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTasks = tasks.find((task) => task.id === taskId);
  if (!foundTasks) {
    res.status(404).json({
      succes: false,
      msg: 'There is not task with this id',
      data: '',
    });
    return;
  }
  const filteredTasks = tasks.filter((task) => task.id !== taskId);
  fs.writeFile('src/data/tasks.json', JSON.stringify(filteredTasks, null, 2), (err) => {
    if (err) {
      res.status(400).json({
        succes: false,
      });
    } else {
      res.status(200).json({
        succes: true,
        msg: '',
      });
    }
  });
});

export default router;
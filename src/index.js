import express from 'express';

import adminsRouter from './resources/admins';
import superAdminsRouter from './resources/super-admins';
import projectsRouter from './resources/projects';
import tasksRouter from './resources/tasks';
import timeSheetsRouter from './resources/time-sheets';
import employeesRouter from './resources/employees';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use('/admins', adminsRouter);
app.use('/super-admins', superAdminsRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/time-sheets', timeSheetsRouter);
app.use('/employees', employeesRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

import express from 'express';
import mongoose from 'mongoose';

import adminsRouter from './controllers/admins';
import superAdminsRouter from './controllers/super-admins';
import projectsRouter from './controllers/projects';
import timeSheetsRouter from './controllers/timesheets';
import employeesRouter from './controllers/employees';
import router from './routes';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use('/admins', adminsRouter);
app.use('/super-admins', superAdminsRouter);
app.use('/projects', projectsRouter);
app.use('/time-sheets', timeSheetsRouter);
app.use('/employees', employeesRouter);

const MONGO_URL = 'mongodb+srv://grupo-a:QWrYuBY4E4MCAo1q@cluster0.ww0uoal.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log('Failed connection to database', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);

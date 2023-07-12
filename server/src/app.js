import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/index.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

app.use('/api', indexRoutes);
app.use('/api', tasksRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my API',
  });
});

export default app;

import express from 'express';
import apiRouter from './routes/api.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRouter);

app.use('/api/users', userRouter); 


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
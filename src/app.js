import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api.js';
import userRouter from './routes/userRoutes.js';
import serviceRouter from './routes/servicesRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);
app.use('/api/users', userRouter);
app.use('/api/service', serviceRouter);
app.use('/api/booking', bookingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
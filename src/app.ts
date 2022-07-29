import express from 'express';
import errorMiddleware from './utils/middlewares/error.middleware';
import 'express-async-errors';
import validationErrorMiddleware from './utils/middlewares/validationError.middleware';

const app = express();

app.use(express.json());

app.use(validationErrorMiddleware);
app.use(errorMiddleware);

export default app;

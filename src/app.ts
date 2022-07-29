import express from 'express';
import errorMiddleware from './utils/middlewares/error.middleware';
import 'express-async-errors';
import validationErrorMiddleware from './utils/middlewares/validationError.middleware';
import productRoutes from './routes/Product.routes';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);

app.use(validationErrorMiddleware);
app.use(errorMiddleware);

export default app;

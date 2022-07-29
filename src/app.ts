import express from 'express';
import 'express-async-errors';
import loginRoutes from './routes/Login.routes';
import productRoutes from './routes/Product.routes';
import userRoutes from './routes/User.routes';
import errorMiddleware from './utils/middlewares/error.middleware';
import validationErrorMiddleware from './utils/middlewares/validationError.middleware';

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use(validationErrorMiddleware);
app.use(errorMiddleware);

export default app;

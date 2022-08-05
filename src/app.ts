import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import loginRoutes from './routes/Login.routes';
import orderRoutes from './routes/Order.routes';
import productRoutes from './routes/Product.routes';
import userRoutes from './routes/User.routes';
import authErrorMiddleware from './utils/middlewares/authError.middleware';
import errorMiddleware from './utils/middlewares/error.middleware';
import validationErrorMiddleware from './utils/middlewares/validationError.middleware';
import swaggerSettingsBr from './swagger-br.json';
import swaggerSettingsEn from './swagger-en.json';

const app = express();

const options = {};

app.use(
  '/docs/br',
  swaggerUI.serveFiles(swaggerSettingsBr, options),
  swaggerUI.setup(swaggerSettingsBr),
);
app.use(
  '/docs/en',
  swaggerUI.serveFiles(swaggerSettingsEn, options),
  swaggerUI.setup(swaggerSettingsEn),
);

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

app.use(authErrorMiddleware);
app.use(validationErrorMiddleware);
app.use(errorMiddleware);

export default app;

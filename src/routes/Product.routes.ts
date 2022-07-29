import { Router } from 'express';
import 'express-async-errors';
import productController from '../msc';

const productRoutes = Router();

productRoutes.post('/', productController.register);

export default productRoutes;

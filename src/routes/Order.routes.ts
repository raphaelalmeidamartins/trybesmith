import { Router } from 'express';
import 'express-async-errors';
import { orderController } from '../msc';

const orderRoutes = Router();

orderRoutes.get('/', orderController.list);

export default orderRoutes;

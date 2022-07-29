import { Router } from 'express';
import 'express-async-errors';
import { userController } from '../msc';

const userRoutes = Router();

userRoutes.post('/', userController.register);

export default userRoutes;

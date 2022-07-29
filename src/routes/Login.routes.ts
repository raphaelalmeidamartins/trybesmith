import { Router } from 'express';
import 'express-async-errors';
import { userController } from '../msc';

const loginRoutes = Router();

loginRoutes.post('/', userController.login);

export default loginRoutes;

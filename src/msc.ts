import * as jwt from 'jsonwebtoken';
import OrderController from './controllers/Order.controller';
import ProductController from './controllers/Product.controller';
import UserController from './controllers/User.controller';
import connection from './models/connection';
import OrderModel from './models/Order.model';
import ProductModel from './models/Product.model';
import UserModel from './models/User.model';
import AuthService from './services/Auth.service';
import OrderService from './services/Order.service';
import ProductService from './services/Product.service';
import UserService from './services/User.service';

const authService = new AuthService(jwt);

const productModel = new ProductModel(connection);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

const userModel = new UserModel(connection);
const userService = new UserService(userModel, authService);
const userController = new UserController(userService);

const orderModel = new OrderModel(connection);
const orderService = new OrderService(orderModel, authService);
const orderController = new OrderController(orderService);

export {
  productController,
  userController,
  orderController,
};

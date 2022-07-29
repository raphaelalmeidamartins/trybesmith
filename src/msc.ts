import ProductController from './controllers/Product.controller';
import UserController from './controllers/User.controller';
import connection from './models/connection';
import ProductModel from './models/Product.model';
import UserModel from './models/User.model';
import ProductService from './services/Product.service';
import UserService from './services/User.service';

const productModel = new ProductModel(connection);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

const userModel = new UserModel(connection);
const userService = new UserService(userModel);
const userController = new UserController(userService);

export {
  productController,
  userController,
};

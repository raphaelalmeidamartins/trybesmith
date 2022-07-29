import ProductController from './controllers/Product.controller';
import connection from './models/connection';
import ProductModel from './models/Product.model';
import ProductService from './services/Product.service';

const productModel = new ProductModel(connection);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

export default productController;

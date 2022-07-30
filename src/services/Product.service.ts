import Joi from 'joi';
import ProductModel from '../models/Product.model';
import { Product, ProductReturned } from '../utils/types/Product.types';
import validator from '../utils/validator';

export default class ProductService {
  constructor(private model: ProductModel) {
    this.model = model;
  }

  public validate = {
    body: validator(
      Joi.object({
        name: Joi
          .string()
          .min(3)
          .required(),
        amount: Joi
          .string()
          .min(3)
          .required(),
      }),
    ),
  };

  public async register(data: Product): Promise<Product> {
    await this.validate.body(data);
    const product = await this.model.register(data);
    return product;
  }

  public async list(): Promise<ProductReturned[]> {
    const products = await this.model.list();
    return products;
  }
}

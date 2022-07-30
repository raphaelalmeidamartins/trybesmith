// import Joi from 'joi';
import OrderModel from '../models/Order.model';
import { OrderReturned } from '../utils/types/Order.types';
// import validator from '../utils/validator';

export default class OrderService {
  constructor(private model: OrderModel) {
    this.model = model;
  }

  // public validate = {
  //   body: validator(
  //     Joi.object({
  //       name: Joi
  //         .string()
  //         .min(3)
  //         .required(),
  //       amount: Joi
  //         .string()
  //         .min(3)
  //         .required(),
  //     }),
  //   ),
  // };

  // public async register(data: Product): Promise<Product> {
  //   await this.validate.body(data);
  //   const product = await this.model.register(data);
  //   return product;
  // }

  public async list(): Promise<OrderReturned[]> {
    const orders = await this.model.list();
    return orders;
  }
}

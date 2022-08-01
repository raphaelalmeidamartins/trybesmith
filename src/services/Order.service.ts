import Joi from 'joi';
import OrderModel from '../models/Order.model';
import { Order, OrderReturned } from '../utils/types/Order.types';
import validator from '../utils/validator';
import AuthService from './Auth.service';

const MAL_FORMED_ARRAY_MSG = '"productsIds" must include only numbers';

export default class OrderService {
  constructor(private model: OrderModel, private tokenService: AuthService) {
    this.model = model;
    this.tokenService = tokenService;
  }

  public validate = {
    body: validator(
      Joi.object({
        productsIds: Joi
          .array()
          .items(Joi.number().positive().integer())
          .min(1)
          .required()
          .messages({
            'array.empty': MAL_FORMED_ARRAY_MSG,
            'array.min': MAL_FORMED_ARRAY_MSG,
            'number.base': MAL_FORMED_ARRAY_MSG,
          }),
      }),
    ),
    header: validator(
      Joi.object({
        authorization: Joi
          .string()
          .required()
          .messages({
            'any.required': 'Token not found',
            'string.base': 'Invalid token',
          }),
      }),
    ),
  };

  public async register(data: Order, authorization: string | undefined): Promise<OrderReturned> {
    const { id } = await this.tokenService.validate(authorization);
    await this.validate.body(data);
    const product = await this.model.register(id, data.productsIds);
    return product;
  }

  public async list(): Promise<OrderReturned[]> {
    const orders = await this.model.list();
    return orders;
  }
}

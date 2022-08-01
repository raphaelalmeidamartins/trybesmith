import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/Order.service';

export default class OrderController {
  constructor(private service: OrderService) {
    this.service = service;
    this.register = this.register.bind(this);
    this.list = this.list.bind(this);
  }

  public async register(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    const order = await this.service.register(req.body, authorization);
    
    res.status(StatusCodes.CREATED).json(order);
  }

  public async list(req: Request, res: Response): Promise<void> {
    const orders = await this.service.list();

    res.status(StatusCodes.OK).json(orders);
  }
}

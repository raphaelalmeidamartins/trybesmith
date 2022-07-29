import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/Product.service';

export default class ProductController {
  constructor(private service: ProductService) {
    this.service = service;
    this.register = this.register.bind(this);
    this.list = this.list.bind(this);
  }

  public async register(req: Request, res: Response): Promise<void> {
    const product = await this.service.register(req.body);
    
    res.status(StatusCodes.CREATED).json(product);
  }

  public async list(req: Request, res: Response): Promise<void> {
    const products = await this.service.list();

    res.status(StatusCodes.OK).json(products);
  }
}

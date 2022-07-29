import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/User.service';

export default class UserController {
  constructor(private service: UserService) {
    this.service = service;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  public async login(req: Request, res: Response): Promise<void> {
    const token = await this.service.login(req.body);
    
    res.status(StatusCodes.OK).json({ token });
  }

  public async register(req: Request, res: Response): Promise<void> {
    const token = await this.service.register(req.body);
    
    res.status(StatusCodes.CREATED).json({ token });
  }
}

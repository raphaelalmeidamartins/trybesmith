import Joi from 'joi';
import UserModel from '../models/User.model';
import UnauthorizedError from '../utils/errors/Unauthorized.error';
import { Login, User, UserReturned } from '../utils/types/User.types';
import validator from '../utils/validator';
import AuthService from './Auth.service';

export default class UserService {
  constructor(private model: UserModel, private tokenService: AuthService) {
    this.model = model;
    this.tokenService = tokenService;
  }

  public validate = {
    body: {
      login: validator(
        Joi.object({
          username: Joi.string().min(3).required(),
          password: Joi.string().min(8).required(),
        }),
      ),
      register: validator(
        Joi.object({
          username: Joi.string().min(3).required(),
          password: Joi.string().min(8).required(),
          classe: Joi.string().min(3).required(),
          level: Joi.number().min(1).required(),
        }),
      ),
    },
    username: async (username: string): Promise<UserReturned> => {
      const user: UserReturned | undefined = await this.model.getByUsername(username);
      if (!user) throw new UnauthorizedError('Username or password invalid');
      return user;
    },
    password: async (user: User, password: string): Promise<void> => {
      if (user.password !== password) {
        throw new UnauthorizedError('Username or password invalid');
      }
    },
  };

  public async login(data: Login): Promise<string> {
    await this.validate.body.login(data);
    const user = await this.validate.username(data.username);
    await this.validate.password(user, data.password);
    const token = await this.tokenService.generate(user.id);

    return token;
  }

  public async register(data: User): Promise<string> {
    await this.validate.body.register(data);
    const id = await this.model.register(data);
    const token = await this.tokenService.generate(id);

    return token;
  }
}

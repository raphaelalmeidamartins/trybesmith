import Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/User.model';
import UnauthorizedError from '../utils/errors/Unauthorized.error';
import { Login, User } from '../utils/types/User.types';
import validator from '../utils/validator';

export default class UserService {
  constructor(private model: UserModel) {
    this.model = model;
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
    username: async (username: string): Promise<User> => {
      const user: User | undefined = await this.model.getByUsername(username);
      if (!user) throw new UnauthorizedError('Username or password invalid');
      return user;
    },
    password: async (user: User, password: string): Promise<void> => {
      if (user.password !== password) {
        throw new UnauthorizedError('Username or password invalid');
      }
    },
  };

  public token = {
    generate: async (username: string): Promise<string> => {
      const token = jwt.sign(
        { username },
        String(process.env.JWT_SECRET),
        {
          expiresIn: '1d',
        },
      );
      return token;
    },
    validate: async (
      authorization: string,
    ): Promise<string | jwt.JwtPayload> => {
      const payload = jwt.verify(authorization, String(process.env.JWT_SECRET));
      return payload;
    },
  };

  public async login(data: Login): Promise<string> {
    await this.validate.body.login(data);
    const user = await this.validate.username(data.username);
    await this.validate.password(user, data.password);
    const token = await this.token.generate(data.username);

    return token;
  }

  public async register(data: User): Promise<string> {
    await this.validate.body.register(data);
    await this.model.register(data);
    const token = await this.token.generate(data.username);

    return token;
  }
}

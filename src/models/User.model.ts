import { Pool, ResultSetHeader } from 'mysql2/promise';
import { User, UserReturned } from '../utils/types/User.types';

export default class UserModel {
  constructor(private connection: Pool) {
    this.connection = connection;
  }

  public async register(data: User): Promise<number> {
    const sql = `
      INSERT INTO Trybesmith.Users (username, classe, level, password)
      VALUES (?, ?, ?, ?);
    `;

    const [{ insertId }] = await this.connection.query<ResultSetHeader>(sql, [
      data.username,
      data.classe,
      data.level,
      data.password,
    ]);

    return +insertId;
  }

  public async getByUsername(username: string): Promise<UserReturned> {
    const sql = `
      SELECT *
      FROM Trybesmith.Users
      WHERE username = ?
    `;

    const result = await this.connection.query(sql, [username]);
    const [rows] = result;
    const [user] = rows as UserReturned[] | [];
    return user;
  }
}

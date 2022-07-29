import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/Product.interface';

export default class ProductModel {
  constructor(private connection: Pool) {
    this.connection = connection;
  }

  public async register(data: Product): Promise<Product> {
    const sql = `
      INSERT INTO Trybesmith.Products (name, amount)
      VALUES (?, ?);
    `;

    const [{ insertId }] = await this.connection.query<ResultSetHeader>(sql, [
      data.name,
      data.amount,
    ]);

    return { id: +insertId, ...data };
  }
}

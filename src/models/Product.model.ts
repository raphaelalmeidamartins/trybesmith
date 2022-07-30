import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Product, ProductReturned } from '../utils/types/Product.types';

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

  public async list(): Promise<ProductReturned[]> {
    const sql = `
      SELECT *
      FROM Trybesmith.Products;
    `;

    const result = await this.connection.query(sql);
    const [rows] = result;
    return rows as ProductReturned[];
  }
}

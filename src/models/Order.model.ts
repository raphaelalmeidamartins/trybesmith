import { Pool, ResultSetHeader } from 'mysql2/promise';
import { OrderReturned } from '../utils/types/Order.types';

export default class OrderModel {
  constructor(private connection: Pool) {
    this.connection = connection;
  }

  private async updateProducts(productsIds: number[]): Promise<void> {
    const sqlProduct = `
      INSERT INTO Trybesmith.Products (orderId)
      VALUES (?);
    `;

    const result = productsIds.map((id) =>
      this.connection.query<ResultSetHeader>(sqlProduct, id));
    await Promise.all(result);
  }

  public async register(
    userId: number,
    productsIds: number[],
  ): Promise<OrderReturned> {
    const sqlOrder = `
      INSERT INTO Trybesmith.Orders (userId)
      VALUES (?);
    `;

    const [{ insertId }] = await this.connection.query<ResultSetHeader>(
      sqlOrder,
      [[userId]],
    );

    await this.updateProducts(productsIds);
    const order = await this.getById(insertId);

    return order;
  }

  /* Recebi a dica de utilizar as funções agregadoras do SQL de Lais Namatela 19A */

  public async getById(id: number): Promise<OrderReturned> {
    const sql = `
      SELECT
        orders.id,
        orders.userId,
        JSON_ARRAYAGG(products.id) AS productsIds 
      FROM
        Trybesmith.Orders AS orders
          LEFT JOIN
        Trybesmith.Products AS products
        ON orders.id = products.orderId
      WHERE orders.id = ?
      GROUP BY orders.id
      ORDER BY orders.userId;
    `;

    const result = await this.connection.query(sql, [id]);
    const [rows] = result;
    const [order] = rows as OrderReturned[];
    return order;
  }

  public async list(): Promise<OrderReturned[]> {
    const sql = `
      SELECT
        orders.id,
        orders.userId,
        JSON_ARRAYAGG(products.id) AS productsIds 
      FROM
        Trybesmith.Orders AS orders
          LEFT JOIN
        Trybesmith.Products AS products
        ON orders.id = products.orderId
      GROUP BY orders.id
      ORDER BY orders.userId;
    `;

    const result = await this.connection.query(sql);
    const [rows] = result;
    return rows as OrderReturned[];
  }
}

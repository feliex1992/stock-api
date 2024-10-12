import { Client } from 'pg';
import { Database } from '../../infrastructure/database';
import { Product } from '../../domain/entities/Product';
import { User } from '../../domain/entities/User';

export class ProductRepository {
  constructor() {}

  public async create(product: Product): Promise<Product> {
    const db: Client = Database.getConnection();
    try {
      const user: User = Database.getUser();

      const result = await db.query(
        `with inserted_product as (
          INSERT INTO tm_product (product_name, category_id, qty, price, created_id, updated_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        ) SELECT ip.id, ip.product_name, ip.category_id, c.category_name, ip.qty, ip.price 
        FROM inserted_product ip inner join tm_category c on c.id = ip.category_id`,
        [product.product_name, product.category_id, product.qty, product.price, user.id, user.id]
      );
      return result.rows[0];
    } catch (e: any) {
      if (typeof e === 'string') {
        throw new Error(e);
      } else {
        throw new Error(e.message);
      }
    } finally {
      await Database.closeConnection()
    }
  }
}
import { Client } from "pg";
import { User } from "../../domain/entities/User";
import { Database } from "../../infrastructure/database";

export class UserRepository {
  constructor() {}

  public async getOneByFilter(filter: string) {
    const db: Client = Database.getConnection();
    try {
      const result = await db.query(
        `SELECT id, user_name, full_name, phone, password FROM tm_user ${filter} LIMIT 1`
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

  public async create(user: User) {
    const db: Client = Database.getConnection();
    try {
      const result = await db.query(
        `INSERT INTO tm_user (user_name, full_name, phone, password) VALUES ($1, $2, $3, $4)
        RETURNING id, user_name, full_name, phone`,
        [user.user_name, user.full_name, user.phone, user.password]
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
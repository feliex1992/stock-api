import { Client } from 'pg';
import dotenv from 'dotenv';
import { User } from '../domain/entities/User';

export class Database {
  private static instance: Client | null = null;
  private static user: User;

  private constructor() {} // Private constructor to prevent instantiation

  public static getConnection(): Client {
    dotenv.config();

    if (!Database.instance) {
      Database.instance = new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: Number(process.env.PGPORT), // Default PostgreSQL port
      });

      Database.instance.connect() // Connect to the database
        .catch(err => console.error('Database connection error', err.stack));
    }
    return Database.instance;
  }

  public static async closeConnection(): Promise<void> {
    if (Database.instance) {
      await Database.instance.end(); // Close the database connection
      Database.instance = null; // Reset the instance
    }
  }

  public static setUser(user: User): void {
    this.user = user;
  }

  public static getUser(): User {
    return this.user
  }
}
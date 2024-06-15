import pool from "./pg";

export interface User {
  id?: number;
  email: string;
  password: string;
}

export class UserModel {
  static async createUser(user: User): Promise<User> {
    const { email, password } = user;
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, password]
    );
    return result.rows[0];
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      "SELECT id, email, password FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  }
}

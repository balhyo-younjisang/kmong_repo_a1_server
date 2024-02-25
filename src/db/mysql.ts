import mysql from "mysql2/promise";
import config from "../config/config";
import { DBError } from "../error/error";

export default class Repository {
  pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: "211.47.74.38",
      port: 3306,
      user: config.MYSQL.USER,
      password: config.MYSQL.PASSWORD,
      database: config.MYSQL.DB,
    });
  }

  async executeQuery(sql: string, values: any) {
    let connection = null;
    let res = null;

    try {
      connection = await this.pool.getConnection();
      res = await connection.query(sql, values);
      return res;
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      throw new DBError({
        name: "DB_Error",
        message: "DB 처리 중 오류가 발생했습니다",
        code: 500,
      });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}

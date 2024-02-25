"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = __importDefault(require("../config/config"));
const error_1 = require("../error/error");
class Repository {
    constructor() {
        this.pool = promise_1.default.createPool({
            connectionLimit: 10,
            host: "localhost",
            user: config_1.default.MYSQL.USER,
            password: config_1.default.MYSQL.PASSWORD,
            database: config_1.default.MYSQL.DB,
        });
    }
    executeQuery(sql, values) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = null;
            let res = null;
            try {
                connection = yield this.pool.getConnection();
                res = yield connection.query(sql, values);
                return res;
            }
            catch (err) {
                throw new error_1.DBError({
                    name: "DB_Error",
                    message: "DB 처리 중 오류가 발생했습니다",
                    code: 500,
                });
            }
            finally {
                if (connection) {
                    connection.release();
                }
            }
        });
    }
}
exports.default = Repository;

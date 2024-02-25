"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error("⚠️ Couldn't find .env file");
}
exports.default = {
    PORT: parseInt(process.env.PORT, 10),
    api: {
        prefix: "/api/v1",
    },
    salt: 5,
    MYSQL: {
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        DB: process.env.DB_NAME,
    },
    jwt: process.env.SECRET_KEY,
};

import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file");
}

export default {
  PORT: parseInt(process.env.PORT!, 10),
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

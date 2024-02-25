import { Router } from "express";
import user from "./routes/user";
import admin from "./routes/admin";

export default () => {
  const router = Router();
  user(router);
  admin(router);

  return router;
};

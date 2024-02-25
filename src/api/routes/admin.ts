import { Router } from "express";
import verifyMiddleware from "../middleware/authMiddleware";
import { AdminController } from "../../controller/adminController";
const route = Router();

export default (app: Router) => {
  app.use("/admin", route);
  const controller = new AdminController();
};

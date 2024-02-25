import { Router } from "express";
import { AdminController } from "../../controller/adminController";
import authMiddleware from "../middleware/authMiddleware";
const route = Router();

export default (app: Router) => {
  app.use("/admin", route);
  const controller = new AdminController();

  route.route("/manage").all(authMiddleware).get(controller.handleGetUser);
  route.route("/edit").all(authMiddleware).patch(controller.handlePatchUserMax);
};

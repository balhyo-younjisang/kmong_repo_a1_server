import { Router } from "express";
import { UserController } from "../../controller/userController";
const route = Router();

export default (app: Router) => {
  app.use("/users", route);
  const controller = new UserController();

  route.route("/signup").post(controller.handleSignUp);
  route.route("/signin").post(controller.handleSignIn);
};

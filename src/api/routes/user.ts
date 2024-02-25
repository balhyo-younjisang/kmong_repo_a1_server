import { Router } from "express";
import { UserController } from "../../controller/userController";
import verifyMiddleware from "../middleware/authMiddleware";
const route = Router();

export default (app: Router) => {
  app.use("/users", route);
  const controller = new UserController();

  route.route("/signup").post(controller.handleSignUp);
  route.route("/signin").post(controller.handleSignIn);
  route
    .route("/edit")
    .all(verifyMiddleware)
    .patch(controller.handlePatchEntire);
};

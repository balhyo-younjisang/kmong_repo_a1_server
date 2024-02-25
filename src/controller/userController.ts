import { Response, Request } from "express";
import Container from "typedi";
import { UserService } from "../service/userService";

export class UserController {
  private serviceInstance: any;

  constructor() {
    this.serviceInstance = Container.get(UserService);
  }

  handleSignUp = async (req: Request, res: Response) => {
    const { phoneNumber, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "비밀번호가 일치하지 않습니다" });
    }

    const response = await this.serviceInstance.createUser({
      phoneNumber,
      password,
    });

    return res.status(response.code).json({ ...response });
  };

  handleSignIn = async (req: Request, res: Response) => {
    const { phoneNumber, password } = req.body;

    const response = await this.serviceInstance.signInUser({
      phoneNumber,
      password,
    });

    return res.status(response.code).json({ ...response });
  };

  handlePatchEntire = async (req: Request, res: Response) => {
    const { phoneNumber } = res.locals;
    const { send_count } = req.body;

    const response = await this.serviceInstance.patchUserEntire({
      phoneNumber,
      patch_data: send_count,
    });

    return res.status(response.code).json({ message: "수정 완료" });
  };
}

import { Response, Request } from "express";
import Container from "typedi";
import { AdminService } from "../service/adminService";

export class AdminController {
  private serviceInstance: any;

  constructor() {
    this.serviceInstance = Container.get(AdminService);
  }

  handleGetUser = async (req: Request, res: Response) => {
    if (!res.locals.isAdmin)
      res.status(401).json({ message: "권한이 필요합니다" });

    const response = await this.serviceInstance.getAllUsers();

    return res.status(200).json({ response });
  };

  handlePatchUserMax = async (req: Request, res: Response) => {
    if (!res.locals.isAdmin)
      res.status(401).json({ message: "권한이 필요합니다" });

    const { phoneNumber, maxSend } = req.body;
    const response = await this.serviceInstance.patchUserMax({
      phoneNumber,
      patch_data: maxSend,
    });

    return res.status(200).json({ message: "수정 완료" });
  };
}

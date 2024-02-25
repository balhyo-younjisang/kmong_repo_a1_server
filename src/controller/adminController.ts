import { Response, Request } from "express";
import Container from "typedi";
import { AdminService } from "../service/adminService";

export class AdminController {
  serviceInstance: any;

  constructor() {
    this.serviceInstance = Container.get(AdminService);
  }
}

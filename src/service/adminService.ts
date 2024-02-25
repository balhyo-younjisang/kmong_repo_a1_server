import { Service } from "typedi";
import Repository from "../db/mysql";

@Service()
export class AdminService {
  repository: Repository;

  constructor() {
    this.repository = new Repository();
  }
}

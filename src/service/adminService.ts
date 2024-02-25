import { Service } from "typedi";
import Repository from "../db/mysql";
import { IUser } from "../interface/IUser";

@Service()
export class AdminService {
  repository: Repository;

  constructor() {
    this.repository = new Repository();
  }

  getAllUsers = async () => {
    const sql = "SELECT * FROM USER WHERE ROLE = 'teacher';";
    const users: any[] = await this.repository.executeQuery(sql, null);

    users[0].forEach((user: IUser) => {
      delete user.PASSWORD;
    });

    return users[0];
  };

  patchUserMax = async ({
    phoneNumber,
    patch_data,
  }: {
    phoneNumber: string;
    patch_data: string;
  }) => {
    const sql = "UPDATE USER SET MAX_SEND = ? WHERE PHONE_NUMBER = ?;";
    const values = [patch_data, phoneNumber];

    const response = await this.repository.executeQuery(sql, values);
    return response;
  };
}

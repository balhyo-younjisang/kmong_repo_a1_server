import { Service } from "typedi";
import { authUserDto } from "../dto/userDto";
import Repository from "../db/mysql";
import bcrypt from "bcrypt";
import config from "../config/config";
import jwt from "jsonwebtoken";

@Service()
export class UserService {
  repository: Repository;

  constructor() {
    this.repository = new Repository();
  }

  createUser = async ({ phoneNumber, password }: authUserDto) => {
    const find_sql = "SELECT * FROM USER WHERE PHONE_NUMBER = ?;";
    const find_values = [phoneNumber];
    const [find_res]: any = await this.repository.executeQuery(
      find_sql,
      find_values
    );

    if (!!find_res[0])
      return { code: 400, message: "이미 존재하는 사용자입니다." };

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    const sql = "INSERT INTO USER (PHONE_NUMBER, PASSWORD, ROLE) VALUES ?;";
    const values = [[phoneNumber, hash, "teacher"]];

    const [res] = await this.repository.executeQuery(sql, [values]);

    return { code: 201, message: "회원가입에 성공했습니다" };
  };

  signInUser = async ({ phoneNumber, password }: authUserDto) => {
    let isAdmin = false;
    const find_sql = "SELECT * FROM USER WHERE PHONE_NUMBER = ?;";
    const find_values = [phoneNumber];
    const [find_res]: any = await this.repository.executeQuery(
      find_sql,
      find_values
    );

    if (!find_res)
      return { code: 404, message: "사용자 정보가 존재하지 않습니다." };

    const isPasswordCorrect = await bcrypt.compare(
      password,
      find_res[0].PASSWORD
    );

    if (!isPasswordCorrect)
      return { code: 400, message: "비밀번호가 일치하지 않습니다." };

    if (find_res[0].ROLE === "ADMIN") isAdmin = true;

    const token = jwt.sign({ phoneNumber, isAdmin }, config.jwt!, {
      expiresIn: "1d",
    });

    return { code: 200, message: "로그인 성공", data: token };
  };
}

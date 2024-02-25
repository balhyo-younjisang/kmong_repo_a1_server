"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typedi_1 = require("typedi");
const mysql_1 = __importDefault(require("../db/mysql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserService = class UserService {
    constructor() {
        this.createUser = ({ phoneNumber, password }) => __awaiter(this, void 0, void 0, function* () {
            const find_sql = "SELECT * FROM USER WHERE PHONE_NUMBER = ?;";
            const find_values = [phoneNumber];
            const [find_res] = yield this.repository.executeQuery(find_sql, find_values);
            if (!!find_res[0])
                return { code: 400, message: "이미 존재하는 사용자입니다." };
            const salt = bcrypt_1.default.genSaltSync(10);
            const hash = yield bcrypt_1.default.hash(password, salt);
            const sql = "INSERT INTO USER (PHONE_NUMBER, PASSWORD, ROLE) VALUES ?;";
            const values = [[phoneNumber, hash, "teacher"]];
            const [res] = yield this.repository.executeQuery(sql, [values]);
            return { code: 201, message: "회원가입에 성공했습니다" };
        });
        this.signInUser = ({ phoneNumber, password }) => __awaiter(this, void 0, void 0, function* () {
            let isAdmin = false;
            const find_sql = "SELECT * FROM USER WHERE PHONE_NUMBER = ?;";
            const find_values = [phoneNumber];
            const [find_res] = yield this.repository.executeQuery(find_sql, find_values);
            if (!find_res)
                return { code: 404, message: "사용자 정보가 존재하지 않습니다." };
            const isPasswordCorrect = yield bcrypt_1.default.compare(password, find_res[0].PASSWORD);
            if (!isPasswordCorrect)
                return { code: 400, message: "비밀번호가 일치하지 않습니다." };
            if (find_res[0].ROLE === "ADMIN")
                isAdmin = true;
            const token = jsonwebtoken_1.default.sign({ phoneNumber, isAdmin }, config_1.default.jwt, {
                expiresIn: "1d",
            });
            return { code: 200, message: "로그인 성공", data: token };
        });
        this.patchUserEntire = ({ phoneNumber, patch_data, }) => __awaiter(this, void 0, void 0, function* () {
            const find_sql = "SELECT * FROM USER WHERE PHONE_NUMBER = ?;";
            const find_values = [phoneNumber];
            const [find_res] = yield this.repository.executeQuery(find_sql, find_values);
            const sql = "UPDATE USER SET ENTIRE_SEND = ? WHERE PHONE_NUMBER = ?;";
            const values = [
                parseInt(find_res[0].entire_send) + parseInt(patch_data),
                phoneNumber,
            ];
            yield this.repository.executeQuery(sql, values);
            return { code: 200 };
        });
        this.repository = new mysql_1.default();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], UserService);

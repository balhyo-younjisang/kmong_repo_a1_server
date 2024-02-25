"use strict";
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
exports.UserController = void 0;
const typedi_1 = __importDefault(require("typedi"));
const userService_1 = require("../service/userService");
class UserController {
    constructor() {
        this.handleSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, password, confirmPassword } = req.body;
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "비밀번호가 일치하지 않습니다" });
            }
            const response = yield this.serviceInstance.createUser({
                phoneNumber,
                password,
            });
            return res.status(response.code).json(Object.assign({}, response));
        });
        this.handleSignIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, password } = req.body;
            const response = yield this.serviceInstance.signInUser({
                phoneNumber,
                password,
            });
            return res.status(response.code).json(Object.assign({}, response));
        });
        this.handlePatchEntire = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber } = res.locals;
            const { send_count } = req.body;
            const response = yield this.serviceInstance.patchUserEntire({
                phoneNumber,
                patch_data: send_count,
            });
            return res.status(response.code).json({ message: "수정 완료" });
        });
        this.serviceInstance = typedi_1.default.get(userService_1.UserService);
    }
}
exports.UserController = UserController;

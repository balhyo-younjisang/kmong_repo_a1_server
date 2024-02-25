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
exports.AdminController = void 0;
const typedi_1 = __importDefault(require("typedi"));
const adminService_1 = require("../service/adminService");
class AdminController {
    constructor() {
        this.handleGetUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!res.locals.isAdmin)
                res.status(401).json({ message: "권한이 필요합니다" });
            const response = yield this.serviceInstance.getAllUsers();
            return res.status(200).json({ response });
        });
        this.handlePatchUserMax = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!res.locals.isAdmin)
                res.status(401).json({ message: "권한이 필요합니다" });
            const { phoneNumber, maxSend } = req.body;
            const response = yield this.serviceInstance.patchUserMax({
                phoneNumber,
                patch_data: maxSend,
            });
            return res.status(200).json({ message: "수정 완료" });
        });
        this.serviceInstance = typedi_1.default.get(adminService_1.AdminService);
    }
}
exports.AdminController = AdminController;

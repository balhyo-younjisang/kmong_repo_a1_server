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
exports.AdminService = void 0;
const typedi_1 = require("typedi");
const mysql_1 = __importDefault(require("../db/mysql"));
let AdminService = class AdminService {
    constructor() {
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM USER WHERE ROLE = 'teacher';";
            const users = yield this.repository.executeQuery(sql, null);
            users[0].forEach((user) => {
                delete user.PASSWORD;
            });
            return users[0];
        });
        this.patchUserMax = ({ phoneNumber, patch_data, }) => __awaiter(this, void 0, void 0, function* () {
            const sql = "UPDATE USER SET MAX_SEND = ? WHERE PHONE_NUMBER = ?;";
            const values = [patch_data, phoneNumber];
            const response = yield this.repository.executeQuery(sql, values);
            return response;
        });
        this.repository = new mysql_1.default();
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AdminService);

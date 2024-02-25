"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const verifyMiddleware = (req, res, next) => {
    try {
        const clientToken = req.headers.authorization.split("Bearer ")[1];
        const decoded = jsonwebtoken_1.default.verify(clientToken, config_1.default.jwt);
        if (decoded) {
            res.locals.phoneNumber = decoded.phoneNumber;
            res.locals.isAdmin = decoded.isAdmin;
            next();
        }
        else {
            res.status(401).json({ message: "로그인이 필요합니다" });
        }
    }
    catch (err) {
        res.status(401).json({ message: "토큰이 만료되었습니다" });
    }
};
exports.default = verifyMiddleware;

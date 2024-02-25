"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../../controller/adminController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/admin", route);
    const controller = new adminController_1.AdminController();
    route.route("/manage").all(authMiddleware_1.default).get(controller.handleGetUser);
    route.route("/edit").all(authMiddleware_1.default).patch(controller.handlePatchUserMax);
};

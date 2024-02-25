"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controller/userController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/users", route);
    const controller = new userController_1.UserController();
    route.route("/signup").post(controller.handleSignUp);
    route.route("/signin").post(controller.handleSignIn);
    route
        .route("/edit")
        .all(authMiddleware_1.default)
        .patch(controller.handlePatchEntire);
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../config/config"));
const index_1 = __importDefault(require("../api/index"));
const error_1 = require("../error/error");
exports.default = ({ app }) => {
    /**
     * Health Check endpoints
     */
    app.get("/status", (req, res) => {
        res.status(200).end();
    });
    app.head("/status", (req, res) => {
        res.status(200).end();
    });
    app.enable("trust proxy");
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded());
    app.use(config_1.default.api.prefix, (0, index_1.default)());
    app.use((req, res, next) => {
        const err = new error_1.NotFoundError({
            name: "Not_Found",
            message: "Route is not found",
            code: 404,
        });
        next(err);
    });
    app.use((err, req, res) => {
        res.status(err.code || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};

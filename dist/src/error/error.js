"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBError = exports.PasswordDoNotMatchError = exports.NotFoundError = exports.BaseError = void 0;
class BaseError extends Error {
    constructor({ name, message, code, }) {
        super();
        this.name = name;
        this.message = message;
        this.code = code;
    }
}
exports.BaseError = BaseError;
class NotFoundError extends BaseError {
    constructor({ name, message, code, }) {
        super({ name, message, code });
    }
}
exports.NotFoundError = NotFoundError;
class PasswordDoNotMatchError extends BaseError {
    constructor({ name, message, code, }) {
        super({ name, message, code });
    }
}
exports.PasswordDoNotMatchError = PasswordDoNotMatchError;
class DBError extends BaseError {
    constructor({ name, message, code, }) {
        super({ name, message, code });
    }
}
exports.DBError = DBError;

type ErrorName = "Not_Found" | "Passwords_do_not_match" | "DB_Error";

export class BaseError extends Error {
  name: ErrorName;
  message: string;
  code: number;

  constructor({
    name,
    message,
    code,
  }: {
    name: ErrorName;
    message: string;
    code: number;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.code = code;
  }
}

export class NotFoundError extends BaseError {
  constructor({
    name,
    message,
    code,
  }: {
    name: ErrorName;
    message: string;
    code: number;
  }) {
    super({ name, message, code });
  }
}

export class PasswordDoNotMatchError extends BaseError {
  constructor({
    name,
    message,
    code,
  }: {
    name: ErrorName;
    message: string;
    code: number;
  }) {
    super({ name, message, code });
  }
}

export class DBError extends BaseError {
  constructor({
    name,
    message,
    code,
  }: {
    name: ErrorName;
    message: string;
    code: number;
  }) {
    super({ name, message, code });
  }
}

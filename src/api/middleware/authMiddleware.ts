import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { IToken } from "../../interface/IToken";

const verifyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientToken = req.headers.authorization!.split("Bearer ")[1];
    const decoded = jwt.verify(clientToken, config.jwt!) as IToken;

    if (decoded) {
      res.locals.phoneNumber = decoded.phoneNumber;
      res.locals.isAdmin = decoded.isAdmin;

      next();
    } else {
      res.status(401).json({ message: "로그인이 필요합니다" });
    }
  } catch (err) {
    res.status(401).json({ message: "토큰이 만료되었습니다" });
  }
};

export default verifyMiddleware;

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "../config/config";
import routes from "../api/index";
import { BaseError, NotFoundError } from "../error/error";

export default ({ app }: { app: express.Application }) => {
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
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err = new NotFoundError({
      name: "Not_Found",
      message: "Route is not found",
      code: 404,
    });

    next(err);
  });

  app.use((err: BaseError, req: Request, res: Response) => {
    res.status(err.code || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};

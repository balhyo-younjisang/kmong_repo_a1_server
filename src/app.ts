import "reflect-metadata";
import express from "express";

import config from "./config/config";

async function run() {
  const app = express();

  await require("./loader/").default({ serverApp: app });

  app
    .listen(config.PORT, () => {
      console.info(`
    🚀 Server listening on port : ${config.PORT} 🚀
    `);
    })
    .on("error", (err) => {
      process.exit(1);
    });
}

run();

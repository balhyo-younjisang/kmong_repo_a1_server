import express from "express";
import routeLoader from "./routeLoader";

export default async ({ serverApp }: { serverApp: express.Application }) => {
  await routeLoader({ app: serverApp });
};

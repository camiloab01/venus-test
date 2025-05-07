import express from "express";
import marketRouter from "./modules/market/market.route";

export const app = express();
app.use("/api/v1/markets", marketRouter);

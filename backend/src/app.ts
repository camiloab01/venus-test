import express from "express";
import marketRouter from "./modules/market/market.route";
import cors from "cors";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use("/api/v1/markets", marketRouter);

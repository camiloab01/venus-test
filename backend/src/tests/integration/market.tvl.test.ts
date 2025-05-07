import request from "supertest";
import { MySqlContainer, StartedMySqlContainer } from "@testcontainers/mysql"; // yarn add -D @testcontainers/mysql
import fs from "fs/promises";
import { createConnection } from "mysql2/promise";
import path from "path";
import { db } from "../../config/db";

let mysql: StartedMySqlContainer;
let app: import("express").Express;

jest.setTimeout(60_000);

beforeAll(async () => {
  mysql = await new MySqlContainer("mysql:8.2")
    .withUsername("app_user")
    .withUserPassword("app_password")
    .withDatabase("app_db")
    .start();

  process.env.DB_HOST = mysql.getHost();
  process.env.DB_PORT = mysql.getMappedPort(3306).toString();
  process.env.DB_USER = "app_user";
  process.env.DB_PASSWORD = "app_password";
  process.env.DB_NAME = "app_db";

  const sql = await fs.readFile(
    path.resolve(__dirname, "../fixtures/market_seed.sql"),
    "utf8",
  );

  const conn = await createConnection({
    host: mysql.getHost(),
    port: mysql.getMappedPort(3306),
    user: mysql.getUsername(),
    password: mysql.getUserPassword(),
    database: mysql.getDatabase(),
    multipleStatements: true,
  });
  await conn.query(sql);
  await conn.end();

  ({ app } = await import("../../app"));
}, 30_000);

afterAll(async () => {
  await mysql.stop();
  await db().end();
});

describe("GET /markets/tvl", () => {
  it("returns total TVL across all chains", async () => {
    const res = await request(app).get("/api/v1/markets/tvl");
    expect(res.status).toBe(200);
    // 316 904 cents (chain 1) + 411 384 cents (chain 56) = 728 288
    expect(res.body).toEqual({ marketTvl: 728288 });
  });

  it("filters by chainId", async () => {
    const res = await request(app).get("/api/v1/markets/tvl?chainId=1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ marketTvl: 316904 });
  });

  it("invalid chainId", async () => {
    const res = await request(app).get("/api/v1/markets/tvl?chainId=999");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ marketTvl: 0 });
  });
});

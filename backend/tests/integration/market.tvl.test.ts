import request from "supertest";
import { MySqlContainer, StartedMySqlContainer } from "@testcontainers/mysql"; // yarn add -D @testcontainers/mysql
import { app } from "../../src/index";
import fs from "fs/promises";
import { createConnection } from "mysql2/promise";
import path from "path";

let mysql: StartedMySqlContainer;

beforeAll(async () => {
  // 1. spin‑up a disposable MySQL 8.2 container
  mysql = await new MySqlContainer("mysql:8.2").start();

  // 2. point your db‑pool at that container
  process.env.DB_HOST = mysql.getHost();
  process.env.DB_PORT = mysql.getMappedPort(3306).toString();
  process.env.DB_USER = mysql.getUsername();
  process.env.DB_PASS = mysql.getUserPassword();
  process.env.DB_NAME = mysql.getDatabase();

  // 3. create schema + seed data
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
}, 30_000);

afterAll(async () => {
  await mysql.stop();
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

  it("rejects invalid chainId", async () => {
    const res = await request(app).get("/api/v1/markets/tvl?chainId=999");
    expect(res.status).toBe(400);
  });
});

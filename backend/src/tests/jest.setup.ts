import { afterAll } from "@jest/globals";
import { db } from "../config/db";

afterAll(async () => {
  try {
    await db().end();
  } catch {
    /* db might not have been established */
  }
});

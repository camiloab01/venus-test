import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  verbose: true,
  maxWorkers: 1,
  testTimeout: 60_000,
};
export default config;

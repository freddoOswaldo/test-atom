module.exports = {
  verbose: true,
  testEnvironment: "node",
  preset: "ts-jest",
  testMatch: ["**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  collectCoverageFrom: ["**/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};

module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 100,
    },
  },
  preset: "ts-jest",
  testEnvironment: "node",
};

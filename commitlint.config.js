module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 50],
    "body-max-line-length": [2, "always", 72],
    "footer-max-line-length": [2, "always", 72],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "internal",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};

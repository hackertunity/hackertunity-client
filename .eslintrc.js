module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  ignorePatterns: ["node_modules/"],
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  parserOptions: {
    sourceType: "module"
  }
};

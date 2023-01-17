// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
  },
  env: {
    browser: true,
  },
  // extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: ["html"],
  // check if imports actually resolve
  settings: {
    "import/resolver": {
      webpack: {
        config: "build/webpack.base.conf.js",
      },
    },
  },
  // add your custom rules here
  rules: {
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "eol-last": 0,
    "no-console": 0,
    "keyword-spacing": 0,
  },
};

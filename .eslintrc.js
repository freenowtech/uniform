module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true
    },
    extends: ["eslint:recommended", "plugin:flowtype/recommended", "plugin:prettier/recommended", "plugin:react/recommended"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        },
        flowVersion: "0.93"
    },
    plugins: ["react", "flowtype", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "comma-dangle": ["error", "always-multiline"],
        "jsx-quotes": ["error", "prefer-single"],
        "keyword-spacing": ["error"],
        "linebreak-style": ["error", "unix"],
        "no-case-declarations": ["error"],
        "no-console": [0],
        "no-else-return": ["error"],
        "no-extra-semi": ["error"],
        "no-multi-spaces": ["error"],
        "no-multiple-empty-lines": ["error"],
        "object-curly-spacing": ["error", "always"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "sort-keys": ["warn", "asc", { natural: true }],
        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": ["error", { anonymous: "never", named: "never", asyncArrow: "always" }],
        "space-in-parens": ["error", "never"],
        "wrap-iife": ["error", "inside"]
    }
};

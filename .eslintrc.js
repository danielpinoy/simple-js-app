module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: "eslint:recommended",
    plugins: ["jquery"], // Add 'jquery' to the plugins array
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        // ... Other ESLint rules ...
        // Enforce that `$` is defined as a global variable
        "jquery/no-global-selector": 2,
    },
};

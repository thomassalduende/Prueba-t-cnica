module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    overrides: [
        {
            env: {
                "node": true
            },
            files: [
                ".eslintrc.{js,cjs}"
            ],
            parserOptions: {
                "sourceType": "script"
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        proyect: './tsconfig.json'
    },
    plugins: [
        "react"
    ],
    rules: {
        "@typescript-eslint/explicit-funcion-return-type": 'off',
        "react-react-in-jsx-scope": 'off'
    }
}

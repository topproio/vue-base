module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "wx": true,
        "App": true,
        "Page": true,
        "getApp": true,
        "Component": true
    },
    "extends": [
        "toppro"
    ],
    "root": true,
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [2, "windows"]
    }
};

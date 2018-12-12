'use strict';

module.exports = {
    extends: [
        'plugin:vue/recommended',
        'toppro',
    ],
    rules: {
        'indent': [2, 2],
    },
    plugins: [
        'html',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        'sourceType': 'module',
    }
}

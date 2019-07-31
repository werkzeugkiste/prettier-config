module.exports = {
    arrowParens: 'always',
    printWidth: 100,
    quoteProps: 'consistent',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    overrides: [
        {
            files: ['*.json', '*.yml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};

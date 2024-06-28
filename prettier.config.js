const styleguide = require('@vercel/style-guide/prettier');

module.exports = {
    ...styleguide,
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    plugins: [...styleguide.plugins, 'prettier-plugin-tailwindcss'],
};

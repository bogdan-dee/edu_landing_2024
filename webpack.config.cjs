const path = require('path')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/js/app/index.js'),
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/js/app/dist/'),
    },
    plugins: [],
    optimization: {
        minimize: (process.env.NODE_ENV === 'production'),
        usedExports: true
    },
    devtool: 'source-map',
    mode: process.env.NODE_ENV || 'development'
}
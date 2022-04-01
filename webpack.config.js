const path = require('path');

module.exports = {
    mode: 'production',
    entry: './public/scripts/index',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
    },
    devtool: 'source-map'
};

const path = require('path');

module.exports = {
    mode: 'production',
    entry: './public/scripts/index',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 3000
    }
};
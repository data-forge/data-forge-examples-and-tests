var path = require('path');

module.exports = {
    mode: "development",
    node: {
        fs: 'empty'
    },    
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
    mode,
    entry: path.resolve(__dirname, 'server.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'index.js',
    },
    target: 'node',
    plugins: [new NodePolyfillPlugin()],
    module: {
        rules: [
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    externals: {
        bufferutil: 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
    },
};

const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

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
    externals: [nodeExternals()],
    // in order to ignore all modules in node_modules folder
};

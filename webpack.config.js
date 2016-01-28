import webpack from 'webpack';
import path from 'path';
import config from './config.js';

const host = process.env.HOST || config.host;
const port = (process.env.PORT + 1) || config.port;

var webpackConfig = {
    entry: [
        './src/client'
    ],
    output: {
        filename: '[name].js',
        path: './static/dist',
        publicPath: `http://${host}:${port}/dist/`
    },
    resolve: {
         extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
    
        ]
    },
    
    plugins: [  

    ]
}

export default webpackConfig;
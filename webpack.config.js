import webpack from 'webpack';
import path from 'path';
import config from './config.js';

var webpackConfig = {
    entry: [
        './src/client'
    ],
    output: {
        filename: '[name].js',
        // http://stackoverflow.com/questions/34371029/cannot-start-webpack-dev-server-with-gulp
        path: path.resolve(__dirname, "./static/dist"),
        publicPath: `http://${config.host}:${config.devPort}/dist/`
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

if (process.env.NODE_ENV === 'production') {
    webpackConfig.module.loaders.push({
        test: /\.jsx?$/,
        loaders: [
            'babel'                 
        ],
        exclude: /node_modules/
    })
} else {
    webpackConfig.entry = [
        `webpack-dev-server/client?http://${config.host}:${config.devPort}`,
        "webpack/hot/only-dev-server",
    ].concat(webpackConfig.entry);
    webpackConfig.module.loaders.push({
        test: /\.jsx?$/,
        loaders: [
            'react-hot',
            'babel'                 
        ],
        exclude: /node_modules/
    });
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
            }
        })
    );
}   

export default webpackConfig;
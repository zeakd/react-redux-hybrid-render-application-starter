import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import autoprefixer from 'autoprefixer';
import config from './config.js';

var webpackConfig = {
    entry: [
        './src/client'
    ],
    output: {
        filename: '[name].js',
        // http://stackoverflow.com/questions/34371029/cannot-start-webpack-dev-server-with-gulp
        path: path.resolve(__dirname, "./static/dist")
    },
    resolve: {
         extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
    
        ]
    },
    
    plugins: [  

    ],

    sassLoader: {

    },
    postcss: [ 
        autoprefixer({ browsers: ['last 2 versions'] }) 
    ]
}

if (process.env.NODE_ENV === 'production') {
    webpackConfig.output.publicPath = '/dist/';
    webpackConfig.module.loaders.push({
        test: /\.jsx?$/,
        loaders: [
            'babel'                 
        ],
        exclude: /node_modules/
    }, {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss!sass?sourceMap")
    })

    webpackConfig.plugins.push(
        new ExtractTextPlugin("styles.css"),
        new webpack.DefinePlugin({
            "__DEV__": JSON.stringify("false"),
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })  
    )
} else {
    webpackConfig.devtool = "eval-source-map";
    webpackConfig.entry = [
        `webpack-dev-server/client?http://${config.host}:${config.devPort}`,
        "webpack/hot/only-dev-server",
    ].concat(webpackConfig.entry);
    webpackConfig.output.publicPath = `http://${config.host}:${config.devPort}/dist/`
    webpackConfig.module.loaders.push({
        test: /\.jsx?$/,
        loaders: [
            'react-hot',
            'babel'                 
        ],
        exclude: /node_modules/
    }, {
        test: /\.s?css$/,
        loaders: [
            "style",
            "css?sourceMap",
            "postcss",
            "sass?sourceMap"
        ]
    });
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "__DEV__": JSON.stringify("true"),
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    );
}   

export default webpackConfig;
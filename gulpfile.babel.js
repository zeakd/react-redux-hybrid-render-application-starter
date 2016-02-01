import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import run from 'run-sequence';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import nodemon from 'nodemon';
import browserSync from 'browser-sync';
import path from 'path';

import npmPackage from './package.json';
import config from './config';

gulp.task('mode:production', done => {
    process.env.NODE_ENV = 'production';
    done();
})

gulp.task('mode:development', done => {
    process.env.NODE_ENV = 'development';
    done();
})

gulp.task('clean', done => {
    del(['./static/dist']);
    done();
})

gulp.task('build', ['build:prod']);

gulp.task('build:prod', done => {
    run('mode:production', 'clean', 'webpack', done);
})

gulp.task('webpack', (done) => {
    var webpackConfig = require('./webpack.config').default;
    webpack(webpackConfig, (err, stats) => {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        done();
    });
});

gulp.task('nodemon', () => {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, npmPackage.main),
        watch: [
            './',
            'src/server/',
            'src/routes.jsx',
            'src/containers/',
            'src/components/'
        ],
        ext: 'js,jsx'
    }).on('restart', function() {
        console.log('... Server Restarted');
    });
});

gulp.task('webpack-dev-server', done => {
    var webpackConfig = require('./webpack.config').default;
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        contentBase: `http://${config.host}:${config.devPort}`,
        hot: true,
        inline: true,
        lazy: false,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(config.devPort, config.host, err => {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", `http://${config.host}:${config.devPort}/webpack-dev-server/index.html`);
        // done();
    })
});

gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: `${config.host}:${config.port}`,
        open: false,
        port: 8080
    });
})

gulp.task('serve', ['serve:dev']);

gulp.task('serve:dev', done => {
    run('mode:development', 'clean', ['nodemon', 'webpack-dev-server', 'browser-sync'], done);
});

gulp.task('serve:prod', done => {
    run('mode:production', 'clean', 'build' ,done);
})
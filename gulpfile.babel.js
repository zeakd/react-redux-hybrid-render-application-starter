import gulp from 'gulp';
import del from 'del';
import run from 'run-sequence';

gulp.task('clean', done => {
    del(['./static/dist']);
})

gulp.task('nodemon', () => {

});

gulp.task('webpack-dev-server', () => {

});

gulp.task('browser-sync', () => {

});
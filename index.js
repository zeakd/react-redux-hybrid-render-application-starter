var path = require('path');

require('babel-register');
require('./ignorer')([
    '.css',
    '.scss',
    {
        ext: '.js',
        tests: [new RegExp(path.normalize('src/client'))]
    }
])
if (process.env.NODE_ENV === 'production') {
    global.__DEV__ = false;
} else {
    global.__DEV__ = true;
}
require('./app');
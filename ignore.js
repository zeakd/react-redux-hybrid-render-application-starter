require('./ignorer')([
    '.css',
    '.scss',
    {
        ext: '.js',
        test: /client/
    }
])
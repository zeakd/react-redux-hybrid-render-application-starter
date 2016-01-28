require('./ignorer')([
    '.css',
    '.scss',
    {
        ext: '.js',
        tests: [/client/]
    }
])
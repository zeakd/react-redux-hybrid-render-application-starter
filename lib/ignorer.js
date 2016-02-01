var path = require('path');

var cwd = process.cwd();

function getRelativePath(filename){
  return path.relative(cwd, filename);
}

module.exports = function (exts) {
    exts.map(function (ext) {
        if (typeof ext === 'string') {
            require.extensions[ext] = function () {};    
        } else if (typeof ext === 'object') {
            var old = require.extensions[ext.ext];
            require.extensions[ext.ext] = function (m, filename) {
                var ignore = false;
                for (var i = 0; i < ext.tests.length; i++) {
                    if(ext.tests[i].test(getRelativePath(filename))) {
                        // console.log(m, filename);
                        ignore = true;
                        break;
                    }
                }
                if (!ignore) old(m, filename);
            }
        } else {
            // glob?
        }
    })
}
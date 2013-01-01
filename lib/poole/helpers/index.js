var fs = require('fs'),
    path = require('path');

module.exports = function(options) {
    var helpers = { };

    fs.readdirSync(__dirname).forEach(function(file) {
        var ext = path.extname(file);
        if (file !== 'index.js' && ext === '.js') {
            var name = path.basename(file, ext);
            helpers[name] = require(__dirname + '/' + file);
        }
    });
    
    return helpers;
};
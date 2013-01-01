var crypto = require('crypto'),
    fs = require('fs');

module.exports = function(path, options) {
    var md5 = crypto.createHash('md5'),
        hash = '';

    options = options || { };

    if (!options.root) {
        options.root = './';
    }
        
    try {
        md5.update(fs.readFileSync(options.root + path));
        hash = md5.digest('hex');
        if (options.precision && typeof options.precision === 'number') {
            hash = hash.slice(0, options.precision);
        }
    } catch (e) {
        console.error('Failed to generate hash. Check if file exists: `' + path + '`');
    }
    
    return path + '?' + hash;
};
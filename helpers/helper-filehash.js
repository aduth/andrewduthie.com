var crypto = require('crypto'),
  fs = require('fs');

module.exports.fileHash = function(path, precision) {
  var md5 = crypto.createHash('md5'),
    hash = '';

  try {
    var content = fs.readFileSync(path);
    md5.update(content);
    hash = md5.digest('hex');
    if (typeof precision === 'number') {
      hash = hash.slice(0, precision);
    }
  } catch (e) {
    console.error('Failed to generate hash. Check if file exists: `' + path + '`');
  }

  return hash;
};
module.exports.sanitize = function(options) {
  return options.fn(this).replace(/<(?:.|\n)*?>/gm, '');
};
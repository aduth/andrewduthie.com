var fs   = require('fs'),
  path   = require('path'),
  cons   = require('consolidate'),
  wrench = require('wrench'),
  renderTemplate,
  copyChildDirs,
  createContent,
  parseAssets;

renderTemplate = function(templatePath, outputPath, map) {
  map = map || {};

  cons[global.config.engine](templatePath, map, function(err, rendered) {
    if (err) throw err;
    fs.writeFile(outputPath, rendered, 'utf8');
  });
};

copyChildDirs = function(root) {
  var src, dest;

  fs.readdir(root, function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      src = path.normalize(root + '/' + file);
      fs.stat(src, function(err, stats) {
        if (err) throw err;
        if (stats.isDirectory()) {
          dest = path.normalize(global.config.output + '/'  + src);
          wrench.copyDirRecursive(src, dest, function() {});
        }
      });
    });
  });
};

createContent = function() {
  // Create content directories
  for (var sitePath in global.site) {
    var dir = path.normalize(global.config.output + '/' + sitePath),
      site = global.site[sitePath];

    fs.mkdir(dir, function() {
      copyChildDirs(sitePath);

      // Render content
      site.forEach(function(item) {
        var outputPath = path.normalize(dir + '/' + item.name),
          outputFile = path.normalize(outputPath + '/index.html'),
          templatePath;

        fs.mkdir(outputPath, function() {
          if (item.meta.template) {
            templatePath = path.normalize(
              global.config.templates.path  + '/' + item.meta.template + '.' + global.config.templates.extension
            );
            renderTemplate(templatePath, outputFile, item);
          } else {
            fs.writeFile(outputFile, item.content, 'utf8');
          }
        });
      });
    });
  }
};

parseAssets = function() {
  global.assets.forEach(function(asset) {
    var filePath = path.normalize(global.config.output + '/' + asset);
    renderTemplate(filePath, filePath);
  });
};

module.exports = function() {
  fs.mkdir(global.config.output, function() {
    // Copy assets
    wrench.copyDirRecursive(global.config.assets.path, global.config.output, function() {
      createContent();
      parseAssets();
    });
  });
};

var fs   = require('fs'),
  path   = require('path'),
  marked = require('marked'),
  hljs   = require('highlight.js'),
  yaml   = require('js-yaml'),
  async  = require('async'),
  wrench = require('wrench'),
  rYaml  = /^\s*---([\s\S]*)---[\n\r]*([\s\S]*)/,
  rCleanName = /^\.*\/*|\/*$/g;

module.exports.contents = function(callback) {
  // Initialize site
  var site = { },
    contents = global.config.contents.paths,
    exts = global.config.contents.extensions,
    cleanName;

  if (!contents.length) {
    return callback(null, site);
  }

  // Set marked options
  marked.setOptions({
    gfm: true,
    highlight: function(code, lang) {
      if (hljs.LANGUAGES[lang]) {
        return hljs.highlight(lang, code).value;
      }

      return code;
    }
  });

  // Iterate content roots
  contents.forEach(function(root) {
    cleanName = root.replace(rCleanName, '');
    site[cleanName] = [ ];

    // Discover items
    items = fs.readdir(root, function(err, items) {
      var queue = async.queue(function(item, queueCallback) {
        var extName = path.extname(item),
          name = path.basename(item, extName),
          fullPath = path.normalize(root + '/' + item),
          content, meta, yamlMatch;

        if (exts.indexOf(extName) == -1) {
          return queueCallback(null);
        }

        fs.readFile(fullPath, 'utf8', function(err, content) {
          if (err) throw err;

          // Parse YAML
          if (rYaml.test(content)) {
            yamlMatch = content.match(rYaml);
            meta = yaml.load(yamlMatch[1]);
            content = yamlMatch[2];
          } else {
            meta = {};
          }

          // Push to site
          site[cleanName].push({
            name: name,
            path: fullPath,
            meta: meta,
            content: marked(content)
          });
          return queueCallback(null);
        });
      }, 5);

      if (err) throw err;
      queue.drain = function() {
        return callback(null, site);
      };
      queue.push(items);
    });
  });
};

module.exports.assets = function(callback) {
  var root = global.config.assets.path,
    exts = global.config.assets.parseExtensions,
    excludes = global.config.assets.parseExclude,
    files;

  files = wrench.readdirSyncRecursive(root).filter(function(file) {
    return exts.indexOf(path.extname(file)) > -1 && excludes.indexOf(file) == -1;
  });

  return callback(null, files);
};

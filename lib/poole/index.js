var async    = require('async'),
    wrench   = require('wrench'),
    discover = require('./discover'),
    build    = require('./build');

module.exports = function(config) {
    // Set globals
    global.config = config;

    async.parallel({
        // Discover content
        site: discover.contents,

        // Find parseable assets
        assets: discover.assets,

        // Clean output directory
        clean: function(callback) {
            wrench.rmdirRecursive(config.output, callback);
        }
    }, function(err, results) {
        if (err) throw err;

        // Set globals from results
        ['site', 'assets'].forEach(function(prop) {
            global[prop] = results[prop];
        });
        global.helpers = require('./helpers/')();

        // Begin build
        build();
    });
};
var config = require('./config');

if (!(engine = config.engine)) {
    throw new Error('Template engine is not set in config.json');
} else if (!require('consolidate')[engine]) {
    throw new Error('Consolidate.js does not support the `' + engine + '` template engine.');
}

require('./lib/poole')(config);
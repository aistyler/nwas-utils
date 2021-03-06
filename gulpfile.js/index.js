
// enable 'debug' log
process.env.DEBUG = '*';

//exports.default = require('./tasks/tar');
exports.tar = require('./tasks/tar');
exports.scp = require('./tasks/scp');
exports.script = require('./tasks/script');
exports.mongo = require('./tasks/mongo');
exports.dbdump = require('./tasks/dbdump');
exports.dbrestore = require('./tasks/dbrestore');
exports.generateConfig = require('./tasks/generate-config');
exports.tunnel = require('./tasks/tunnel');
exports.ghPages = require('./tasks/gh-pages');

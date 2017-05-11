var Gaze = require('gaze').Gaze;

module.exports = function(glob, opts, cb) {

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  var watcher = new Gaze(glob, opts);

  watcher.on('all', function(evt, path) {
    var outEvt = { type: evt, path: path };
    this.emit('change', outEvt);
    if (cb) {
      cb(outEvt);
    }
  });

  watcher.end = function() {
    return watcher.close();
  };

  return watcher;
};

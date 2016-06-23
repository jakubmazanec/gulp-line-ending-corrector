var LineEndingCorrector, PluginError, through;
LineEndingCorrector = require('line-ending-corrector').LineEndingCorrector;
PluginError = require('gulp-util').PluginError;
through = require('through2');
module.exports = function(opt) {
  var transform;
  transform = function(file, enc, cb) {
    var data, dest, output, str, wasAltered, _ref;
    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isStream()) {
      return cb(new PluginError('gulp-line-ending-corrector', 'Streaming not supported'));
    }
    data = void 0;
    str = file.contents.toString('utf8');
    dest = file.path;
    try {
      _ref = LineEndingCorrector.correctSync(str, opt), wasAltered = _ref[0], output = _ref[1];
      if (typeof opt === 'object' && 'verbose' in opt && opt.verbose) {
        console.log("lec " + dest + " : " + wasAltered);
      }
    } catch (err) {
      return cb(new PluginError('gulp-line-ending-corrector', err));
    }
    file.contents = new Buffer(output);
    file.path = dest;
    cb(null, file);
  };
  return through.obj(transform);
};
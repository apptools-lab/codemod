const path = require('path');
const util = require('util');
const glob = require('glob');
const executeTransforms = require('./executeTransforms');

const globPromise = util.promisify(glob);

// check mode run jscodeshift dry mode and return the check results
async function check(cwd, files) {
  const transforms = await globPromise('../transforms/*.js', { cwd: __dirname, nodir: true, realpath: true });
  const results = await executeTransforms(
    cwd,
    files,
    transforms,
    'check',
  );

  return results;
}

// run mode run jscodeshift write mode and return the cli output string
async function run(cwd, files, transform) {
  const results = await executeTransforms(
    cwd,
    files,
    [require.resolve(path.join(__dirname, '../transforms/', transform))],
    'run',
  );
  // just run one codemod each time
  return results[0];
}

module.exports = { check, run };

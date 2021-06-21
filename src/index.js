const path = require('path');
const util = require('util');
const globSync = require('glob');
const execute = require('./execute');

const glob = util.promisify(globSync);

// check mode run jscodeshift dry mode and return the check results
async function check(cwd, files) {
  const transforms = await glob('../transforms/*.js', { cwd: __dirname, nodir: true, realpath: true });
  const results = await execute(
    cwd,
    files,
    transforms,
    'check',
  );

  return results;
}

// run mode run jscodeshift write mode and return the cli output string
async function run(cwd, files, transform) {
  const results = await execute(
    cwd,
    files,
    [require.resolve(path.join(__dirname, '../transforms/', transform))],
    'run',
  );
  // just run one codemod each time
  return results[0];
}

module.exports = { check, run };

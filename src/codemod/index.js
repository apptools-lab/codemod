const glob = require('glob');
const executeTransforms = require('./executeTransforms');

// run jscodeshift with mode and return the results
async function run(cwd, rules, mode) {
  const files = glob.sync('**/*', { cwd, ignore: ['**/node_modules/**'], nodir: true, realpath: true });
  const results = await executeTransforms(
    cwd,
    files,
    rules,
    mode,
  );
  return results;
}


module.exports = run;

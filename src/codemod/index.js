const glob = require('glob');
const executeTransforms = require('./executeTransforms');

// run jscodeshift with mode and return the results
async function run(cwd, transforms, mode) {
  const files = glob.sync('**/*', { cwd, ignore: ['**/node_modules/**'], nodir: true, realpath: true });
  console.log(files);
  const results = await executeTransforms(
    cwd,
    files,
    transforms,
    mode,
  );
  return results;
}


module.exports = run;

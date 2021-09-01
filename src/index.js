const getTransforms = require('./getTransforms');
const executeTransforms = require('./executeTransforms');

// check mode run jscodeshift dry mode and return the check results
async function check(cwd, files) {
  const results = await executeTransforms(
    cwd,
    files,
    getTransforms(),
    'check',
  );

  return results;
}

// run mode run jscodeshift write mode and return the cli output string
async function run(cwd, files, transform) {
  const results = await executeTransforms(
    cwd,
    files,
    getTransforms(transform),
    'run',
  );
  // just run one codemod each time
  return results[0];
}

module.exports = { check, run };

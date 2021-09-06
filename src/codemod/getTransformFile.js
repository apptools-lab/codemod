const path = require('path');

function getTransformFile(key, transformConfig) {
  let transformFile = '';
  if (transformConfig.package && transformConfig.transform) {
    const packageDir = path.dirname(require.resolve(`${transformConfig.package}/package.json`));
    transformFile = path.join(packageDir, transformConfig.transform);
  } else {
    transformFile = require.resolve(path.join(__dirname, './transforms/', `${key}.js`));
  }
  return transformFile;
}

module.exports = getTransformFile;

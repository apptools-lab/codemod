const path = require('path');
const config = require('../transforms/config.json');

function getTransformFile(key, transformConfig) {
  let transformFile = '';
  if (transformConfig.package && transformConfig.transform) {
    const packageDir = path.dirname(require.resolve(`${transformConfig.package}/package.json`));
    transformFile = path.join(packageDir, transformConfig.transform);
  } else {
    transformFile = require.resolve(path.join(__dirname, '../transforms/', key));
  }
  return transformFile;
}

module.exports = function getTransforms(key) {
  let transforms = [];

  if (key) {
    transforms = [getTransformFile(key, config[key])];
  } else {
    transforms = Object.keys(config).map((k) => getTransformFile(k, config[k]));
  }
  return transforms;
};

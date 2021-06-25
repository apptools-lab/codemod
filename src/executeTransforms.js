const path = require('path');
const execa = require('execa');
const config = require('../transforms/config.json');
const { getProjectType, getProjectFramework, getProjectLanguageType } = require('@appworks/project-utils');

const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');

async function executeTransforms(cwd, files, transforms, mode) {
  // Add project info to transform option
  const transformOptions = [
    `--projectType=${await getProjectType(cwd, true)}`,
    `--projectFramework=${await getProjectFramework(cwd)}`,
    `--projectLanguageType=${await getProjectLanguageType(cwd)}`,
  ];

  const workers = transforms.map((transform) => {
    return async () => {
      let args = mode === 'check' ? ['--dry'] : [];

      args = args.concat(['--transform', transform]);
      args = args.concat(files);
      args = args.concat(transformOptions);

      const { stdout } = await execa(jscodeshiftExecutable, args);

      // Remove all colors/styles from strings https://stackoverflow.com/questions/25245716/remove-all-ansi-colors-styles-from-strings
      const output = stdout.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

      const transformName = path.basename(transform, path.extname(transform));
      const transformConfig = config[transformName] || {};
      if (
        mode === 'run' ||
        // check mode return can run codemods when
        // 1. jscodeshift show not 0 ok if matched
        // 2. codemod which severity >= 1
        (!/\n0 ok\n/.test(output) && transformConfig.severity >= 1)
      ) {
        return {
          ...transformConfig,
          transform: transformName,
          docs: `https://github.com/appworks-lab/codemod/tree/master/transforms/docs/${transformName}.md`,
          mode,
          output,
        };
      }
      return null;
    };
  });

  const results = await Promise.all(workers.map((work) => work()));
  return results.filter((result) => result);
}

module.exports = executeTransforms;

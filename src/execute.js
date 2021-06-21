const path = require('path');
const execa = require('execa');
const config = require('../transforms/config.json');
const { getProjectType, getProjectFramework, getProjectLanguageType } = require('@appworks/project-utils');

const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');

const REPOSITORY = 'https://github.com/appworks-lab/codemod';

async function execute(cwd, files, transforms, mode) {
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

      if (mode === 'run') {
        return output;
      } else {
        // jscodeshift show 0 ok if not matched
        if (!/\n0 ok\n/.test(output)) {
          const transformName = path.basename(transform, path.extname(transform));
          const transformConfig = config[transformName] || {};
          if (transformConfig.severity) {
            return {
              ...transformConfig,
              transform: transformName,
              docs: `${REPOSITORY}/tree/master/transforms/docs/${transformName}.md`,
            };
          }
        }
        return null;
      }
    };
  });

  const results = await Promise.all(workers.map((work) => work()));
  return results.filter((result) => result);
}

module.exports = execute;

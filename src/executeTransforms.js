const path = require('path');
const execa = require('execa');
const { getProjectType, getProjectFramework, getProjectLanguageType } = require('@appworks/project-utils');
const config = require('../transforms/config.json');

// Using 'jscodeshift/bin/jscodeshift' instead of '.bin/jscodeshift'
// For VS Code Extension environment which has been deleted '.bin/jscodeshift' by vsce
// By the way '!node_modules/.bin/jscodeshift' in .vsceignore doesn't work
const jscodeshiftExecutable = require.resolve('jscodeshift/bin/jscodeshift');

async function executeTransforms(cwd, files, transforms, mode, jscodeshiftAgs) {
  // Add project info to transform option
  const transformOptions = [
    `--projectType=${await getProjectType(cwd, true)}`,
    `--projectFramework=${await getProjectFramework(cwd)}`,
    `--projectLanguageType=${await getProjectLanguageType(cwd)}`,
  ];

  const workers = transforms.map((transform) => {
    return new Promise((resolve) => {
      let output = '';
      let args = mode === 'check' ? ['--dry'] : [];

      args = args.concat(['--transform', transform]);
      args = args.concat(files);
      args = args.concat(jscodeshiftAgs || []);
      args = args.concat(transformOptions);

      const transformName = path.basename(transform, path.extname(transform));
      const transformConfig = config[transformName] || {};

      const childProcess = execa(jscodeshiftExecutable, args);

      console.log(`Transform '${transformName}' start.`);

      childProcess.stdout.pipe(process.stdout);
      childProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      childProcess.on('exit', () => {
        // Remove all colors/styles from strings https://stackoverflow.com/questions/25245716/remove-all-ansi-colors-styles-from-strings
        output = output.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

        if (
          mode === 'run' ||
          // check mode return can run codemods when jscodeshift running ok and show changed count
          (/ok\n/.test(output) && !/\n0 ok\n/.test(output))
        ) {
          resolve({
            ...transformConfig,
            transform: transformName,
            docs: `https://github.com/appworks-lab/codemod/tree/master/transforms/docs/${transformName}.md`,
            mode,
            output,
          });
        }
        resolve(null);
      });
    });
  });

  const results = await Promise.all(workers);
  return results.filter((result) => result);
}

module.exports = executeTransforms;

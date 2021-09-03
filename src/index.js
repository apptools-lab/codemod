const runCodemod = require('./codemod');


const severityMap = {
  off: 0,
  warn: 1,
  error: 2,
};

function transformConfig(data) {
  if (typeof data !== 'object' || data == null) {
    if (data in severityMap) {
      return severityMap[data];
    }
    return data;
  }
  const proxyConfig = {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return transformConfig(res);
    },
  };
  return new Proxy(data, proxyConfig);
}

async function run(cwd, config, fix = false) {
  config = JSON.parse(JSON.stringify(transformConfig(config)));
  const result = {
    codemod: await runCodemod(cwd, config.codemod, fix ? 'fix' : 'check') || undefined,
  };
  return JSON.parse(JSON.stringify(result));
}

module.exports = run;


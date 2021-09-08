# @appworks/project-lint

Lint tool on project level for [rax](https://rax.js.org/), [ice](https://ice.work/) and react project.

## Install

```bash
$ npm i @appworks/project-lint --save-dev
```

## Usage

### Run()

You can use the `run` method to execute project-lint.

Options:

- cwd: string, the target directory path
- config: object, the project-lint configuration.
- fix? : boolean, pre-check or fix the target source code. default: false.

Return:

- result: IResult (see interface), run project-lint result.

Example:

```javascript
import run from "@appworks/project-lint";

const dir = "/xxx/xx";

const config = {
  "plugin-rax-component-to-component": "error",
  "lint-config-to-spec": "warn",
};

run(dir, config, true);
```

#### Interface

IResult:

```typescript
interface ICodemodResult {
  transform: string; // transform key, see `Included Transforms`
  title: string; // transform description title
  title_en: string;
  message: string; // transform description message
  message_en: string;
  severity: 0 | 1 | 2; // 0: advice 1: warning 2: error
  mode: "fix" | "check"; // mode, see API
  docs: string; // docs url
  output: string; // jscodeshift CLI output
  npm_deprecate?: string; // same as https://docs.npmjs.com/cli/v7/commands/npm-deprecate/
}

interface IResult {
  codemod: ICodemodResult[]; // codemod result.
  [rule: string]: any;
}
```

## Included Transforms

### 1. `plugin-rax-component-to-component`

Update `plugin-rax-component` to `plugin-component`. [docs](./transforms/docs/plugin-rax-component-to-component.md)

### 2. `lint-config-to-spec`

Follow Alibaba FED lint rules, and use `@iceworks/spec` best practices. [docs](./transforms/docs/lint-config-to-spec.md)

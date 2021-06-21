# @appworks/codemod

AppWorks codemod scripts for [rax](https://rax.js.org/), [ice](https://ice.work/) and react project.

## Usage

### 1. CLI

```bash
$ npx @appworks/codemod <transform> <path> [...options?]
```

- `transform` - name of transform, see available transforms below.
- `path` - files or directory to transform.
- `options?` - option for [jscodeshift](https://www.npmjs.com/package/jscodeshift).

Example:

```bash
$ npx @appworks/codemod plugin-rax-component-to-component ./
```

### 2. API

#### Install

```bash
$ npm i @appworks/codemod --save
```

#### Interface

IResult:

```typescript
interface IResult {
  transform: string; // transform key, see `Included Transforms`
  title: string; // transform description title
  message: string; // transform description message
  severity: 0 | 1 | 2; // 0: advice 1: warning 2: error
  mode: "run" | "check"; // mode, see below methods
  docs: string; // docs url
  output: string; // jscodeshift CLI output
  "npm-deprecate"?: string; // same as https://docs.npmjs.com/cli/v7/commands/npm-deprecate/
}
```

#### Check

You can retrieve the recommended codemod of the current project through the `check` method.

Options:

- directory: string, the target directory path
- files: string[], the target directory files path array

Return:

- results: IResult[], the target project recommended codemod info array.

Example:

```javascript
import glob from "glob";
import { check } from "@appworks/codemod";

const dir = "/xxx/xx";

glob(
  "**/*",
  { cwd: dir, ignore: ["**/node_modules/**"], nodir: true, realpath: true },
  function (er, files) {
    check(dir, files).then((results) => {
      console.log(results);
    });
  }
);
```

#### Run

You can use the `run` method to execute specific codemod.

Options:

- directory: string, the target directory path
- files: string[], the target directory files path array
- transform: string, the name of transform, see available transforms below.

Return:

- result: IResult, run codemod result.

Example:

```javascript
import glob from "glob";
import { check } from "@appworks/codemod";

const dir = "/xxx/xx";

glob(
  "**/*",
  { cwd: dir, ignore: ["**/node_modules/**"], nodir: true, realpath: true },
  function (er, files) {
    run(dir, files, "plugin-rax-component-to-component").then((result) => {
      console.log(result);
    });
  }
);
```

## Included Transforms

### 1. `plugin-rax-component-to-component`

Update `plugin-rax-component` to `plugin-component`. [docs](https://github.com/appworks-lab/codemod/blob/master/docs/plugin-rax-component-to-component.md)

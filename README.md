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

#### Check

You can retrieve the recommended codemod of the current project through the `check` method.

Options:

- directory: string, the target directory path
- files: string[], the target directory files path array

Return:

```typescript
interface IResult {
  transform: string;
  title: string;
  message: string;
  severity: 0 | 1 | 2;
  docs: string;
  "npm-deprecate"?: string;
}
```

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

- output: string, the codemod cli output.

Example:

```javascript
import glob from "glob";
import { check } from "@appworks/codemod";

const dir = "/xxx/xx";

glob(
  "**/*",
  { cwd: dir, ignore: ["**/node_modules/**"], nodir: true, realpath: true },
  function (er, files) {
    run(dir, files, "plugin-rax-component-to-component").then((output) => {
      console.log(output);
    });
  }
);
```

## Included Transforms

### 1. `plugin-rax-component-to-component`

Update `plugin-rax-component` to `plugin-component`. [docs](https://github.com/appworks-lab/codemod/blob/master/docs/plugin-rax-component-to-component.md)

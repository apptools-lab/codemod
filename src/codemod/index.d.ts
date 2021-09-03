export interface IResult {
  transform: string; // transform key, see `Included Transforms`
  title: string; // transform description title
  title_en: string;
  message: string; // transform description message
  message_en: string;
  severity: 0 | 1 | 2; // 0: advice 1: warning 2: error
  mode: "run" | "check"; // mode, see API
  docs: string; // docs url
  output: string; // jscodeshift CLI output
  npm_deprecate?: string; // same as https://docs.npmjs.com/cli/v7/commands/npm-deprecate/
}

export type severity = 'off' | 'warn' | 'error';

export interface ITransforms {
  [name: string]: severity;
}

// export function check(cwd: string, files: string[]): Promise<IResult[]>;
// export function fix(cwd: string, files: string[], transform: string): Promise<IResult[]>;

export function run(cwd: string, transforms: ITransforms, mode: 'check' | 'fix'): Promise<IResult[]>;
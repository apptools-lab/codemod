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

export function check(cwd: string, files: string[]): Promise<IResult[]>;
export function run(cwd: string, files: string[], transform: string): Promise<IResult>;

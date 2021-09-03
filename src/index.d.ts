import { ICodemodResult } from './codemod';

export interface IResult {
  codemod: ICodemodResult[];
  [rule: string]: any;
}

export function run(cwd: string, config: any, fix: boolean): Promise<IResult>;
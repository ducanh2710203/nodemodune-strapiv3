import { IParseOptions } from './src/parser';
import { Options, MessageFormatElement } from './src/types';
export * from './src/types';
export * from './src/parser';
export * from './src/skeleton';
export declare type ParseOptions = Options & IParseOptions;
export declare function parse(input: string, opts?: ParseOptions): MessageFormatElement[];
//# sourceMappingURL=index.d.ts.map
import { LocaleData } from './types/core';
export declare function getLocaleHierarchy(locale: string): string[];
declare class MissingLocaleDataError extends Error {
    type: string;
}
export declare function isMissingLocaleDataError(e: Error): e is MissingLocaleDataError;
export declare function unpackData<T extends Record<string, any>>(locale: string, localeData: LocaleData<T>, 
/** By default shallow merge the dictionaries. */
reducer?: (all: T, d: T) => T): T;
export {};
//# sourceMappingURL=data.d.ts.map
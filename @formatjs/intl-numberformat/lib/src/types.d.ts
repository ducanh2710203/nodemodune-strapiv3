import { NumberFormatLocaleInternalData, RawNumberLocaleData, ResolvedNumberFormatOptions, NumberFormatOptions, NumberFormatPart } from '@formatjs/ecma402-abstract';
export interface NumberFormat {
    resolvedOptions(): ResolvedNumberFormatOptions;
    formatToParts(x: number): NumberFormatPart[];
    format(x: number): string;
}
export interface NumberFormatConstructor {
    new (locales?: string | string[], options?: NumberFormatOptions): NumberFormat;
    (locales?: string | string[], options?: NumberFormatOptions): NumberFormat;
    __addLocaleData(...data: RawNumberLocaleData[]): void;
    supportedLocalesOf(locales: string | string[], options?: Pick<NumberFormatOptions, 'localeMatcher'>): string[];
    getDefaultLocale(): string;
    __defaultLocale: string;
    localeData: Record<string, NumberFormatLocaleInternalData | undefined>;
    availableLocales: string[];
    polyfilled: boolean;
}
//# sourceMappingURL=types.d.ts.map
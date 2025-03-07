import { NumberFormatInternal, NumberFormatOptions, NumberFormatLocaleInternalData } from '../types/number';
/**
 * https://tc39.es/ecma402/#sec-initializenumberformat
 */
export declare function InitializeNumberFormat(nf: Intl.NumberFormat, locales: string | string[] | undefined, opts: NumberFormatOptions | undefined, { getInternalSlots, localeData, availableLocales, numberingSystemNames, getDefaultLocale, currencyDigitsData, }: {
    getInternalSlots(nf: Intl.NumberFormat): NumberFormatInternal;
    localeData: Record<string, NumberFormatLocaleInternalData | undefined>;
    availableLocales: string[];
    numberingSystemNames: string[];
    getDefaultLocale(): string;
    currencyDigitsData: Record<string, number>;
}): Intl.NumberFormat;
//# sourceMappingURL=InitializeNumberFormat.d.ts.map
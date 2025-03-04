import { ListPatternLocaleData, ListPatternFieldsData, LiteralPart } from '@formatjs/intl-utils';
export interface IntlListFormatOptions {
    /**
     * The locale matching algorithm to use.
     * Possible values are "lookup" and "best fit"; the default is "best fit".
     * For information about this option, see
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation.
     */
    localeMatcher?: 'best fit' | 'lookup';
    /**
     * The format of output message. Possible values are:
     * - "always" (default, e.g., 1 day ago),
     * - or "auto" (e.g., yesterday).
     * The "auto" value allows to not always have to
     * use numeric values in the output.
     */
    type?: 'conjunction' | 'disjunction' | 'unit';
    /**
     * The length of the internationalized message. Possible values are:
     * - "long" (default, e.g., in 1 month)
     * - "short" (e.g., in 1 mo.),
     * - or "narrow" (e.g., in 1 mo.).
     * The narrow style could be similar to the short style for some locales.
     */
    style?: 'long' | 'short' | 'narrow';
}
export interface ResolvedIntlListFormatOptions {
    /**
     * The BCP 47 language tag for the locale actually used.
     * If any Unicode extension values were requested in the
     * input BCP 47 language tag that led to this locale,
     * the key-value pairs that were requested and are
     * supported for this locale are included in locale.
     */
    locale: string;
    /**
     * The format of output message. Possible values are:
     * - "always" (default, e.g., 1 day ago),
     * - or "auto" (e.g., yesterday).
     * The "auto" value allows to not always have to
     * use numeric values in the output.
     */
    type: 'conjunction' | 'disjunction' | 'unit';
    /**
     * The length of the internationalized message. Possible values are:
     * - "long" (default, e.g., in 1 month)
     * - "short" (e.g., in 1 mo.),
     * - or "narrow" (e.g., in 1 mo.).
     * The narrow style could be similar to the short style for some locales.
     */
    style: 'long' | 'short' | 'narrow';
}
export declare type Part = LiteralPart | ElementPart;
export interface ElementPart {
    type: 'element';
    value: string;
}
export default class ListFormat {
    constructor(locales?: string | string[], options?: IntlListFormatOptions);
    format(elements: string[]): string;
    formatToParts(elements: string[]): Part[];
    resolvedOptions(): ResolvedIntlListFormatOptions;
    static supportedLocalesOf(locales: string | string[], options?: Pick<IntlListFormatOptions, 'localeMatcher'>): string[];
    static __addLocaleData(...data: ListPatternLocaleData[]): void;
    static localeData: Record<string, ListPatternFieldsData>;
    private static availableLocales;
    private static __defaultLocale;
    private static getDefaultLocale;
    private static relevantExtensionKeys;
    static polyfilled: boolean;
    private static readonly __INTERNAL_SLOT_MAP__;
}
//# sourceMappingURL=core.d.ts.map
import { RelativeTimeFormat, IntlRelativeTimeFormatOptions, RelativeTimeFormatInternal, LocaleFieldsData } from '../types/relative-time';
export declare function InitializeRelativeTimeFormat(rtf: RelativeTimeFormat, locales: string | string[] | undefined, options: IntlRelativeTimeFormatOptions | undefined, { getInternalSlots, availableLocales, relevantExtensionKeys, localeData, getDefaultLocale, }: {
    getInternalSlots(rtf: RelativeTimeFormat): RelativeTimeFormatInternal;
    availableLocales: string[];
    relevantExtensionKeys: string[];
    localeData: Record<string, LocaleFieldsData | undefined>;
    getDefaultLocale(): string;
}): RelativeTimeFormat;
//# sourceMappingURL=InitializeRelativeTimeFormat.d.ts.map
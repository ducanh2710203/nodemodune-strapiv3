import * as React_2 from 'react';

declare type ArgumentElement = BaseElement<TYPE.argument>;

declare interface BaseElement<T extends TYPE> {
    type: T;
    value: string;
    location?: Location_2;
}

/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
export declare function createIntl(config: OptionalIntlConfig, cache?: IntlCache): IntlShape;

export declare function createIntlCache(): IntlCache;

declare type CurrencyCode = string;

export declare interface CustomFormatConfig {
    format?: string;
}

export declare interface CustomFormats extends Partial<Formats> {
    relative?: Record<string, IntlRelativeTimeFormatOptions>;
}

declare type DateElement = SimpleFormatElement<TYPE.date, DateTimeSkeleton>;

declare interface DateTimeSkeleton {
    type: SKELETON_TYPE.dateTime;
    pattern: string;
    location?: Location_2;
}

declare const DEFAULT_INTL_CONFIG: Pick<IntlConfig, 'formats' | 'messages' | 'timeZone' | 'textComponent' | 'defaultLocale' | 'defaultFormats' | 'onError'>;

export declare function defineMessage<T>(msg: T): T;

export declare function defineMessages<T, U extends Record<string, T>>(msgs: U): U;

declare class DisplayNames {
    constructor(locales?: string | string[], options?: DisplayNamesOptions);
    static supportedLocalesOf(locales?: string | string[], options?: Pick<DisplayNamesOptions, 'localeMatcher'>): string[];
    static __addLocaleData(...data: DisplayNamesLocaleData[]): void;
    of(code: string | number | object): string | undefined;
    resolvedOptions(): DisplayNamesResolvedOptions;
    static localeData: Record<string, DisplayNamesData>;
    private static availableLocales;
    private static __defaultLocale;
    private static getDefaultLocale;
    static readonly polyfilled = true;
}

declare interface DisplayNamesData {
    /**
     * Note that for style fields, `short` and `narrow` might not exist.
     * At runtime, the fallback order will be narrow -> short -> long.
     */
    types: {
        /**
         * Maps language subtag like `zh-CN` to their display names.
         */
        language: {
            narrow: Record<LanguageTag, string>;
            short: Record<LanguageTag, string>;
            long: Record<LanguageTag, string>;
        };
        region: {
            narrow: Record<RegionCode, string>;
            short: Record<RegionCode, string>;
            long: Record<RegionCode, string>;
        };
        script: {
            narrow: Record<ScriptCode, string>;
            short: Record<ScriptCode, string>;
            long: Record<ScriptCode, string>;
        };
        currency: {
            narrow: Record<CurrencyCode, string>;
            short: Record<CurrencyCode, string>;
            long: Record<CurrencyCode, string>;
        };
    };
    /**
     * Not in spec, but we need this to display both language and region in display name.
     * e.g. zh-Hans-SG + "{0}（{1}）" -> 简体中文（新加坡）
     * Here {0} is replaced by language display name and {1} is replaced by region display name.
     */
    patterns: {
        locale: string;
    };
}

declare type DisplayNamesLocaleData = LocaleData<DisplayNamesData>;

declare interface DisplayNamesOptions {
    localeMatcher?: 'lookup' | 'best fit';
    style?: 'narrow' | 'short' | 'long';
    type?: 'language' | 'region' | 'script' | 'currency';
    fallback?: 'code' | 'none';
}

declare interface DisplayNamesResolvedOptions {
    locale: string;
    style: NonNullable<DisplayNamesOptions['style']>;
    type: NonNullable<DisplayNamesOptions['type']>;
    fallback: NonNullable<DisplayNamesOptions['fallback']>;
}

declare interface ElementPart {
    type: 'element';
    value: string;
}

declare const enum ErrorCode {
    MISSING_VALUE = "MISSING_VALUE",
    INVALID_VALUE = "INVALID_VALUE",
    MISSING_INTL_API = "MISSING_INTL_API"
}

declare interface FieldData {
    '0'?: string;
    '1'?: string;
    '-1'?: string;
    '2'?: string;
    '-2'?: string;
    '3'?: string;
    '-3'?: string;
    future: RelativeTimeData;
    past: RelativeTimeData;
}

export declare type FormatDateOptions = Exclude<Intl.DateTimeFormatOptions, 'localeMatcher'> & CustomFormatConfig;

export declare type FormatDisplayNameOptions = Exclude<DisplayNamesOptions, 'localeMatcher'>;

declare class FormatError extends Error {
    readonly code: ErrorCode;
    /**
     * Original message we're trying to format
     * `undefined` if we're only dealing w/ AST
     *
     * @type {(string | undefined)}
     * @memberof FormatError
     */
    readonly originalMessage: string | undefined;
    constructor(msg: string, code: ErrorCode, originalMessage?: string);
    toString(): string;
}

export declare type FormatListOptions = Exclude<IntlListFormatOptions, 'localeMatcher'>;

export declare type FormatNumberOptions = Exclude<UnifiedNumberFormatOptions, 'localeMatcher'> & CustomFormatConfig;

export declare type FormatPluralOptions = Exclude<Intl.PluralRulesOptions, 'localeMatcher'> & CustomFormatConfig;

export declare type FormatRelativeTimeOptions = Exclude<IntlRelativeTimeFormatOptions, 'localeMatcher'> & CustomFormatConfig;

declare interface Formats {
    number: Record<string, Intl.NumberFormatOptions>;
    date: Record<string, Intl.DateTimeFormatOptions>;
    time: Record<string, Intl.DateTimeFormatOptions>;
}

declare type FormattableUnit = Unit | Units;

export declare const FormattedDate: React_2.FC<Intl.DateTimeFormatOptions & CustomFormatConfig & {
    value: string | number | Date | undefined;
}>;

export declare const FormattedDateParts: React_2.FC<Intl.DateTimeFormatOptions & CustomFormatConfig & {
    value: string | number | Date | undefined;
    children(val: Intl.DateTimeFormatPart[]): React_2.ReactElement<any, string | ((props: any) => React_2.ReactElement<any, string | any | (new (props: any) => React_2.Component<any, any, any>)> | null) | (new (props: any) => React_2.Component<any, any, any>)> | null;
}>;

export declare const FormattedDisplayName: React_2.FC<DisplayNamesOptions & {
    value: string | number | object;
}>;

export declare const FormattedList: React_2.FC<IntlListFormatOptions & {
    value: React_2.ReactNode[];
}>;

export declare class FormattedMessage<V extends Record<string, any> = Record<string, PrimitiveType | React_2.ReactElement | FormatXMLElementFn<React_2.ReactNode, React_2.ReactNode>>> extends React_2.Component<Props_3<V>> {
    static displayName: string;
    static defaultProps: {
        values: {};
    };
    shouldComponentUpdate(nextProps: Props_3<V>): boolean;
    render(): JSX.Element;
}

export declare const FormattedNumber: React_2.FC<UnifiedNumberFormatOptions & CustomFormatConfig & {
    value: number;
}>;

export declare const FormattedNumberParts: React_2.FC<Formatter['formatNumber'] & {
    value: Parameters<IntlShape['formatNumber']>[0];
    children(val: Intl.NumberFormatPart[]): React_2.ReactElement | null;
}>;

export declare const FormattedPlural: React_2.ForwardRefExoticComponent<Pick<Props_2, "children" | "other" | "zero" | "one" | "two" | "few" | "many" | "localeMatcher" | "format" | "type" | "value"> & {
    forwardedRef?: ((instance: any) => void) | React_2.RefObject<any> | null | undefined;
} & React_2.RefAttributes<any>> & {
    WrappedComponent: React_2.ComponentType<Props_2>;
};

export declare class FormattedRelativeTime extends React_2.PureComponent<Props, State_2> {
    _updateTimer: any;
    static displayName: string;
    static defaultProps: Pick<Props, 'unit' | 'value'>;
    state: State_2;
    constructor(props: Props);
    scheduleNextUpdate({ updateIntervalInSeconds, unit }: Props, { currentValueInSeconds }: State_2): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    static getDerivedStateFromProps(props: Props, state: State_2): Partial<State_2> | null;
    render(): JSX.Element;
}

export declare const FormattedTime: React_2.FC<Intl.DateTimeFormatOptions & CustomFormatConfig & {
    value: string | number | Date | undefined;
}>;

export declare const FormattedTimeParts: React_2.FC<Intl.DateTimeFormatOptions & CustomFormatConfig & {
    value: string | number | Date | undefined;
    children(val: Intl.DateTimeFormatPart[]): React_2.ReactElement<any, string | ((props: any) => React_2.ReactElement<any, string | any | (new (props: any) => React_2.Component<any, any, any>)> | null) | (new (props: any) => React_2.Component<any, any, any>)> | null;
}>;

declare type Formatter = {
    formatDate: FormatDateOptions;
    formatTime: FormatDateOptions;
    formatNumber: FormatNumberOptions;
    formatList: FormatListOptions;
    formatDisplayName: FormatDisplayNameOptions;
};

export declare interface Formatters {
    getDateTimeFormat(...args: ConstructorParameters<typeof Intl.DateTimeFormat>): Intl.DateTimeFormat;
    getNumberFormat(...args: ConstructorParameters<typeof Intl.NumberFormat>): Intl.NumberFormat;
    getMessageFormat(...args: ConstructorParameters<typeof IntlMessageFormat>): IntlMessageFormat;
    getRelativeTimeFormat(...args: ConstructorParameters<typeof RelativeTimeFormat>): RelativeTimeFormat;
    getPluralRules(...args: ConstructorParameters<typeof Intl.PluralRules>): Intl.PluralRules;
    getListFormat(...args: ConstructorParameters<typeof ListFormat>): ListFormat;
    getDisplayNames(...args: ConstructorParameters<typeof DisplayNames>): DisplayNames;
}

declare interface Formatters_2 {
    getNumberFormat(...args: ConstructorParameters<typeof Intl.NumberFormat>): Intl.NumberFormat;
    getDateTimeFormat(...args: ConstructorParameters<typeof Intl.DateTimeFormat>): Intl.DateTimeFormat;
    getPluralRules(...args: ConstructorParameters<typeof Intl.PluralRules>): Intl.PluralRules;
}

declare type FormatXMLElementFn<T, R = string | Array<string | T>> = (...args: Array<string | T>) => R;

export declare function injectIntl<IntlPropName extends string, P extends WrappedComponentProps<IntlPropName> = WrappedComponentProps<any>>(WrappedComponent: React_2.ComponentType<P>, options?: Opts<IntlPropName, false>): React_2.FC<WithIntlProps<P>> & {
    WrappedComponent: React_2.ComponentType<P>;
};

export declare function injectIntl<IntlPropName extends string = 'intl', P extends WrappedComponentProps<IntlPropName> = WrappedComponentProps<any>, T extends React_2.ComponentType<P> = any>(WrappedComponent: React_2.ComponentType<P>, options?: Opts<IntlPropName, true>): React_2.ForwardRefExoticComponent<React_2.PropsWithoutRef<WithIntlProps<P>> & React_2.RefAttributes<T>> & {
    WrappedComponent: React_2.ComponentType<P>;
};

export declare interface IntlCache {
    dateTime: Record<string, Intl.DateTimeFormat>;
    number: Record<string, Intl.NumberFormat>;
    message: Record<string, IntlMessageFormat>;
    relativeTime: Record<string, RelativeTimeFormat>;
    pluralRules: Record<string, Intl.PluralRules>;
    list: Record<string, ListFormat>;
    displayNames: Record<string, DisplayNames>;
}

export declare interface IntlConfig {
    locale: string;
    timeZone?: string;
    formats: CustomFormats;
    textComponent?: React_2.ComponentType | keyof React_2.ReactHTML;
    messages: Record<string, string> | Record<string, MessageFormatElement[]>;
    defaultLocale: string;
    defaultFormats: CustomFormats;
    wrapRichTextChunksInFragment?: boolean;
    onError(err: ReactIntlError | FormatError): void;
}

export declare const IntlContext: React_2.Context<IntlShape>;

export declare interface IntlFormatters<T = React_2.ReactNode, R = T> {
    formatDate(value: Parameters<Intl.DateTimeFormat['format']>[0] | string, opts?: FormatDateOptions): string;
    formatTime(value: Parameters<Intl.DateTimeFormat['format']>[0] | string, opts?: FormatDateOptions): string;
    formatDateToParts(value: Parameters<Intl.DateTimeFormat['format']>[0] | string, opts?: FormatDateOptions): Intl.DateTimeFormatPart[];
    formatTimeToParts(value: Parameters<Intl.DateTimeFormat['format']>[0] | string, opts?: FormatDateOptions): Intl.DateTimeFormatPart[];
    formatRelativeTime(value: Parameters<RelativeTimeFormat['format']>[0], unit?: Parameters<RelativeTimeFormat['format']>[1], opts?: FormatRelativeTimeOptions): string;
    formatNumber(value: Parameters<Intl.NumberFormat['format']>[0], opts?: FormatNumberOptions): string;
    formatNumberToParts(value: Parameters<Intl.NumberFormat['format']>[0], opts?: FormatNumberOptions): Intl.NumberFormatPart[];
    formatPlural(value: Parameters<Intl.PluralRules['select']>[0], opts?: FormatPluralOptions): ReturnType<Intl.PluralRules['select']>;
    formatMessage(descriptor: MessageDescriptor, values?: Record<string, PrimitiveType>): string;
    formatMessage(descriptor: MessageDescriptor, values?: Record<string, PrimitiveType | React_2.ReactElement | FormatXMLElementFn<T, R>>): string | React_2.ReactNodeArray;
    formatList(values: Array<string>, opts?: FormatListOptions): string;
    formatList(values: Array<string | React_2.ReactNode>, opts?: FormatListOptions): React_2.ReactNode;
    formatDisplayName(value: Parameters<DisplayNames['of']>[0], opts?: FormatDisplayNameOptions): string | undefined;
}

declare interface IntlListFormatOptions {
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

declare class IntlMessageFormat {
    private readonly ast;
    private readonly locales;
    private readonly formatters;
    private readonly formats;
    private readonly message;
    private readonly formatterCache;
    constructor(message: string | MessageFormatElement[], locales?: string | string[], overrideFormats?: Partial<Formats>, opts?: Options);
    format: <T = void>(values?: Record<string, string | number | boolean | Date | T | FormatXMLElementFn<T, string | (string | T)[]> | null | undefined> | undefined) => string | T | (string | T)[];
    formatToParts: <T>(values?: Record<string, string | number | boolean | Date | T | FormatXMLElementFn<T, string | (string | T)[]> | null | undefined> | undefined) => MessageFormatPart<T>[];
    resolvedOptions: () => {
        locale: string;
    };
    getAst: () => MessageFormatElement[];
    private static memoizedDefaultLocale;
    static get defaultLocale(): string;
    static __parse: typeof parse | undefined;
    static formats: {
        number: {
            currency: {
                style: string;
            };
            percent: {
                style: string;
            };
        };
        date: {
            short: {
                month: string;
                day: string;
                year: string;
            };
            medium: {
                month: string;
                day: string;
                year: string;
            };
            long: {
                month: string;
                day: string;
                year: string;
            };
            full: {
                weekday: string;
                month: string;
                day: string;
                year: string;
            };
        };
        time: {
            short: {
                hour: string;
                minute: string;
            };
            medium: {
                hour: string;
                minute: string;
                second: string;
            };
            long: {
                hour: string;
                minute: string;
                second: string;
                timeZoneName: string;
            };
            full: {
                hour: string;
                minute: string;
                second: string;
                timeZoneName: string;
            };
        };
    };
}

export declare class IntlProvider extends React_2.PureComponent<OptionalIntlConfig, State> {
    static displayName: string;
    static defaultProps: Pick<IntlConfig, "formats" | "messages" | "timeZone" | "textComponent" | "defaultLocale" | "defaultFormats" | "onError">;
    private cache;
    state: State;
    static getDerivedStateFromProps(props: OptionalIntlConfig, { prevConfig, cache }: State): Partial<State> | null;
    render(): JSX.Element;
}

declare interface IntlRelativeTimeFormatOptions {
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
    numeric?: 'always' | 'auto';
    /**
     * The length of the internationalized message. Possible values are:
     * - "long" (default, e.g., in 1 month)
     * - "short" (e.g., in 1 mo.),
     * - or "narrow" (e.g., in 1 mo.).
     * The narrow style could be similar to the short style for some locales.
     */
    style?: 'long' | 'short' | 'narrow';
}

export declare interface IntlShape extends IntlConfig, IntlFormatters {
    formatters: Formatters;
}

declare interface IParseOptions {
    filename?: string;
    startRule?: string;
    tracer?: any;
    [key: string]: any;
}

declare type LanguageTag = string;

declare type LDMLPluralRule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

declare class ListFormat {
    constructor(locales?: string | string[], options?: IntlListFormatOptions);
    format(elements: string[]): string;
    formatToParts(elements: string[]): Part_2[];
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

declare interface ListPattern {
    start: string;
    middle: string;
    end: string;
    pair: string;
}

declare interface ListPatternData {
    long: ListPattern;
    short?: ListPattern;
    narrow?: ListPattern;
}

declare interface ListPatternFieldsData {
    conjunction?: ListPatternData;
    disjunction?: ListPatternData;
    unit?: ListPatternData;
}

declare type ListPatternLocaleData = LocaleData<ListPatternFieldsData>;

declare type LiteralElement = BaseElement<TYPE.literal>;

declare interface LiteralPart {
    type: 'literal';
    value: string;
}

declare interface LiteralPart_2 {
    type: PART_TYPE.literal;
    value: string;
}

declare type Locale = string;

declare interface LocaleData<T> {
    data: Record<Locale, T>;
    aliases: Record<string, string>;
    availableLocales: string[];
    parentLocales: Record<string, string>;
}

declare type LocaleFieldsData = {
    [f in RelativeTimeField]?: FieldData;
} & {
    nu?: Array<string | null>;
};

declare interface Location_2 {
    start: LocationDetails;
    end: LocationDetails;
}

declare interface LocationDetails {
    offset: number;
    line: number;
    column: number;
}

export declare interface MessageDescriptor {
    id?: string | number;
    description?: string | object;
    defaultMessage?: string;
}

declare type MessageFormatElement = LiteralElement | ArgumentElement | NumberElement | DateElement | TimeElement | SelectElement | PluralElement | TagElement | PoundElement;

declare type MessageFormatPart<T> = LiteralPart_2 | ObjectPart<T>;

declare type NumberElement = SimpleFormatElement<TYPE.number, NumberSkeleton>;

declare interface NumberFormatDigitOptions {
    minimumIntegerDigits?: number;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    minimumSignificantDigits?: number;
    maximumSignificantDigits?: number;
}

declare interface NumberSkeleton {
    type: SKELETON_TYPE.number;
    tokens: NumberSkeletonToken[];
    location?: Location_2;
}

declare interface NumberSkeletonToken {
    stem: string;
    options: string[];
}

declare interface ObjectPart<T = any> {
    type: PART_TYPE.object;
    value: T;
}

declare type Omit_2<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
export { Omit_2 as Omit }

declare type OptionalIntlConfig = Omit_2<IntlConfig, keyof typeof DEFAULT_INTL_CONFIG> & Partial<typeof DEFAULT_INTL_CONFIG>;

declare interface Options {
    formatters?: Formatters_2;
}

declare interface Options_2 {
    /**
     * Whether to convert `#` in plural rule options
     * to `{var, number}`
     * Default is true
     */
    normalizeHashtagInPlural?: boolean;
    /**
     * Capture location info in AST
     * Default is false
     */
    captureLocation?: boolean;
}

declare interface Opts<IntlPropName extends string = 'intl', ForwardRef extends boolean = false> {
    intlPropName?: IntlPropName;
    forwardRef?: ForwardRef;
    enforceContext?: boolean;
}

declare function parse(input: string, opts?: ParseOptions): MessageFormatElement[];

declare type ParseOptions = Options_2 & IParseOptions;

declare type Part = LiteralPart | RelativeTimeFormatNumberPart;

declare type Part_2 = LiteralPart | ElementPart;

declare const enum PART_TYPE {
    literal = 0,
    object = 1
}

declare interface PluralElement extends BaseElement<TYPE.plural> {
    options: Record<ValidPluralRule, PluralOrSelectOption>;
    offset: number;
    pluralType: Intl.PluralRulesOptions['type'];
}

declare interface PluralOrSelectOption {
    value: MessageFormatElement[];
    location?: Location_2;
}

declare interface PoundElement {
    type: TYPE.pound;
    location?: Location_2;
}

declare type PrimitiveType = string | number | boolean | null | undefined | Date;

declare interface Props extends FormatRelativeTimeOptions {
    value?: number;
    unit?: Unit;
    updateIntervalInSeconds?: number;
    children?(value: string): React_2.ReactChild;
}

declare interface Props_2 extends FormatPluralOptions {
    value: number;
    intl: IntlShape;
    other: React_2.ReactNode;
    zero?: React_2.ReactNode;
    one?: React_2.ReactNode;
    two?: React_2.ReactNode;
    few?: React_2.ReactNode;
    many?: React_2.ReactNode;
    children?(value: React_2.ReactNode): React_2.ReactElement | null;
}

declare interface Props_3<V extends Record<string, any> = Record<string, React_2.ReactNode>> extends MessageDescriptor {
    values?: V;
    tagName?: React_2.ElementType<any>;
    children?(...nodes: React_2.ReactNodeArray): React_2.ReactNode;
}

export declare const RawIntlProvider: React_2.Provider<IntlShape>;

export declare class ReactIntlError extends Error {
    readonly code: ReactIntlErrorCode;
    readonly descriptor?: MessageDescriptor;
    constructor(code: ReactIntlErrorCode, message: string, descriptor?: MessageDescriptor, exception?: Error);
}

export declare const enum ReactIntlErrorCode {
    FORMAT_ERROR = "FORMAT_ERROR",
    UNSUPPORTED_FORMATTER = "UNSUPPORTED_FORMATTER",
    INVALID_CONFIG = "INVALID_CONFIG",
    MISSING_DATA = "MISSING_DATA",
    MISSING_TRANSLATION = "MISSING_TRANSLATION"
}

declare type RegionCode = string;

declare type RelativeTimeData = {
    [u in LDMLPluralRule]?: string;
};

declare type RelativeTimeField = 'second' | 'second-short' | 'second-narrow' | 'minute' | 'minute-short' | 'minute-narrow' | 'hour' | 'hour-short' | 'hour-narrow' | 'day' | 'day-short' | 'day-narrow' | 'week' | 'week-short' | 'week-narrow' | 'month' | 'month-short' | 'month-narrow' | 'quarter' | 'quarter-short' | 'quarter-narrow' | 'year' | 'year-short' | 'year-narrow';

declare class RelativeTimeFormat {
    constructor(locales?: string | string[], options?: IntlRelativeTimeFormatOptions);
    format(value: number, unit: FormattableUnit): string;
    formatToParts(value: number, unit: FormattableUnit): Part[];
    resolvedOptions(): ResolvedIntlRelativeTimeFormatOptions;
    static supportedLocalesOf(locales: string | string[], options?: Pick<IntlRelativeTimeFormatOptions, 'localeMatcher'>): string[];
    static __addLocaleData(...data: RelativeTimeLocaleData[]): void;
    static localeData: Record<string, UnpackedLocaleFieldsData>;
    private static availableLocales;
    private static __defaultLocale;
    private static getDefaultLocale;
    private static relevantExtensionKeys;
    static polyfilled: boolean;
    private static readonly __INTERNAL_SLOT_MAP__;
}

declare interface RelativeTimeFormatNumberPart extends Intl.NumberFormatPart {
    unit: Unit;
}

declare type RelativeTimeLocaleData = LocaleData<LocaleFieldsData>;

declare interface ResolvedIntlListFormatOptions {
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

declare interface ResolvedIntlRelativeTimeFormatOptions extends Pick<IntlRelativeTimeFormatOptions, 'style' | 'numeric'> {
    /**
     * The BCP 47 language tag for the locale actually used.
     * If any Unicode extension values were requested in the
     * input BCP 47 language tag that led to this locale,
     * the key-value pairs that were requested and are
     * supported for this locale are included in locale.
     */
    locale: string;
    /**
     * The value requested using the Unicode
     * extension key "nu" or filled in as a default.
     */
    numberingSystem: string;
}

declare type ScriptCode = string;

declare interface SelectElement extends BaseElement<TYPE.select> {
    options: Record<string, PluralOrSelectOption>;
}

declare interface SimpleFormatElement<T extends TYPE, S extends Skeleton> extends BaseElement<T> {
    style?: string | S | null;
}

declare type Skeleton = NumberSkeleton | DateTimeSkeleton;

declare const enum SKELETON_TYPE {
    number = 0,
    dateTime = 1
}

declare interface State {
    /**
     * Explicit intl cache to prevent memory leaks
     */
    cache: IntlCache;
    /**
     * Intl object we created
     */
    intl?: IntlShape;
    /**
     * list of memoized config we care about.
     * This is important since creating intl is
     * very expensive
     */
    prevConfig: OptionalIntlConfig;
}

declare interface State_2 {
    prevUnit?: Unit;
    prevValue?: number;
    currentValueInSeconds: number;
}

declare interface TagElement {
    type: TYPE.tag;
    value: string;
    children: MessageFormatElement[];
    location?: Location_2;
}

declare type TimeElement = SimpleFormatElement<TYPE.time, DateTimeSkeleton>;

declare enum TYPE {
    /**
     * Raw text
     */
    literal = 0,
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    argument = 1,
    /**
     * Variable w/ number format
     */
    number = 2,
    /**
     * Variable w/ date format
     */
    date = 3,
    /**
     * Variable w/ time format
     */
    time = 4,
    /**
     * Variable w/ select format
     */
    select = 5,
    /**
     * Variable w/ plural format
     */
    plural = 6,
    /**
     * Only possible within plural argument.
     * This is the `#` symbol that will be substituted with the count.
     */
    pound = 7,
    /**
     * XML-like tag
     */
    tag = 8
}

declare type UnifiedNumberFormatOptions = Intl.NumberFormatOptions & NumberFormatDigitOptions & {
    localeMatcher?: UnifiedNumberFormatOptionsLocaleMatcher;
    style?: UnifiedNumberFormatOptionsStyle;
    compactDisplay?: UnifiedNumberFormatOptionsCompactDisplay;
    currencyDisplay?: UnifiedNumberFormatOptionsCurrencyDisplay;
    currencySign?: UnifiedNumberFormatOptionsCurrencySign;
    notation?: UnifiedNumberFormatOptionsNotation;
    signDisplay?: UnifiedNumberFormatOptionsSignDisplay;
    unit?: Unit_2;
    unitDisplay?: UnifiedNumberFormatOptionsUnitDisplay;
};

declare type UnifiedNumberFormatOptionsCompactDisplay = 'short' | 'long';

declare type UnifiedNumberFormatOptionsCurrencyDisplay = 'symbol' | 'code' | 'name' | 'narrowSymbol';

declare type UnifiedNumberFormatOptionsCurrencySign = 'standard' | 'accounting';

declare type UnifiedNumberFormatOptionsLocaleMatcher = 'lookup' | 'best fit';

declare type UnifiedNumberFormatOptionsNotation = 'standard' | 'scientific' | 'engineering' | 'compact';

declare type UnifiedNumberFormatOptionsSignDisplay = 'auto' | 'always' | 'never' | 'exceptZero';

declare type UnifiedNumberFormatOptionsStyle = 'decimal' | 'percent' | 'currency' | 'unit';

declare type UnifiedNumberFormatOptionsUnitDisplay = 'long' | 'short' | 'narrow';

declare type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

declare type Unit_2 = 'degree' | 'acre' | 'hectare' | 'percent' | 'bit' | 'byte' | 'gigabit' | 'gigabyte' | 'kilobit' | 'kilobyte' | 'megabit' | 'megabyte' | 'petabyte' | 'terabit' | 'terabyte' | 'day' | 'hour' | 'millisecond' | 'minute' | 'month' | 'second' | 'week' | 'year' | 'centimeter' | 'foot' | 'inch' | 'kilometer' | 'meter' | 'mile-scandinavian' | 'mile' | 'millimeter' | 'yard' | 'gram' | 'kilogram' | 'ounce' | 'pound' | 'stone' | 'celsius' | 'fahrenheit' | 'fluid-ounce' | 'gallon' | 'liter' | 'milliliter';

declare type Units = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'quarters' | 'years';

declare type UnpackedLocaleFieldsData = {
    [f in RelativeTimeField]?: FieldData;
} & {
    nu: Array<string | null>;
};

export declare function useIntl(): IntlShape;

declare type ValidPluralRule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' | string;

export declare type WithIntlProps<P> = Omit_2<P, keyof WrappedComponentProps> & {
    forwardedRef?: React_2.Ref<any>;
};

export declare type WrappedComponentProps<IntlPropName extends string = 'intl'> = {
    [k in IntlPropName]: IntlShape;
};

export { }

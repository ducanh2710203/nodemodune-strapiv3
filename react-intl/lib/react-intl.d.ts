import { DisplayNames } from '@formatjs/intl-displaynames';
import { DisplayNamesOptions } from '@formatjs/intl-displaynames';
import { DisplayNamesOptions as DisplayNamesOptions_2 } from '@formatjs/intl-displaynames/lib';
import { FormatError } from 'intl-messageformat';
import { Formats } from 'intl-messageformat';
import { FormatXMLElementFn } from 'intl-messageformat';
import IntlListFormat from '@formatjs/intl-listformat';
import { IntlListFormatOptions } from '@formatjs/intl-listformat';
import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeTimeFormat from '@formatjs/intl-relativetimeformat';
import { IntlRelativeTimeFormatOptions } from '@formatjs/intl-relativetimeformat';
import { MessageFormatElement } from 'intl-messageformat-parser';
import { PrimitiveType } from 'intl-messageformat';
import * as React_2 from 'react';
import { UnifiedNumberFormatOptions } from '@formatjs/intl-unified-numberformat';
import { Unit } from '@formatjs/intl-relativetimeformat';

/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
export declare function createIntl(config: OptionalIntlConfig, cache?: IntlCache): IntlShape;

export declare function createIntlCache(): IntlCache;

export declare interface CustomFormatConfig {
    format?: string;
}

export declare interface CustomFormats extends Partial<Formats> {
    relative?: Record<string, IntlRelativeTimeFormatOptions>;
}

declare const DEFAULT_INTL_CONFIG: Pick<IntlConfig, 'formats' | 'messages' | 'timeZone' | 'textComponent' | 'defaultLocale' | 'defaultFormats' | 'onError'>;

export declare function defineMessage<T>(msg: T): T;

export declare function defineMessages<T, U extends Record<string, T>>(msgs: U): U;

export declare type FormatDateOptions = Exclude<Intl.DateTimeFormatOptions, 'localeMatcher'> & CustomFormatConfig;

export declare type FormatDisplayNameOptions = Exclude<DisplayNamesOptions, 'localeMatcher'>;

export declare type FormatListOptions = Exclude<IntlListFormatOptions, 'localeMatcher'>;

export declare type FormatNumberOptions = Exclude<UnifiedNumberFormatOptions, 'localeMatcher'> & CustomFormatConfig;

export declare type FormatPluralOptions = Exclude<Intl.PluralRulesOptions, 'localeMatcher'> & CustomFormatConfig;

export declare type FormatRelativeTimeOptions = Exclude<IntlRelativeTimeFormatOptions, 'localeMatcher'> & CustomFormatConfig;

export declare const FormattedDate: React_2.FC<Intl.DateTimeFormatOptions & CustomFormatConfig & {
    value: string | number | Date | undefined;
}>;

export declare const FormattedDateParts: React_2.FC<Intl.DateTimeFormatOptions & CustomFormatConfig & {
    value: string | number | Date | undefined;
    children(val: Intl.DateTimeFormatPart[]): React_2.ReactElement<any, string | ((props: any) => React_2.ReactElement<any, string | any | (new (props: any) => React_2.Component<any, any, any>)> | null) | (new (props: any) => React_2.Component<any, any, any>)> | null;
}>;

export declare const FormattedDisplayName: React_2.FC<DisplayNamesOptions_2 & {
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
    getRelativeTimeFormat(...args: ConstructorParameters<typeof IntlRelativeTimeFormat>): IntlRelativeTimeFormat;
    getPluralRules(...args: ConstructorParameters<typeof Intl.PluralRules>): Intl.PluralRules;
    getListFormat(...args: ConstructorParameters<typeof IntlListFormat>): IntlListFormat;
    getDisplayNames(...args: ConstructorParameters<typeof DisplayNames>): DisplayNames;
}

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
    relativeTime: Record<string, IntlRelativeTimeFormat>;
    pluralRules: Record<string, Intl.PluralRules>;
    list: Record<string, IntlListFormat>;
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
    formatRelativeTime(value: Parameters<IntlRelativeTimeFormat['format']>[0], unit?: Parameters<IntlRelativeTimeFormat['format']>[1], opts?: FormatRelativeTimeOptions): string;
    formatNumber(value: Parameters<Intl.NumberFormat['format']>[0], opts?: FormatNumberOptions): string;
    formatNumberToParts(value: Parameters<Intl.NumberFormat['format']>[0], opts?: FormatNumberOptions): Intl.NumberFormatPart[];
    formatPlural(value: Parameters<Intl.PluralRules['select']>[0], opts?: FormatPluralOptions): ReturnType<Intl.PluralRules['select']>;
    formatMessage(descriptor: MessageDescriptor, values?: Record<string, PrimitiveType>): string;
    formatMessage(descriptor: MessageDescriptor, values?: Record<string, PrimitiveType | React_2.ReactElement | FormatXMLElementFn<T, R>>): string | React_2.ReactNodeArray;
    formatList(values: Array<string>, opts?: FormatListOptions): string;
    formatList(values: Array<string | React_2.ReactNode>, opts?: FormatListOptions): React_2.ReactNode;
    formatDisplayName(value: Parameters<DisplayNames['of']>[0], opts?: FormatDisplayNameOptions): string | undefined;
}

export declare class IntlProvider extends React_2.PureComponent<OptionalIntlConfig, State> {
    static displayName: string;
    static defaultProps: Pick<IntlConfig, "formats" | "messages" | "timeZone" | "textComponent" | "defaultLocale" | "defaultFormats" | "onError">;
    private cache;
    state: State;
    static getDerivedStateFromProps(props: OptionalIntlConfig, { prevConfig, cache }: State): Partial<State> | null;
    render(): JSX.Element;
}

export declare interface IntlShape extends IntlConfig, IntlFormatters {
    formatters: Formatters;
}

export declare interface MessageDescriptor {
    id?: string | number;
    description?: string | object;
    defaultMessage?: string;
}

declare type Omit_2<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
export { Omit_2 as Omit }

declare type OptionalIntlConfig = Omit_2<IntlConfig, keyof typeof DEFAULT_INTL_CONFIG> & Partial<typeof DEFAULT_INTL_CONFIG>;

declare interface Opts<IntlPropName extends string = 'intl', ForwardRef extends boolean = false> {
    intlPropName?: IntlPropName;
    forwardRef?: ForwardRef;
    enforceContext?: boolean;
}

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

export declare function useIntl(): IntlShape;

export declare type WithIntlProps<P> = Omit_2<P, keyof WrappedComponentProps> & {
    forwardedRef?: React_2.Ref<any>;
};

export declare type WrappedComponentProps<IntlPropName extends string = 'intl'> = {
    [k in IntlPropName]: IntlShape;
};

export { }

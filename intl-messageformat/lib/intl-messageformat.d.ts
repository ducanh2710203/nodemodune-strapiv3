import { MessageFormatElement } from 'intl-messageformat-parser';
import { parse } from 'intl-messageformat-parser';

export declare function createDefaultFormatters(cache?: FormatterCache): Formatters;

export declare const enum ErrorCode {
    MISSING_VALUE = "MISSING_VALUE",
    INVALID_VALUE = "INVALID_VALUE",
    MISSING_INTL_API = "MISSING_INTL_API"
}

export declare class FormatError extends Error {
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

export declare interface Formats {
    number: Record<string, Intl.NumberFormatOptions>;
    date: Record<string, Intl.DateTimeFormatOptions>;
    time: Record<string, Intl.DateTimeFormatOptions>;
}

export declare interface FormatterCache {
    number: Record<string, Intl.NumberFormat>;
    dateTime: Record<string, Intl.DateTimeFormat>;
    pluralRules: Record<string, Intl.PluralRules>;
}

export declare interface Formatters {
    getNumberFormat(...args: ConstructorParameters<typeof Intl.NumberFormat>): Intl.NumberFormat;
    getDateTimeFormat(...args: ConstructorParameters<typeof Intl.DateTimeFormat>): Intl.DateTimeFormat;
    getPluralRules(...args: ConstructorParameters<typeof Intl.PluralRules>): Intl.PluralRules;
}

export declare function formatToParts<T>(els: MessageFormatElement[], locales: string | string[], formatters: Formatters, formats: Formats, values?: Record<string, PrimitiveType | T | FormatXMLElementFn<T>>, currentPluralValue?: number, originalMessage?: string): MessageFormatPart<T>[];

export declare type FormatXMLElementFn<T, R = string | Array<string | T>> = (...args: Array<string | T>) => R;

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
export { IntlMessageFormat }
export default IntlMessageFormat;

export declare class InvalidValueError extends FormatError {
    constructor(variableId: string, value: any, options: string[], originalMessage?: string);
}

export declare class InvalidValueTypeError extends FormatError {
    constructor(value: any, type: string, originalMessage?: string);
}

export declare interface LiteralPart {
    type: PART_TYPE.literal;
    value: string;
}

export declare type MessageFormatPart<T> = LiteralPart | ObjectPart<T>;

export declare class MissingValueError extends FormatError {
    constructor(variableId: string, originalMessage?: string);
}

export declare interface ObjectPart<T = any> {
    type: PART_TYPE.object;
    value: T;
}

export declare interface Options {
    formatters?: Formatters;
    /**
     * Whether to treat HTML/XML tags as string literal
     * instead of parsing them as tag token.
     * When this is false we only allow simple tags without
     * any attributes
     */
    ignoreTag?: boolean;
}

export declare const enum PART_TYPE {
    literal = 0,
    object = 1
}

export declare type PrimitiveType = string | number | boolean | null | undefined | Date;

export { }

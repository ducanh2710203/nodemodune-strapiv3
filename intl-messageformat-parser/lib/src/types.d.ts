export declare enum TYPE {
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
export declare const enum SKELETON_TYPE {
    number = 0,
    dateTime = 1
}
export interface LocationDetails {
    offset: number;
    line: number;
    column: number;
}
export interface Location {
    start: LocationDetails;
    end: LocationDetails;
}
export interface BaseElement<T extends TYPE> {
    type: T;
    value: string;
    location?: Location;
}
export declare type LiteralElement = BaseElement<TYPE.literal>;
export declare type ArgumentElement = BaseElement<TYPE.argument>;
export interface TagElement {
    type: TYPE.tag;
    value: string;
    children: MessageFormatElement[];
    location?: Location;
}
export interface SimpleFormatElement<T extends TYPE, S extends Skeleton> extends BaseElement<T> {
    style?: string | S | null;
}
export declare type NumberElement = SimpleFormatElement<TYPE.number, NumberSkeleton>;
export declare type DateElement = SimpleFormatElement<TYPE.date, DateTimeSkeleton>;
export declare type TimeElement = SimpleFormatElement<TYPE.time, DateTimeSkeleton>;
export interface SelectOption {
    id: string;
    value: MessageFormatElement[];
    location?: Location;
}
export declare type ValidPluralRule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' | string;
export interface PluralOrSelectOption {
    value: MessageFormatElement[];
    location?: Location;
}
export interface SelectElement extends BaseElement<TYPE.select> {
    options: Record<string, PluralOrSelectOption>;
}
export interface PluralElement extends BaseElement<TYPE.plural> {
    options: Record<ValidPluralRule, PluralOrSelectOption>;
    offset: number;
    pluralType: Intl.PluralRulesOptions['type'];
}
export interface PoundElement {
    type: TYPE.pound;
    location?: Location;
}
export declare type MessageFormatElement = LiteralElement | ArgumentElement | NumberElement | DateElement | TimeElement | SelectElement | PluralElement | TagElement | PoundElement;
export interface NumberSkeletonToken {
    stem: string;
    options: string[];
}
export interface NumberSkeleton {
    type: SKELETON_TYPE.number;
    tokens: NumberSkeletonToken[];
    location?: Location;
}
export interface DateTimeSkeleton {
    type: SKELETON_TYPE.dateTime;
    pattern: string;
    location?: Location;
}
export declare type Skeleton = NumberSkeleton | DateTimeSkeleton;
/**
 * Type Guards
 */
export declare function isLiteralElement(el: MessageFormatElement): el is LiteralElement;
export declare function isArgumentElement(el: MessageFormatElement): el is ArgumentElement;
export declare function isNumberElement(el: MessageFormatElement): el is NumberElement;
export declare function isDateElement(el: MessageFormatElement): el is DateElement;
export declare function isTimeElement(el: MessageFormatElement): el is TimeElement;
export declare function isSelectElement(el: MessageFormatElement): el is SelectElement;
export declare function isPluralElement(el: MessageFormatElement): el is PluralElement;
export declare function isPoundElement(el: MessageFormatElement): el is PoundElement;
export declare function isTagElement(el: MessageFormatElement): el is TagElement;
export declare function isNumberSkeleton(el: NumberElement['style'] | Skeleton): el is NumberSkeleton;
export declare function isDateTimeSkeleton(el?: DateElement['style'] | TimeElement['style'] | Skeleton): el is DateTimeSkeleton;
export declare function createLiteralElement(value: string): LiteralElement;
export declare function createNumberElement(value: string, style?: string | null): NumberElement;
export interface Options {
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
    /**
     * Whether to treat HTML/XML tags as string literal
     * instead of parsing them as tag token.
     * When this is false we only allow simple tags without
     * any attributes
     */
    ignoreTag?: boolean;
}
//# sourceMappingURL=types.d.ts.map
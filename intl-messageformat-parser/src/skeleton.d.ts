import { NumberSkeletonToken } from './types';
import { NumberFormatOptions } from '@formatjs/intl-numberformat';
export interface ExtendedDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
    hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
}
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @public
 * @param skeleton skeleton string
 */
export declare function parseDateTimeSkeleton(skeleton: string): ExtendedDateTimeFormatOptions;
/**
 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
 */
export declare function convertNumberSkeletonToNumberFormatOptions(tokens: NumberSkeletonToken[]): NumberFormatOptions;
//# sourceMappingURL=skeleton.d.ts.map
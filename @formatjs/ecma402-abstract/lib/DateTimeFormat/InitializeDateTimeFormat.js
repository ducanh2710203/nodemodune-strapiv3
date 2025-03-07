import { CanonicalizeLocaleList } from '../CanonicalizeLocaleList';
import { ToDateTimeOptions } from './ToDateTimeOptions';
import { GetOption } from '../GetOption';
import { ResolveLocale } from '../ResolveLocale';
import { IsValidTimeZoneName } from '../IsValidTimeZoneName';
import { CanonicalizeTimeZoneName } from '../CanonicalizeTimeZoneName';
import { BasicFormatMatcher } from './BasicFormatMatcher';
import { BestFitFormatMatcher } from './BestFitFormatMatcher';
import { invariant } from '../utils';
import { DATE_TIME_PROPS } from './utils';
import { DateTimeStyleFormat } from './DateTimeStyleFormat';
function isTimeRelated(opt) {
    for (var _i = 0, _a = ['hour', 'minute', 'second']; _i < _a.length; _i++) {
        var prop = _a[_i];
        var value = opt[prop];
        if (value !== undefined) {
            return true;
        }
    }
    return false;
}
function resolveHourCycle(hc, hcDefault, hour12) {
    if (hc == null) {
        hc = hcDefault;
    }
    if (hour12 !== undefined) {
        if (hour12) {
            if (hcDefault === 'h11' || hcDefault === 'h23') {
                hc = 'h11';
            }
            else {
                hc = 'h12';
            }
        }
        else {
            invariant(!hour12, 'hour12 must not be set');
            if (hcDefault === 'h11' || hcDefault === 'h23') {
                hc = 'h23';
            }
            else {
                hc = 'h24';
            }
        }
    }
    return hc;
}
var TYPE_REGEX = /^[a-z0-9]{3,8}$/i;
/**
 * https://tc39.es/ecma402/#sec-initializedatetimeformat
 * @param dtf DateTimeFormat
 * @param locales locales
 * @param opts options
 */
export function InitializeDateTimeFormat(dtf, locales, opts, _a) {
    var getInternalSlots = _a.getInternalSlots, availableLocales = _a.availableLocales, localeData = _a.localeData, getDefaultLocale = _a.getDefaultLocale, getDefaultTimeZone = _a.getDefaultTimeZone, relevantExtensionKeys = _a.relevantExtensionKeys, tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
    // @ts-ignore
    var requestedLocales = CanonicalizeLocaleList(locales);
    var options = ToDateTimeOptions(opts, 'any', 'date');
    var opt = Object.create(null);
    var matcher = GetOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
    opt.localeMatcher = matcher;
    var calendar = GetOption(options, 'calendar', 'string', undefined, undefined);
    if (calendar !== undefined && !TYPE_REGEX.test(calendar)) {
        throw new RangeError('Malformed calendar');
    }
    var internalSlots = getInternalSlots(dtf);
    opt.ca = calendar;
    var numberingSystem = GetOption(options, 'numberingSystem', 'string', undefined, undefined);
    if (numberingSystem !== undefined && !TYPE_REGEX.test(numberingSystem)) {
        throw new RangeError('Malformed numbering system');
    }
    opt.nu = numberingSystem;
    var hour12 = GetOption(options, 'hour12', 'boolean', undefined, undefined);
    var hourCycle = GetOption(options, 'hourCycle', 'string', ['h11', 'h12', 'h23', 'h24'], undefined);
    if (hour12 !== undefined) {
        // @ts-ignore
        hourCycle = null;
    }
    opt.hc = hourCycle;
    var r = ResolveLocale(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
    internalSlots.locale = r.locale;
    calendar = r.ca;
    internalSlots.calendar = calendar;
    internalSlots.hourCycle = r.hc;
    internalSlots.numberingSystem = r.nu;
    var dataLocale = r.dataLocale;
    internalSlots.dataLocale = dataLocale;
    var timeZone = options.timeZone;
    if (timeZone !== undefined) {
        timeZone = String(timeZone);
        if (!IsValidTimeZoneName(timeZone, { tzData: tzData, uppercaseLinks: uppercaseLinks })) {
            throw new RangeError('Invalid timeZoneName');
        }
        timeZone = CanonicalizeTimeZoneName(timeZone, { tzData: tzData, uppercaseLinks: uppercaseLinks });
    }
    else {
        timeZone = getDefaultTimeZone();
    }
    internalSlots.timeZone = timeZone;
    opt = Object.create(null);
    opt.weekday = GetOption(options, 'weekday', 'string', ['narrow', 'short', 'long'], undefined);
    opt.era = GetOption(options, 'era', 'string', ['narrow', 'short', 'long'], undefined);
    opt.year = GetOption(options, 'year', 'string', ['2-digit', 'numeric'], undefined);
    opt.month = GetOption(options, 'month', 'string', ['2-digit', 'numeric', 'narrow', 'short', 'long'], undefined);
    opt.day = GetOption(options, 'day', 'string', ['2-digit', 'numeric'], undefined);
    opt.hour = GetOption(options, 'hour', 'string', ['2-digit', 'numeric'], undefined);
    opt.minute = GetOption(options, 'minute', 'string', ['2-digit', 'numeric'], undefined);
    opt.second = GetOption(options, 'second', 'string', ['2-digit', 'numeric'], undefined);
    opt.timeZoneName = GetOption(options, 'timeZoneName', 'string', ['short', 'long'], undefined);
    var dataLocaleData = localeData[dataLocale];
    invariant(!!dataLocaleData, "Missing locale data for " + dataLocale);
    var formats = dataLocaleData.formats[calendar];
    // UNSPECCED: IMPLEMENTATION DETAILS
    if (!formats) {
        throw new RangeError("Calendar \"" + calendar + "\" is not supported. Try setting \"calendar\" to 1 of the following: " + Object.keys(dataLocaleData.formats).join(', '));
    }
    matcher = GetOption(options, 'formatMatcher', 'string', ['basic', 'best fit'], 'best fit');
    var dateStyle = GetOption(options, 'dateStyle', 'string', ['full', 'long', 'medium', 'short'], undefined);
    internalSlots.dateStyle = dateStyle;
    var timeStyle = GetOption(options, 'timeStyle', 'string', ['full', 'long', 'medium', 'short'], undefined);
    internalSlots.timeStyle = timeStyle;
    var bestFormat;
    if (dateStyle === undefined && timeStyle === undefined) {
        if (matcher === 'basic') {
            bestFormat = BasicFormatMatcher(opt, formats);
        }
        else {
            // IMPL DETAILS START
            if (isTimeRelated(opt)) {
                var hc = resolveHourCycle(internalSlots.hourCycle, dataLocaleData.hourCycle, hour12);
                opt.hour12 = hc === 'h11' || hc === 'h12';
            }
            // IMPL DETAILS END
            bestFormat = BestFitFormatMatcher(opt, formats);
        }
    }
    else {
        for (var _i = 0, DATE_TIME_PROPS_1 = DATE_TIME_PROPS; _i < DATE_TIME_PROPS_1.length; _i++) {
            var prop = DATE_TIME_PROPS_1[_i];
            var p = opt[prop];
            if (p !== undefined) {
                throw new TypeError("Intl.DateTimeFormat can't set option " + prop + " when " + (dateStyle ? 'dateStyle' : 'timeStyle') + " is used");
            }
        }
        bestFormat = DateTimeStyleFormat(dateStyle, timeStyle, dataLocaleData);
    }
    // IMPL DETAIL START
    // For debugging
    internalSlots.format = bestFormat;
    // IMPL DETAIL END
    for (var prop in opt) {
        var p = bestFormat[prop];
        if (p !== undefined) {
            internalSlots[prop] = p;
        }
    }
    var pattern;
    var rangePatterns;
    if (internalSlots.hour !== undefined) {
        var hc = resolveHourCycle(internalSlots.hourCycle, dataLocaleData.hourCycle, hour12);
        internalSlots.hourCycle = hc;
        if (hc === 'h11' || hc === 'h12') {
            pattern = bestFormat.pattern12;
            rangePatterns = bestFormat.rangePatterns12;
        }
        else {
            pattern = bestFormat.pattern;
            rangePatterns = bestFormat.rangePatterns;
        }
    }
    else {
        // @ts-ignore
        internalSlots.hourCycle = undefined;
        pattern = bestFormat.pattern;
        rangePatterns = bestFormat.rangePatterns;
    }
    internalSlots.pattern = pattern;
    internalSlots.rangePatterns = rangePatterns;
    return dtf;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeDateTimeFormat = void 0;
var CanonicalizeLocaleList_1 = require("../CanonicalizeLocaleList");
var ToDateTimeOptions_1 = require("./ToDateTimeOptions");
var GetOption_1 = require("../GetOption");
var ResolveLocale_1 = require("../ResolveLocale");
var IsValidTimeZoneName_1 = require("../IsValidTimeZoneName");
var CanonicalizeTimeZoneName_1 = require("../CanonicalizeTimeZoneName");
var BasicFormatMatcher_1 = require("./BasicFormatMatcher");
var BestFitFormatMatcher_1 = require("./BestFitFormatMatcher");
var utils_1 = require("../utils");
var utils_2 = require("./utils");
var DateTimeStyleFormat_1 = require("./DateTimeStyleFormat");
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
            utils_1.invariant(!hour12, 'hour12 must not be set');
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
function InitializeDateTimeFormat(dtf, locales, opts, _a) {
    var getInternalSlots = _a.getInternalSlots, availableLocales = _a.availableLocales, localeData = _a.localeData, getDefaultLocale = _a.getDefaultLocale, getDefaultTimeZone = _a.getDefaultTimeZone, relevantExtensionKeys = _a.relevantExtensionKeys, tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
    // @ts-ignore
    var requestedLocales = CanonicalizeLocaleList_1.CanonicalizeLocaleList(locales);
    var options = ToDateTimeOptions_1.ToDateTimeOptions(opts, 'any', 'date');
    var opt = Object.create(null);
    var matcher = GetOption_1.GetOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
    opt.localeMatcher = matcher;
    var calendar = GetOption_1.GetOption(options, 'calendar', 'string', undefined, undefined);
    if (calendar !== undefined && !TYPE_REGEX.test(calendar)) {
        throw new RangeError('Malformed calendar');
    }
    var internalSlots = getInternalSlots(dtf);
    opt.ca = calendar;
    var numberingSystem = GetOption_1.GetOption(options, 'numberingSystem', 'string', undefined, undefined);
    if (numberingSystem !== undefined && !TYPE_REGEX.test(numberingSystem)) {
        throw new RangeError('Malformed numbering system');
    }
    opt.nu = numberingSystem;
    var hour12 = GetOption_1.GetOption(options, 'hour12', 'boolean', undefined, undefined);
    var hourCycle = GetOption_1.GetOption(options, 'hourCycle', 'string', ['h11', 'h12', 'h23', 'h24'], undefined);
    if (hour12 !== undefined) {
        // @ts-ignore
        hourCycle = null;
    }
    opt.hc = hourCycle;
    var r = ResolveLocale_1.ResolveLocale(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
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
        if (!IsValidTimeZoneName_1.IsValidTimeZoneName(timeZone, { tzData: tzData, uppercaseLinks: uppercaseLinks })) {
            throw new RangeError('Invalid timeZoneName');
        }
        timeZone = CanonicalizeTimeZoneName_1.CanonicalizeTimeZoneName(timeZone, { tzData: tzData, uppercaseLinks: uppercaseLinks });
    }
    else {
        timeZone = getDefaultTimeZone();
    }
    internalSlots.timeZone = timeZone;
    opt = Object.create(null);
    opt.weekday = GetOption_1.GetOption(options, 'weekday', 'string', ['narrow', 'short', 'long'], undefined);
    opt.era = GetOption_1.GetOption(options, 'era', 'string', ['narrow', 'short', 'long'], undefined);
    opt.year = GetOption_1.GetOption(options, 'year', 'string', ['2-digit', 'numeric'], undefined);
    opt.month = GetOption_1.GetOption(options, 'month', 'string', ['2-digit', 'numeric', 'narrow', 'short', 'long'], undefined);
    opt.day = GetOption_1.GetOption(options, 'day', 'string', ['2-digit', 'numeric'], undefined);
    opt.hour = GetOption_1.GetOption(options, 'hour', 'string', ['2-digit', 'numeric'], undefined);
    opt.minute = GetOption_1.GetOption(options, 'minute', 'string', ['2-digit', 'numeric'], undefined);
    opt.second = GetOption_1.GetOption(options, 'second', 'string', ['2-digit', 'numeric'], undefined);
    opt.timeZoneName = GetOption_1.GetOption(options, 'timeZoneName', 'string', ['short', 'long'], undefined);
    var dataLocaleData = localeData[dataLocale];
    utils_1.invariant(!!dataLocaleData, "Missing locale data for " + dataLocale);
    var formats = dataLocaleData.formats[calendar];
    // UNSPECCED: IMPLEMENTATION DETAILS
    if (!formats) {
        throw new RangeError("Calendar \"" + calendar + "\" is not supported. Try setting \"calendar\" to 1 of the following: " + Object.keys(dataLocaleData.formats).join(', '));
    }
    matcher = GetOption_1.GetOption(options, 'formatMatcher', 'string', ['basic', 'best fit'], 'best fit');
    var dateStyle = GetOption_1.GetOption(options, 'dateStyle', 'string', ['full', 'long', 'medium', 'short'], undefined);
    internalSlots.dateStyle = dateStyle;
    var timeStyle = GetOption_1.GetOption(options, 'timeStyle', 'string', ['full', 'long', 'medium', 'short'], undefined);
    internalSlots.timeStyle = timeStyle;
    var bestFormat;
    if (dateStyle === undefined && timeStyle === undefined) {
        if (matcher === 'basic') {
            bestFormat = BasicFormatMatcher_1.BasicFormatMatcher(opt, formats);
        }
        else {
            // IMPL DETAILS START
            if (isTimeRelated(opt)) {
                var hc = resolveHourCycle(internalSlots.hourCycle, dataLocaleData.hourCycle, hour12);
                opt.hour12 = hc === 'h11' || hc === 'h12';
            }
            // IMPL DETAILS END
            bestFormat = BestFitFormatMatcher_1.BestFitFormatMatcher(opt, formats);
        }
    }
    else {
        for (var _i = 0, DATE_TIME_PROPS_1 = utils_2.DATE_TIME_PROPS; _i < DATE_TIME_PROPS_1.length; _i++) {
            var prop = DATE_TIME_PROPS_1[_i];
            var p = opt[prop];
            if (p !== undefined) {
                throw new TypeError("Intl.DateTimeFormat can't set option " + prop + " when " + (dateStyle ? 'dateStyle' : 'timeStyle') + " is used");
            }
        }
        bestFormat = DateTimeStyleFormat_1.DateTimeStyleFormat(dateStyle, timeStyle, dataLocaleData);
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
exports.InitializeDateTimeFormat = InitializeDateTimeFormat;

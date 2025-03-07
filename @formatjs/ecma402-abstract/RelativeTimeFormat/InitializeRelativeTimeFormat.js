"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeRelativeTimeFormat = void 0;
var CanonicalizeLocaleList_1 = require("../CanonicalizeLocaleList");
var _262_1 = require("../262");
var GetOption_1 = require("../GetOption");
var ResolveLocale_1 = require("../ResolveLocale");
var utils_1 = require("../utils");
var NUMBERING_SYSTEM_REGEX = /^[a-z0-9]{3,8}(-[a-z0-9]{3,8})*$/i;
function InitializeRelativeTimeFormat(rtf, locales, options, _a) {
    var getInternalSlots = _a.getInternalSlots, availableLocales = _a.availableLocales, relevantExtensionKeys = _a.relevantExtensionKeys, localeData = _a.localeData, getDefaultLocale = _a.getDefaultLocale;
    var internalSlots = getInternalSlots(rtf);
    internalSlots.initializedRelativeTimeFormat = true;
    var requestedLocales = CanonicalizeLocaleList_1.CanonicalizeLocaleList(locales);
    var opt = Object.create(null);
    var opts = options === undefined ? Object.create(null) : _262_1.ToObject(options);
    var matcher = GetOption_1.GetOption(opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit');
    opt.localeMatcher = matcher;
    var numberingSystem = GetOption_1.GetOption(opts, 'numberingSystem', 'string', undefined, undefined);
    if (numberingSystem !== undefined) {
        if (!NUMBERING_SYSTEM_REGEX.test(numberingSystem)) {
            throw new RangeError("Invalid numbering system " + numberingSystem);
        }
    }
    opt.nu = numberingSystem;
    var r = ResolveLocale_1.ResolveLocale(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
    var locale = r.locale, nu = r.nu;
    internalSlots.locale = locale;
    internalSlots.style = GetOption_1.GetOption(opts, 'style', 'string', ['long', 'narrow', 'short'], 'long');
    internalSlots.numeric = GetOption_1.GetOption(opts, 'numeric', 'string', ['always', 'auto'], 'always');
    var fields = localeData[locale];
    utils_1.invariant(!!fields, "Missing locale data for " + locale);
    internalSlots.fields = fields;
    internalSlots.numberFormat = new Intl.NumberFormat(locales);
    internalSlots.pluralRules = new Intl.PluralRules(locales);
    internalSlots.numberingSystem = nu;
    return rtf;
}
exports.InitializeRelativeTimeFormat = InitializeRelativeTimeFormat;

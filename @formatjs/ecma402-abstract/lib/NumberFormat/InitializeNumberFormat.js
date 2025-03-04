import { CanonicalizeLocaleList } from '../CanonicalizeLocaleList';
import { ToObject } from '../262';
import { GetOption } from '../GetOption';
import { ResolveLocale } from '../ResolveLocale';
import { SetNumberFormatUnitOptions } from './SetNumberFormatUnitOptions';
import { CurrencyDigits } from './CurrencyDigits';
import { SetNumberFormatDigitOptions } from './SetNumberFormatDigitOptions';
import { invariant } from '../utils';
/**
 * Chop off the unicode extension from the locale string.
 */
function removeUnicodeExtensionFromLocale(canonicalLocale) {
    var extensionIndex = canonicalLocale.indexOf('-u-');
    return extensionIndex >= 0
        ? canonicalLocale.slice(0, extensionIndex)
        : canonicalLocale;
}
/**
 * https://tc39.es/ecma402/#sec-initializenumberformat
 */
export function InitializeNumberFormat(nf, locales, opts, _a) {
    var getInternalSlots = _a.getInternalSlots, localeData = _a.localeData, availableLocales = _a.availableLocales, numberingSystemNames = _a.numberingSystemNames, getDefaultLocale = _a.getDefaultLocale, currencyDigitsData = _a.currencyDigitsData;
    // @ts-ignore
    var requestedLocales = CanonicalizeLocaleList(locales);
    var options = opts === undefined ? Object.create(null) : ToObject(opts);
    var opt = Object.create(null);
    var matcher = GetOption(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
    opt.localeMatcher = matcher;
    var numberingSystem = GetOption(options, 'numberingSystem', 'string', undefined, undefined);
    if (numberingSystem !== undefined &&
        numberingSystemNames.indexOf(numberingSystem) < 0) {
        // 8.a. If numberingSystem does not match the Unicode Locale Identifier type nonterminal,
        // throw a RangeError exception.
        throw RangeError("Invalid numberingSystems: " + numberingSystem);
    }
    opt.nu = numberingSystem;
    var r = ResolveLocale(availableLocales, requestedLocales, opt, 
    // [[RelevantExtensionKeys]] slot, which is a constant
    ['nu'], localeData, getDefaultLocale);
    var dataLocaleData = localeData[removeUnicodeExtensionFromLocale(r.locale)];
    invariant(!!dataLocaleData, "Missing locale data for " + r.locale);
    var internalSlots = getInternalSlots(nf);
    internalSlots.locale = r.locale;
    internalSlots.dataLocale = r.dataLocale;
    internalSlots.numberingSystem = r.nu;
    internalSlots.dataLocaleData = dataLocaleData;
    SetNumberFormatUnitOptions(nf, options, { getInternalSlots: getInternalSlots });
    var style = internalSlots.style;
    var mnfdDefault;
    var mxfdDefault;
    if (style === 'currency') {
        var currency = internalSlots.currency;
        var cDigits = CurrencyDigits(currency, { currencyDigitsData: currencyDigitsData });
        mnfdDefault = cDigits;
        mxfdDefault = cDigits;
    }
    else {
        mnfdDefault = 0;
        mxfdDefault = style === 'percent' ? 0 : 3;
    }
    var notation = GetOption(options, 'notation', 'string', ['standard', 'scientific', 'engineering', 'compact'], 'standard');
    internalSlots.notation = notation;
    SetNumberFormatDigitOptions(internalSlots, options, mnfdDefault, mxfdDefault, notation);
    var compactDisplay = GetOption(options, 'compactDisplay', 'string', ['short', 'long'], 'short');
    if (notation === 'compact') {
        internalSlots.compactDisplay = compactDisplay;
    }
    var useGrouping = GetOption(options, 'useGrouping', 'boolean', undefined, true);
    internalSlots.useGrouping = useGrouping;
    var signDisplay = GetOption(options, 'signDisplay', 'string', ['auto', 'never', 'always', 'exceptZero'], 'auto');
    internalSlots.signDisplay = signDisplay;
    return nf;
}

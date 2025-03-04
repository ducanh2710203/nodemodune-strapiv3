"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberFormat = void 0;
var tslib_1 = require("tslib");
var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");
var currencyDigitsData = tslib_1.__importStar(require("./data/currency-digits.json"));
var numbering_systems_json_1 = require("./data/numbering-systems.json");
// eslint-disable-next-line import/no-cycle
var get_internal_slots_1 = tslib_1.__importDefault(require("./get_internal_slots"));
var RESOLVED_OPTIONS_KEYS = [
    'locale',
    'numberingSystem',
    'style',
    'currency',
    'currencyDisplay',
    'currencySign',
    'unit',
    'unitDisplay',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    'useGrouping',
    'notation',
    'compactDisplay',
    'signDisplay',
];
/**
 * https://tc39.es/ecma402/#sec-intl-numberformat-constructor
 */
exports.NumberFormat = function (locales, options) {
    // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
    if (!this || !(this instanceof exports.NumberFormat)) {
        return new exports.NumberFormat(locales, options);
    }
    ecma402_abstract_1.InitializeNumberFormat(this, locales, options, {
        getInternalSlots: get_internal_slots_1.default,
        localeData: exports.NumberFormat.localeData,
        availableLocales: exports.NumberFormat.availableLocales,
        getDefaultLocale: exports.NumberFormat.getDefaultLocale,
        currencyDigitsData: currencyDigitsData,
        numberingSystemNames: numbering_systems_json_1.names,
    });
    var internalSlots = get_internal_slots_1.default(this);
    var dataLocale = internalSlots.dataLocale;
    var dataLocaleData = exports.NumberFormat.localeData[dataLocale];
    ecma402_abstract_1.invariant(dataLocaleData !== undefined, "Cannot load locale-dependent data for " + dataLocale + ".");
    internalSlots.pl = new Intl.PluralRules(dataLocale, {
        minimumFractionDigits: internalSlots.minimumFractionDigits,
        maximumFractionDigits: internalSlots.maximumFractionDigits,
        minimumIntegerDigits: internalSlots.minimumIntegerDigits,
        minimumSignificantDigits: internalSlots.minimumSignificantDigits,
        maximumSignificantDigits: internalSlots.maximumSignificantDigits,
    });
    return this;
};
ecma402_abstract_1.defineProperty(exports.NumberFormat.prototype, 'formatToParts', {
    value: function formatToParts(x) {
        return ecma402_abstract_1.FormatNumericToParts(this, toNumeric(x), {
            getInternalSlots: get_internal_slots_1.default,
        });
    },
});
ecma402_abstract_1.defineProperty(exports.NumberFormat.prototype, 'resolvedOptions', {
    value: function resolvedOptions() {
        if (typeof this !== 'object' || !(this instanceof exports.NumberFormat)) {
            throw TypeError('Method Intl.NumberFormat.prototype.resolvedOptions called on incompatible receiver');
        }
        var internalSlots = get_internal_slots_1.default(this);
        var ro = {};
        for (var _i = 0, RESOLVED_OPTIONS_KEYS_1 = RESOLVED_OPTIONS_KEYS; _i < RESOLVED_OPTIONS_KEYS_1.length; _i++) {
            var key = RESOLVED_OPTIONS_KEYS_1[_i];
            var value = internalSlots[key];
            if (value !== undefined) {
                ro[key] = value;
            }
        }
        return ro;
    },
});
var formatDescriptor = {
    enumerable: false,
    configurable: true,
    get: function () {
        if (typeof this !== 'object' || !(this instanceof exports.NumberFormat)) {
            throw TypeError('Intl.NumberFormat format property accessor called on incompatible receiver');
        }
        var internalSlots = get_internal_slots_1.default(this);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var numberFormat = this;
        var boundFormat = internalSlots.boundFormat;
        if (boundFormat === undefined) {
            // https://tc39.es/proposal-unified-intl-numberformat/section11/numberformat_diff_out.html#sec-number-format-functions
            boundFormat = function (value) {
                // TODO: check bigint
                var x = toNumeric(value);
                return numberFormat
                    .formatToParts(x)
                    .map(function (x) { return x.value; })
                    .join('');
            };
            try {
                // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/prototype/format/format-function-name.js
                Object.defineProperty(boundFormat, 'name', {
                    configurable: true,
                    enumerable: false,
                    writable: false,
                    value: '',
                });
            }
            catch (e) {
                // In older browser (e.g Chrome 36 like polyfill.io)
                // TypeError: Cannot redefine property: name
            }
            internalSlots.boundFormat = boundFormat;
        }
        return boundFormat;
    },
};
try {
    // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/prototype/format/name.js
    Object.defineProperty(formatDescriptor.get, 'name', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: 'get format',
    });
}
catch (e) {
    // In older browser (e.g Chrome 36 like polyfill.io)
    // TypeError: Cannot redefine property: name
}
Object.defineProperty(exports.NumberFormat.prototype, 'format', formatDescriptor);
// Static properties
ecma402_abstract_1.defineProperty(exports.NumberFormat, 'supportedLocalesOf', {
    value: function supportedLocalesOf(locales, options) {
        return ecma402_abstract_1.SupportedLocales(exports.NumberFormat.availableLocales, ecma402_abstract_1.CanonicalizeLocaleList(locales), options);
    },
});
exports.NumberFormat.__addLocaleData = function __addLocaleData() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
        var datum = data_1[_a];
        var availableLocales = datum.availableLocales;
        for (var _b = 0, availableLocales_1 = availableLocales; _b < availableLocales_1.length; _b++) {
            var locale = availableLocales_1[_b];
            try {
                exports.NumberFormat.localeData[locale] = ecma402_abstract_1.unpackData(locale, datum);
            }
            catch (e) {
                // Ignore if we got no data
            }
        }
    }
    exports.NumberFormat.availableLocales = Object.keys(exports.NumberFormat.localeData);
    if (!exports.NumberFormat.__defaultLocale) {
        exports.NumberFormat.__defaultLocale = exports.NumberFormat.availableLocales[0];
    }
};
exports.NumberFormat.__defaultLocale = 'en';
exports.NumberFormat.localeData = {};
exports.NumberFormat.availableLocales = [];
exports.NumberFormat.getDefaultLocale = function () {
    return exports.NumberFormat.__defaultLocale;
};
exports.NumberFormat.polyfilled = true;
function toNumeric(val) {
    if (typeof val === 'bigint') {
        return val;
    }
    return ecma402_abstract_1.ToNumber(val);
}
try {
    // IE11 does not have Symbol
    if (typeof Symbol !== 'undefined') {
        Object.defineProperty(exports.NumberFormat.prototype, Symbol.toStringTag, {
            configurable: true,
            enumerable: false,
            writable: false,
            value: 'Intl.NumberFormat',
        });
    }
    // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/length.js
    Object.defineProperty(exports.NumberFormat.prototype.constructor, 'length', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: 0,
    });
    // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/supportedLocalesOf/length.js
    Object.defineProperty(exports.NumberFormat.supportedLocalesOf, 'length', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: 1,
    });
    Object.defineProperty(exports.NumberFormat, 'prototype', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: exports.NumberFormat.prototype,
    });
}
catch (e) {
    // Meta fix so we're test262-compliant, not important
}

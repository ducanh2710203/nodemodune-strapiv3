"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOperands = void 0;
var utils_1 = require("../utils");
var _262_1 = require("../262");
/**
 * http://ecma-international.org/ecma-402/7.0/index.html#sec-getoperands
 * @param s
 */
function GetOperands(s) {
    utils_1.invariant(typeof s === 'string', "GetOperands should have been called with a string");
    var n = _262_1.ToNumber(s);
    utils_1.invariant(isFinite(n), 'n should be finite');
    var dp = s.indexOf('.');
    var iv;
    var f;
    var v;
    var fv = '';
    if (dp === -1) {
        iv = n;
        f = 0;
        v = 0;
    }
    else {
        iv = s.slice(0, dp);
        fv = s.slice(dp, s.length);
        f = _262_1.ToNumber(fv);
        v = fv.length;
    }
    var i = Math.abs(_262_1.ToNumber(iv));
    var w;
    var t;
    if (f !== 0) {
        var ft = fv.replace(/0+$/, '');
        w = ft.length;
        t = _262_1.ToNumber(ft);
    }
    else {
        w = 0;
        t = 0;
    }
    return {
        Number: n,
        IntegerDigits: i,
        NumberOfFractionDigits: v,
        NumberOfFractionDigitsWithoutTrailing: w,
        FractionDigits: f,
        FractionDigitsWithoutTrailing: t,
    };
}
exports.GetOperands = GetOperands;

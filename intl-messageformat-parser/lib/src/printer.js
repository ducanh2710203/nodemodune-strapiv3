/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { isLiteralElement, isTagElement, isSelectElement, isArgumentElement, isDateElement, isTimeElement, isNumberElement, isPluralElement, TYPE, isPoundElement, } from './types';
export function printAST(ast) {
    return doPrintAST(ast, false);
}
export function doPrintAST(ast, isInPlural) {
    var printedNodes = ast.map(function (el) {
        if (isLiteralElement(el)) {
            return printLiteralElement(el, isInPlural);
        }
        if (isArgumentElement(el)) {
            return printArgumentElement(el);
        }
        if (isDateElement(el) || isTimeElement(el) || isNumberElement(el)) {
            return printSimpleFormatElement(el);
        }
        if (isPluralElement(el)) {
            return printPluralElement(el);
        }
        if (isSelectElement(el)) {
            return printSelectElement(el);
        }
        if (isPoundElement(el)) {
            return '#';
        }
        if (isTagElement(el)) {
            return printTagElement(el);
        }
    });
    return printedNodes.join('');
}
function printTagElement(el) {
    return "<" + el.value + ">" + printAST(el.children) + "</" + el.value + ">";
}
function printEscapedMessage(message) {
    return message.replace(/([{}](?:.*[{}])?)/su, "'$1'");
}
function printLiteralElement(_a, isInPlural) {
    var value = _a.value;
    var escaped = printEscapedMessage(value);
    return isInPlural ? escaped.replace('#', "'#'") : escaped;
}
function printArgumentElement(_a) {
    var value = _a.value;
    return "{" + value + "}";
}
function printSimpleFormatElement(el) {
    return "{" + el.value + ", " + TYPE[el.type] + (el.style ? ", " + printArgumentStyle(el.style) : '') + "}";
}
function printNumberSkeletonToken(token) {
    var stem = token.stem, options = token.options;
    return options.length === 0
        ? stem
        : "" + stem + options.map(function (o) { return "/" + o; }).join('');
}
function printArgumentStyle(style) {
    if (typeof style === 'string') {
        return printEscapedMessage(style);
    }
    else if (style.type === 1 /* dateTime */) {
        return "::" + printDateTimeSkeleton(style);
    }
    else {
        return "::" + style.tokens.map(printNumberSkeletonToken).join(' ');
    }
}
export function printDateTimeSkeleton(style) {
    return style.pattern;
}
function printSelectElement(el) {
    var msg = [
        el.value,
        'select',
        Object.keys(el.options)
            .map(function (id) { return id + "{" + doPrintAST(el.options[id].value, false) + "}"; })
            .join(' '),
    ].join(',');
    return "{" + msg + "}";
}
function printPluralElement(el) {
    var type = el.pluralType === 'cardinal' ? 'plural' : 'selectordinal';
    var msg = [
        el.value,
        type,
        __spreadArrays([
            el.offset ? "offset:" + el.offset : ''
        ], Object.keys(el.options).map(function (id) { return id + "{" + doPrintAST(el.options[id].value, true) + "}"; })).filter(Boolean)
            .join(' '),
    ].join(',');
    return "{" + msg + "}";
}

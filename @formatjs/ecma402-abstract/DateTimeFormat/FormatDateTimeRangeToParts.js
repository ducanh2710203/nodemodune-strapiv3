"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatDateTimeRangeToParts = void 0;
var PartitionDateTimeRangePattern_1 = require("./PartitionDateTimeRangePattern");
function FormatDateTimeRangeToParts(dtf, x, y, implDetails) {
    var parts = PartitionDateTimeRangePattern_1.PartitionDateTimeRangePattern(dtf, x, y, implDetails);
    var result = new Array(0);
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        result.push({
            type: part.type,
            value: part.value,
            source: part.source,
        });
    }
    return result;
}
exports.FormatDateTimeRangeToParts = FormatDateTimeRangeToParts;

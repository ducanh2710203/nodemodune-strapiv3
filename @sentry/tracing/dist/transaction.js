Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var hub_1 = require("@sentry/hub");
var utils_1 = require("@sentry/utils");
var span_1 = require("./span");
/** JSDoc */
var Transaction = /** @class */ (function (_super) {
    tslib_1.__extends(Transaction, _super);
    /**
     * This constructor should never be called manually. Those instrumenting tracing should use
     * `Sentry.startTransaction()`, and internal methods should use `hub.startTransaction()`.
     * @internal
     * @hideconstructor
     * @hidden
     */
    function Transaction(transactionContext, hub) {
        var _this = _super.call(this, transactionContext) || this;
        _this._metadata = {};
        _this._measurements = {};
        /**
         * The reference to the current hub.
         */
        _this._hub = hub_1.getCurrentHub();
        if (utils_1.isInstanceOf(hub, hub_1.Hub)) {
            _this._hub = hub;
        }
        _this.name = transactionContext.name || '';
        _this._trimEnd = transactionContext.trimEnd;
        // this is because transactions are also spans, and spans have a transaction pointer
        _this.transaction = _this;
        return _this;
    }
    /**
     * JSDoc
     */
    Transaction.prototype.setName = function (name) {
        this.name = name;
    };
    /**
     * Attaches SpanRecorder to the span itself
     * @param maxlen maximum number of spans that can be recorded
     */
    Transaction.prototype.initSpanRecorder = function (maxlen) {
        if (maxlen === void 0) { maxlen = 1000; }
        if (!this.spanRecorder) {
            this.spanRecorder = new span_1.SpanRecorder(maxlen);
        }
        this.spanRecorder.add(this);
    };
    /**
     * Set observed measurements for this transaction.
     * @hidden
     */
    Transaction.prototype.setMeasurements = function (measurements) {
        this._measurements = tslib_1.__assign({}, measurements);
    };
    /**
     * Set metadata for this transaction.
     * @hidden
     */
    Transaction.prototype.setMetadata = function (newMetadata) {
        this._metadata = tslib_1.__assign(tslib_1.__assign({}, this._metadata), newMetadata);
    };
    /**
     * @inheritDoc
     */
    Transaction.prototype.finish = function (endTimestamp) {
        var _this = this;
        // This transaction is already finished, so we should not flush it again.
        if (this.endTimestamp !== undefined) {
            return undefined;
        }
        if (!this.name) {
            utils_1.logger.warn('Transaction has no name, falling back to `<unlabeled transaction>`.');
            this.name = '<unlabeled transaction>';
        }
        // just sets the end timestamp
        _super.prototype.finish.call(this, endTimestamp);
        if (this.sampled !== true) {
            // At this point if `sampled !== true` we want to discard the transaction.
            utils_1.logger.log('[Tracing] Discarding transaction because its trace was not chosen to be sampled.');
            return undefined;
        }
        var finishedSpans = this.spanRecorder ? this.spanRecorder.spans.filter(function (s) { return s !== _this && s.endTimestamp; }) : [];
        if (this._trimEnd && finishedSpans.length > 0) {
            this.endTimestamp = finishedSpans.reduce(function (prev, current) {
                if (prev.endTimestamp && current.endTimestamp) {
                    return prev.endTimestamp > current.endTimestamp ? prev : current;
                }
                return prev;
            }).endTimestamp;
        }
        var transaction = {
            contexts: {
                trace: this.getTraceContext(),
            },
            spans: finishedSpans,
            start_timestamp: this.startTimestamp,
            tags: this.tags,
            timestamp: this.endTimestamp,
            transaction: this.name,
            type: 'transaction',
            debug_meta: this._metadata,
        };
        var hasMeasurements = Object.keys(this._measurements).length > 0;
        if (hasMeasurements) {
            utils_1.logger.log('[Measurements] Adding measurements to transaction', JSON.stringify(this._measurements, undefined, 2));
            transaction.measurements = this._measurements;
        }
        return this._hub.captureEvent(transaction);
    };
    /**
     * @inheritDoc
     */
    Transaction.prototype.toContext = function () {
        var spanContext = _super.prototype.toContext.call(this);
        return utils_1.dropUndefinedKeys(tslib_1.__assign(tslib_1.__assign({}, spanContext), { name: this.name, trimEnd: this._trimEnd }));
    };
    /**
     * @inheritDoc
     */
    Transaction.prototype.updateWithContext = function (transactionContext) {
        var _a;
        _super.prototype.updateWithContext.call(this, transactionContext);
        this.name = (_a = transactionContext.name, (_a !== null && _a !== void 0 ? _a : ''));
        this._trimEnd = transactionContext.trimEnd;
        return this;
    };
    return Transaction;
}(span_1.Span));
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map
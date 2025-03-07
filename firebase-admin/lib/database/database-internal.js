/*! firebase-admin v9.12.0 */
"use strict";
/*!
 * Copyright 2020 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
var url_1 = require("url");
var path = require("path");
var error_1 = require("../utils/error");
var validator = require("../utils/validator");
var api_request_1 = require("../utils/api-request");
var index_1 = require("../utils/index");
var TOKEN_REFRESH_THRESHOLD_MILLIS = 5 * 60 * 1000;
var DatabaseService = /** @class */ (function () {
    function DatabaseService(app) {
        this.databases = {};
        if (!validator.isNonNullObject(app) || !('options' in app)) {
            throw new error_1.FirebaseDatabaseError({
                code: 'invalid-argument',
                message: 'First argument passed to admin.database() must be a valid Firebase app instance.',
            });
        }
        this.appInternal = app;
    }
    /**
     * @internal
     */
    DatabaseService.prototype.delete = function () {
        var _this = this;
        if (this.tokenListener) {
            this.appInternal.INTERNAL.removeAuthTokenListener(this.tokenListener);
            clearTimeout(this.tokenRefreshTimeout);
        }
        var promises = [];
        for (var _i = 0, _a = Object.keys(this.databases); _i < _a.length; _i++) {
            var dbUrl = _a[_i];
            var db = this.databases[dbUrl];
            promises.push(db.INTERNAL.delete());
        }
        return Promise.all(promises).then(function () {
            _this.databases = {};
        });
    };
    Object.defineProperty(DatabaseService.prototype, "app", {
        /**
         * Returns the app associated with this DatabaseService instance.
         *
         * @return The app associated with this DatabaseService instance.
         */
        get: function () {
            return this.appInternal;
        },
        enumerable: false,
        configurable: true
    });
    DatabaseService.prototype.getDatabase = function (url) {
        var dbUrl = this.ensureUrl(url);
        if (!validator.isNonEmptyString(dbUrl)) {
            throw new error_1.FirebaseDatabaseError({
                code: 'invalid-argument',
                message: 'Database URL must be a valid, non-empty URL string.',
            });
        }
        var db = this.databases[dbUrl];
        if (typeof db === 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            var rtdb = require('@firebase/database-compat/standalone');
            db = rtdb.initStandalone(this.appInternal, dbUrl, index_1.getSdkVersion()).instance;
            var rulesClient_1 = new DatabaseRulesClient(this.app, dbUrl);
            db.getRules = function () {
                return rulesClient_1.getRules();
            };
            db.getRulesJSON = function () {
                return rulesClient_1.getRulesJSON();
            };
            db.setRules = function (source) {
                return rulesClient_1.setRules(source);
            };
            this.databases[dbUrl] = db;
        }
        if (!this.tokenListener) {
            this.tokenListener = this.onTokenChange.bind(this);
            this.appInternal.INTERNAL.addAuthTokenListener(this.tokenListener);
        }
        return db;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DatabaseService.prototype.onTokenChange = function (_) {
        var token = this.appInternal.INTERNAL.getCachedToken();
        if (token) {
            var delayMillis = token.expirationTime - TOKEN_REFRESH_THRESHOLD_MILLIS - Date.now();
            // If the new token is set to expire soon (unlikely), do nothing. Somebody will eventually
            // notice and refresh the token, at which point this callback will fire again.
            if (delayMillis > 0) {
                this.scheduleTokenRefresh(delayMillis);
            }
        }
    };
    DatabaseService.prototype.scheduleTokenRefresh = function (delayMillis) {
        var _this = this;
        clearTimeout(this.tokenRefreshTimeout);
        this.tokenRefreshTimeout = setTimeout(function () {
            _this.appInternal.INTERNAL.getToken(/*forceRefresh=*/ true)
                .catch(function () {
                // Ignore the error since this might just be an intermittent failure. If we really cannot
                // refresh the token, an error will be logged once the existing token expires and we try
                // to fetch a fresh one.
            });
        }, delayMillis);
    };
    DatabaseService.prototype.ensureUrl = function (url) {
        if (typeof url !== 'undefined') {
            return url;
        }
        else if (typeof this.appInternal.options.databaseURL !== 'undefined') {
            return this.appInternal.options.databaseURL;
        }
        throw new error_1.FirebaseDatabaseError({
            code: 'invalid-argument',
            message: 'Can\'t determine Firebase Database URL.',
        });
    };
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
var RULES_URL_PATH = '.settings/rules.json';
/**
 * A helper client for managing RTDB security rules.
 */
var DatabaseRulesClient = /** @class */ (function () {
    function DatabaseRulesClient(app, dbUrl) {
        var parsedUrl = new url_1.URL(dbUrl);
        var emulatorHost = process.env.FIREBASE_DATABASE_EMULATOR_HOST;
        if (emulatorHost) {
            var namespace = extractNamespace(parsedUrl);
            parsedUrl = new url_1.URL("http://" + emulatorHost + "?ns=" + namespace);
        }
        parsedUrl.pathname = path.join(parsedUrl.pathname, RULES_URL_PATH);
        this.dbUrl = parsedUrl.toString();
        this.httpClient = new api_request_1.AuthorizedHttpClient(app);
    }
    /**
     * Gets the currently applied security rules as a string. The return value consists of
     * the rules source including comments.
     *
     * @return A promise fulfilled with the rules as a raw string.
     */
    DatabaseRulesClient.prototype.getRules = function () {
        var _this = this;
        var req = {
            method: 'GET',
            url: this.dbUrl,
        };
        return this.httpClient.send(req)
            .then(function (resp) {
            if (!resp.text) {
                throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INTERNAL_ERROR, 'HTTP response missing data.');
            }
            return resp.text;
        })
            .catch(function (err) {
            throw _this.handleError(err);
        });
    };
    /**
     * Gets the currently applied security rules as a parsed JSON object. Any comments in
     * the original source are stripped away.
     *
     * @return {Promise<object>} A promise fulfilled with the parsed rules source.
     */
    DatabaseRulesClient.prototype.getRulesJSON = function () {
        var _this = this;
        var req = {
            method: 'GET',
            url: this.dbUrl,
            data: { format: 'strict' },
        };
        return this.httpClient.send(req)
            .then(function (resp) {
            return resp.data;
        })
            .catch(function (err) {
            throw _this.handleError(err);
        });
    };
    /**
     * Sets the specified rules on the Firebase Database instance. If the rules source is
     * specified as a string or a Buffer, it may include comments.
     *
     * @param {string|Buffer|object} source Source of the rules to apply. Must not be `null`
     *  or empty.
     * @return {Promise<void>} Resolves when the rules are set on the Database.
     */
    DatabaseRulesClient.prototype.setRules = function (source) {
        var _this = this;
        if (!validator.isNonEmptyString(source) &&
            !validator.isBuffer(source) &&
            !validator.isNonNullObject(source)) {
            var error = new error_1.FirebaseDatabaseError({
                code: 'invalid-argument',
                message: 'Source must be a non-empty string, Buffer or an object.',
            });
            return Promise.reject(error);
        }
        var req = {
            method: 'PUT',
            url: this.dbUrl,
            data: source,
            headers: {
                'content-type': 'application/json; charset=utf-8',
            },
        };
        return this.httpClient.send(req)
            .then(function () {
            return;
        })
            .catch(function (err) {
            throw _this.handleError(err);
        });
    };
    DatabaseRulesClient.prototype.handleError = function (err) {
        if (err instanceof api_request_1.HttpError) {
            return new error_1.FirebaseDatabaseError({
                code: error_1.AppErrorCodes.INTERNAL_ERROR,
                message: this.getErrorMessage(err),
            });
        }
        return err;
    };
    DatabaseRulesClient.prototype.getErrorMessage = function (err) {
        var intro = 'Error while accessing security rules';
        try {
            var body = err.response.data;
            if (body && body.error) {
                return intro + ": " + body.error.trim();
            }
        }
        catch (_a) {
            // Ignore parsing errors
        }
        return intro + ": " + err.response.text;
    };
    return DatabaseRulesClient;
}());
function extractNamespace(parsedUrl) {
    var ns = parsedUrl.searchParams.get('ns');
    if (ns) {
        return ns;
    }
    var hostname = parsedUrl.hostname;
    var dotIndex = hostname.indexOf('.');
    return hostname.substring(0, dotIndex).toLowerCase();
}

/*! firebase-admin v9.12.0 */
"use strict";
/*!
 * @license
 * Copyright 2021 Google Inc.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAppCheckError = exports.APP_CHECK_ERROR_CODE_MAPPING = exports.AppCheckApiClient = void 0;
var api_request_1 = require("../utils/api-request");
var error_1 = require("../utils/error");
var utils = require("../utils/index");
var validator = require("../utils/validator");
// App Check backend constants
var FIREBASE_APP_CHECK_V1_API_URL_FORMAT = 'https://firebaseappcheck.googleapis.com/v1beta/projects/{projectId}/apps/{appId}:exchangeCustomToken';
var FIREBASE_APP_CHECK_CONFIG_HEADERS = {
    'X-Firebase-Client': "fire-admin-node/" + utils.getSdkVersion()
};
/**
 * Class that facilitates sending requests to the Firebase App Check backend API.
 *
 * @internal
 */
var AppCheckApiClient = /** @class */ (function () {
    function AppCheckApiClient(app) {
        this.app = app;
        if (!validator.isNonNullObject(app) || !('options' in app)) {
            throw new FirebaseAppCheckError('invalid-argument', 'First argument passed to admin.appCheck() must be a valid Firebase app instance.');
        }
        this.httpClient = new api_request_1.AuthorizedHttpClient(app);
    }
    /**
     * Exchange a signed custom token to App Check token
     *
     * @param customToken The custom token to be exchanged.
     * @param appId The mobile App ID.
     * @return A promise that fulfills with a `AppCheckToken`.
     */
    AppCheckApiClient.prototype.exchangeToken = function (customToken, appId) {
        var _this = this;
        if (!validator.isNonEmptyString(appId)) {
            throw new FirebaseAppCheckError('invalid-argument', '`appId` must be a non-empty string.');
        }
        if (!validator.isNonEmptyString(customToken)) {
            throw new FirebaseAppCheckError('invalid-argument', '`customToken` must be a non-empty string.');
        }
        return this.getUrl(appId)
            .then(function (url) {
            var request = {
                method: 'POST',
                url: url,
                headers: FIREBASE_APP_CHECK_CONFIG_HEADERS,
                data: { customToken: customToken }
            };
            return _this.httpClient.send(request);
        })
            .then(function (resp) {
            return _this.toAppCheckToken(resp);
        })
            .catch(function (err) {
            throw _this.toFirebaseError(err);
        });
    };
    AppCheckApiClient.prototype.getUrl = function (appId) {
        return this.getProjectId()
            .then(function (projectId) {
            var urlParams = {
                projectId: projectId,
                appId: appId,
            };
            var baseUrl = utils.formatString(FIREBASE_APP_CHECK_V1_API_URL_FORMAT, urlParams);
            return utils.formatString(baseUrl);
        });
    };
    AppCheckApiClient.prototype.getProjectId = function () {
        var _this = this;
        if (this.projectId) {
            return Promise.resolve(this.projectId);
        }
        return utils.findProjectId(this.app)
            .then(function (projectId) {
            if (!validator.isNonEmptyString(projectId)) {
                throw new FirebaseAppCheckError('unknown-error', 'Failed to determine project ID. Initialize the '
                    + 'SDK with service account credentials or set project ID as an app option. '
                    + 'Alternatively, set the GOOGLE_CLOUD_PROJECT environment variable.');
            }
            _this.projectId = projectId;
            return projectId;
        });
    };
    AppCheckApiClient.prototype.toFirebaseError = function (err) {
        if (err instanceof error_1.PrefixedFirebaseError) {
            return err;
        }
        var response = err.response;
        if (!response.isJson()) {
            return new FirebaseAppCheckError('unknown-error', "Unexpected response with status: " + response.status + " and body: " + response.text);
        }
        var error = response.data.error || {};
        var code = 'unknown-error';
        if (error.status && error.status in exports.APP_CHECK_ERROR_CODE_MAPPING) {
            code = exports.APP_CHECK_ERROR_CODE_MAPPING[error.status];
        }
        var message = error.message || "Unknown server error: " + response.text;
        return new FirebaseAppCheckError(code, message);
    };
    /**
     * Creates an AppCheckToken from the API response.
     *
     * @param resp API response object.
     * @return An AppCheckToken instance.
     */
    AppCheckApiClient.prototype.toAppCheckToken = function (resp) {
        var token = resp.data.attestationToken;
        // `ttl` is a string with the suffix "s" preceded by the number of seconds,
        // with nanoseconds expressed as fractional seconds.
        var ttlMillis = this.stringToMilliseconds(resp.data.ttl);
        return {
            token: token,
            ttlMillis: ttlMillis
        };
    };
    /**
     * Converts a duration string with the suffix `s` to milliseconds.
     *
     * @param duration The duration as a string with the suffix "s" preceded by the
     * number of seconds, with fractional seconds. For example, 3 seconds with 0 nanoseconds
     * is expressed as "3s", while 3 seconds and 1 nanosecond is expressed as "3.000000001s",
     * and 3 seconds and 1 microsecond is expressed as "3.000001s".
     *
     * @return The duration in milliseconds.
     */
    AppCheckApiClient.prototype.stringToMilliseconds = function (duration) {
        if (!validator.isNonEmptyString(duration) || !duration.endsWith('s')) {
            throw new FirebaseAppCheckError('invalid-argument', '`ttl` must be a valid duration string with the suffix `s`.');
        }
        var seconds = duration.slice(0, -1);
        return Math.floor(Number(seconds) * 1000);
    };
    return AppCheckApiClient;
}());
exports.AppCheckApiClient = AppCheckApiClient;
exports.APP_CHECK_ERROR_CODE_MAPPING = {
    ABORTED: 'aborted',
    INVALID_ARGUMENT: 'invalid-argument',
    INVALID_CREDENTIAL: 'invalid-credential',
    INTERNAL: 'internal-error',
    PERMISSION_DENIED: 'permission-denied',
    UNAUTHENTICATED: 'unauthenticated',
    NOT_FOUND: 'not-found',
    UNKNOWN: 'unknown-error',
};
/**
 * Firebase App Check error code structure. This extends PrefixedFirebaseError.
 *
 * @param {AppCheckErrorCode} code The error code.
 * @param {string} message The error message.
 * @constructor
 */
var FirebaseAppCheckError = /** @class */ (function (_super) {
    __extends(FirebaseAppCheckError, _super);
    function FirebaseAppCheckError(code, message) {
        var _this = _super.call(this, 'app-check', code, message) || this;
        /* tslint:disable:max-line-length */
        // Set the prototype explicitly. See the following link for more details:
        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        /* tslint:enable:max-line-length */
        _this.__proto__ = FirebaseAppCheckError.prototype;
        return _this;
    }
    return FirebaseAppCheckError;
}(error_1.PrefixedFirebaseError));
exports.FirebaseAppCheckError = FirebaseAppCheckError;

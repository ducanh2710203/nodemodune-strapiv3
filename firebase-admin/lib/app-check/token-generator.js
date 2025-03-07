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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appCheckErrorFromCryptoSignerError = exports.AppCheckTokenGenerator = void 0;
var validator = require("../utils/validator");
var utils_1 = require("../utils");
var crypto_signer_1 = require("../utils/crypto-signer");
var app_check_api_client_internal_1 = require("./app-check-api-client-internal");
var ONE_MINUTE_IN_SECONDS = 60;
var ONE_MINUTE_IN_MILLIS = ONE_MINUTE_IN_SECONDS * 1000;
var ONE_DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
// Audience to use for Firebase App Check Custom tokens
var FIREBASE_APP_CHECK_AUDIENCE = 'https://firebaseappcheck.googleapis.com/google.firebase.appcheck.v1beta.TokenExchangeService';
/**
 * Class for generating Firebase App Check tokens.
 *
 * @internal
 */
var AppCheckTokenGenerator = /** @class */ (function () {
    /**
     * The AppCheckTokenGenerator class constructor.
     *
     * @param signer The CryptoSigner instance for this token generator.
     * @constructor
     */
    function AppCheckTokenGenerator(signer) {
        if (!validator.isNonNullObject(signer)) {
            throw new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', 'INTERNAL ASSERT: Must provide a CryptoSigner to use AppCheckTokenGenerator.');
        }
        this.signer = signer;
    }
    /**
     * Creates a new custom token that can be exchanged to an App Check token.
     *
     * @param appId The Application ID to use for the generated token.
     *
     * @return A Promise fulfilled with a custom token signed with a service account key
     * that can be exchanged to an App Check token.
     */
    AppCheckTokenGenerator.prototype.createCustomToken = function (appId, options) {
        var _this = this;
        if (!validator.isNonEmptyString(appId)) {
            throw new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', '`appId` must be a non-empty string.');
        }
        var customOptions = {};
        if (typeof options !== 'undefined') {
            customOptions = this.validateTokenOptions(options);
        }
        return this.signer.getAccountId().then(function (account) {
            var header = {
                alg: _this.signer.algorithm,
                typ: 'JWT',
            };
            var iat = Math.floor(Date.now() / 1000);
            var body = __assign({ iss: account, sub: account, 
                // eslint-disable-next-line @typescript-eslint/camelcase
                app_id: appId, aud: FIREBASE_APP_CHECK_AUDIENCE, exp: iat + (ONE_MINUTE_IN_SECONDS * 5), iat: iat }, customOptions);
            var token = _this.encodeSegment(header) + "." + _this.encodeSegment(body);
            return _this.signer.sign(Buffer.from(token))
                .then(function (signature) {
                return token + "." + _this.encodeSegment(signature);
            });
        }).catch(function (err) {
            throw appCheckErrorFromCryptoSignerError(err);
        });
    };
    AppCheckTokenGenerator.prototype.encodeSegment = function (segment) {
        var buffer = (segment instanceof Buffer) ? segment : Buffer.from(JSON.stringify(segment));
        return utils_1.toWebSafeBase64(buffer).replace(/=+$/, '');
    };
    /**
     * Checks if a given `AppCheckTokenOptions` object is valid. If successful, returns an object with
     * custom properties.
     *
     * @param options An options object to be validated.
     * @returns A custom object with ttl converted to protobuf Duration string format.
     */
    AppCheckTokenGenerator.prototype.validateTokenOptions = function (options) {
        if (!validator.isNonNullObject(options)) {
            throw new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', 'AppCheckTokenOptions must be a non-null object.');
        }
        if (typeof options.ttlMillis !== 'undefined') {
            if (!validator.isNumber(options.ttlMillis)) {
                throw new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', 'ttlMillis must be a duration in milliseconds.');
            }
            // ttlMillis must be between 30 minutes and 7 days (inclusive)
            if (options.ttlMillis < (ONE_MINUTE_IN_MILLIS * 30) || options.ttlMillis > (ONE_DAY_IN_MILLIS * 7)) {
                throw new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', 'ttlMillis must be a duration in milliseconds between 30 minutes and 7 days (inclusive).');
            }
            return { ttl: utils_1.transformMillisecondsToSecondsString(options.ttlMillis) };
        }
        return {};
    };
    return AppCheckTokenGenerator;
}());
exports.AppCheckTokenGenerator = AppCheckTokenGenerator;
/**
 * Creates a new FirebaseAppCheckError by extracting the error code, message and other relevant
 * details from a CryptoSignerError.
 *
 * @param err The Error to convert into a FirebaseAppCheckError error
 * @return A Firebase App Check error that can be returned to the user.
 */
function appCheckErrorFromCryptoSignerError(err) {
    if (!(err instanceof crypto_signer_1.CryptoSignerError)) {
        return err;
    }
    if (err.code === crypto_signer_1.CryptoSignerErrorCode.SERVER_ERROR && validator.isNonNullObject(err.cause)) {
        var httpError = err.cause;
        var errorResponse = httpError.response.data;
        if (errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.error) {
            var status = errorResponse.error.status;
            var description = errorResponse.error.message || JSON.stringify(httpError.response);
            var code = 'unknown-error';
            if (status && status in app_check_api_client_internal_1.APP_CHECK_ERROR_CODE_MAPPING) {
                code = app_check_api_client_internal_1.APP_CHECK_ERROR_CODE_MAPPING[status];
            }
            return new app_check_api_client_internal_1.FirebaseAppCheckError(code, "Error returned from server while signing a custom token: " + description);
        }
        return new app_check_api_client_internal_1.FirebaseAppCheckError('internal-error', 'Error returned from server: ' + JSON.stringify(errorResponse) + '.');
    }
    return new app_check_api_client_internal_1.FirebaseAppCheckError(mapToAppCheckErrorCode(err.code), err.message);
}
exports.appCheckErrorFromCryptoSignerError = appCheckErrorFromCryptoSignerError;
function mapToAppCheckErrorCode(code) {
    switch (code) {
        case crypto_signer_1.CryptoSignerErrorCode.INVALID_CREDENTIAL:
            return 'invalid-credential';
        case crypto_signer_1.CryptoSignerErrorCode.INVALID_ARGUMENT:
            return 'invalid-argument';
        default:
            return 'internal-error';
    }
}

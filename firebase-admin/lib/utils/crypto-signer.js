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
exports.CryptoSignerErrorCode = exports.CryptoSignerError = exports.cryptoSignerFromApp = exports.IAMSigner = exports.ServiceAccountSigner = void 0;
var credential_internal_1 = require("../credential/credential-internal");
var api_request_1 = require("./api-request");
var validator = require("../utils/validator");
var ALGORITHM_RS256 = 'RS256';
/**
 * A CryptoSigner implementation that uses an explicitly specified service account private key to
 * sign data. Performs all operations locally, and does not make any RPC calls.
 */
var ServiceAccountSigner = /** @class */ (function () {
    /**
     * Creates a new CryptoSigner instance from the given service account credential.
     *
     * @param {ServiceAccountCredential} credential A service account credential.
     */
    function ServiceAccountSigner(credential) {
        this.credential = credential;
        this.algorithm = ALGORITHM_RS256;
        if (!credential) {
            throw new CryptoSignerError({
                code: CryptoSignerErrorCode.INVALID_CREDENTIAL,
                message: 'INTERNAL ASSERT: Must provide a service account credential to initialize ServiceAccountSigner.',
            });
        }
    }
    /**
     * @inheritDoc
     */
    ServiceAccountSigner.prototype.sign = function (buffer) {
        var crypto = require('crypto'); // eslint-disable-line @typescript-eslint/no-var-requires
        var sign = crypto.createSign('RSA-SHA256');
        sign.update(buffer);
        return Promise.resolve(sign.sign(this.credential.privateKey));
    };
    /**
     * @inheritDoc
     */
    ServiceAccountSigner.prototype.getAccountId = function () {
        return Promise.resolve(this.credential.clientEmail);
    };
    return ServiceAccountSigner;
}());
exports.ServiceAccountSigner = ServiceAccountSigner;
/**
 * A CryptoSigner implementation that uses the remote IAM service to sign data. If initialized without
 * a service account ID, attempts to discover a service account ID by consulting the local Metadata
 * service. This will succeed in managed environments like Google Cloud Functions and App Engine.
 *
 * @see https://cloud.google.com/iam/reference/rest/v1/projects.serviceAccounts/signBlob
 * @see https://cloud.google.com/compute/docs/storing-retrieving-metadata
 */
var IAMSigner = /** @class */ (function () {
    function IAMSigner(httpClient, serviceAccountId) {
        this.algorithm = ALGORITHM_RS256;
        if (!httpClient) {
            throw new CryptoSignerError({
                code: CryptoSignerErrorCode.INVALID_ARGUMENT,
                message: 'INTERNAL ASSERT: Must provide a HTTP client to initialize IAMSigner.',
            });
        }
        if (typeof serviceAccountId !== 'undefined' && !validator.isNonEmptyString(serviceAccountId)) {
            throw new CryptoSignerError({
                code: CryptoSignerErrorCode.INVALID_ARGUMENT,
                message: 'INTERNAL ASSERT: Service account ID must be undefined or a non-empty string.',
            });
        }
        this.httpClient = httpClient;
        this.serviceAccountId = serviceAccountId;
    }
    /**
     * @inheritDoc
     */
    IAMSigner.prototype.sign = function (buffer) {
        var _this = this;
        return this.getAccountId().then(function (serviceAccount) {
            var request = {
                method: 'POST',
                url: "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/" + serviceAccount + ":signBlob",
                data: { payload: buffer.toString('base64') },
            };
            return _this.httpClient.send(request);
        }).then(function (response) {
            // Response from IAM is base64 encoded. Decode it into a buffer and return.
            return Buffer.from(response.data.signedBlob, 'base64');
        }).catch(function (err) {
            if (err instanceof api_request_1.HttpError) {
                throw new CryptoSignerError({
                    code: CryptoSignerErrorCode.SERVER_ERROR,
                    message: err.message,
                    cause: err
                });
            }
            throw err;
        });
    };
    /**
     * @inheritDoc
     */
    IAMSigner.prototype.getAccountId = function () {
        var _this = this;
        if (validator.isNonEmptyString(this.serviceAccountId)) {
            return Promise.resolve(this.serviceAccountId);
        }
        var request = {
            method: 'GET',
            url: 'http://metadata/computeMetadata/v1/instance/service-accounts/default/email',
            headers: {
                'Metadata-Flavor': 'Google',
            },
        };
        var client = new api_request_1.HttpClient();
        return client.send(request).then(function (response) {
            if (!response.text) {
                throw new CryptoSignerError({
                    code: CryptoSignerErrorCode.INTERNAL_ERROR,
                    message: 'HTTP Response missing payload',
                });
            }
            _this.serviceAccountId = response.text;
            return response.text;
        }).catch(function (err) {
            throw new CryptoSignerError({
                code: CryptoSignerErrorCode.INVALID_CREDENTIAL,
                message: 'Failed to determine service account. Make sure to initialize ' +
                    'the SDK with a service account credential. Alternatively specify a service ' +
                    ("account with iam.serviceAccounts.signBlob permission. Original error: " + err),
            });
        });
    };
    return IAMSigner;
}());
exports.IAMSigner = IAMSigner;
/**
 * Creates a new CryptoSigner instance for the given app. If the app has been initialized with a
 * service account credential, creates a ServiceAccountSigner.
 *
 * @param {FirebaseApp} app A FirebaseApp instance.
 * @return {CryptoSigner} A CryptoSigner instance.
 */
function cryptoSignerFromApp(app) {
    var credential = app.options.credential;
    if (credential instanceof credential_internal_1.ServiceAccountCredential) {
        return new ServiceAccountSigner(credential);
    }
    return new IAMSigner(new api_request_1.AuthorizedHttpClient(app), app.options.serviceAccountId);
}
exports.cryptoSignerFromApp = cryptoSignerFromApp;
/**
 * CryptoSigner error code structure.
 *
 * @param {ErrorInfo} errorInfo The error information (code and message).
 * @constructor
 */
var CryptoSignerError = /** @class */ (function (_super) {
    __extends(CryptoSignerError, _super);
    function CryptoSignerError(errorInfo) {
        var _this = _super.call(this, errorInfo.message) || this;
        _this.errorInfo = errorInfo;
        /* tslint:disable:max-line-length */
        // Set the prototype explicitly. See the following link for more details:
        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        /* tslint:enable:max-line-length */
        _this.__proto__ = CryptoSignerError.prototype;
        return _this;
    }
    Object.defineProperty(CryptoSignerError.prototype, "code", {
        /** @return {string} The error code. */
        get: function () {
            return this.errorInfo.code;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CryptoSignerError.prototype, "message", {
        /** @return {string} The error message. */
        get: function () {
            return this.errorInfo.message;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CryptoSignerError.prototype, "cause", {
        /** @return {object} The error data. */
        get: function () {
            return this.errorInfo.cause;
        },
        enumerable: false,
        configurable: true
    });
    return CryptoSignerError;
}(Error));
exports.CryptoSignerError = CryptoSignerError;
/**
 * Crypto Signer error codes and their default messages.
 */
var CryptoSignerErrorCode = /** @class */ (function () {
    function CryptoSignerErrorCode() {
    }
    CryptoSignerErrorCode.INVALID_ARGUMENT = 'invalid-argument';
    CryptoSignerErrorCode.INTERNAL_ERROR = 'internal-error';
    CryptoSignerErrorCode.INVALID_CREDENTIAL = 'invalid-credential';
    CryptoSignerErrorCode.SERVER_ERROR = 'server-error';
    return CryptoSignerErrorCode;
}());
exports.CryptoSignerErrorCode = CryptoSignerErrorCode;

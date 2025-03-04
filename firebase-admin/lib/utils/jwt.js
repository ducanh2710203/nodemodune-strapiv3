/*! firebase-admin v9.12.0 */
"use strict";
/*!
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
exports.JwtErrorCode = exports.JwtError = exports.decodeJwt = exports.verifyJwtSignature = exports.EmulatorSignatureVerifier = exports.PublicKeySignatureVerifier = exports.UrlKeyFetcher = exports.JwksFetcher = exports.ALGORITHM_RS256 = void 0;
var validator = require("./validator");
var jwt = require("jsonwebtoken");
var jwks = require("jwks-rsa");
var api_request_1 = require("../utils/api-request");
exports.ALGORITHM_RS256 = 'RS256';
// `jsonwebtoken` converts errors from the `getKey` callback to its own `JsonWebTokenError` type
// and prefixes the error message with the following. Use the prefix to identify errors thrown
// from the key provider callback.
// https://github.com/auth0/node-jsonwebtoken/blob/d71e383862fc735991fd2e759181480f066bf138/verify.js#L96
var JWT_CALLBACK_ERROR_PREFIX = 'error in secret or public key callback: ';
var NO_MATCHING_KID_ERROR_MESSAGE = 'no-matching-kid-error';
var NO_KID_IN_HEADER_ERROR_MESSAGE = 'no-kid-in-header-error';
var HOUR_IN_SECONDS = 3600;
var JwksFetcher = /** @class */ (function () {
    function JwksFetcher(jwksUrl) {
        this.publicKeysExpireAt = 0;
        if (!validator.isURL(jwksUrl)) {
            throw new Error('The provided JWKS URL is not a valid URL.');
        }
        this.client = jwks({
            jwksUri: jwksUrl,
            cache: false,
        });
    }
    JwksFetcher.prototype.fetchPublicKeys = function () {
        if (this.shouldRefresh()) {
            return this.refresh();
        }
        return Promise.resolve(this.publicKeys);
    };
    JwksFetcher.prototype.shouldRefresh = function () {
        return !this.publicKeys || this.publicKeysExpireAt <= Date.now();
    };
    JwksFetcher.prototype.refresh = function () {
        var _this = this;
        return this.client.getSigningKeys()
            .then(function (signingKeys) {
            // reset expire at from previous set of keys.
            _this.publicKeysExpireAt = 0;
            var newKeys = signingKeys.reduce(function (map, signingKey) {
                map[signingKey.kid] = signingKey.getPublicKey();
                return map;
            }, {});
            _this.publicKeysExpireAt = Date.now() + (HOUR_IN_SECONDS * 6 * 1000);
            _this.publicKeys = newKeys;
            return newKeys;
        }).catch(function (err) {
            throw new Error("Error fetching Json Web Keys: " + err.message);
        });
    };
    return JwksFetcher;
}());
exports.JwksFetcher = JwksFetcher;
/**
 * Class to fetch public keys from a client certificates URL.
 */
var UrlKeyFetcher = /** @class */ (function () {
    function UrlKeyFetcher(clientCertUrl, httpAgent) {
        this.clientCertUrl = clientCertUrl;
        this.httpAgent = httpAgent;
        this.publicKeysExpireAt = 0;
        if (!validator.isURL(clientCertUrl)) {
            throw new Error('The provided public client certificate URL is not a valid URL.');
        }
    }
    /**
     * Fetches the public keys for the Google certs.
     *
     * @return A promise fulfilled with public keys for the Google certs.
     */
    UrlKeyFetcher.prototype.fetchPublicKeys = function () {
        if (this.shouldRefresh()) {
            return this.refresh();
        }
        return Promise.resolve(this.publicKeys);
    };
    /**
     * Checks if the cached public keys need to be refreshed.
     *
     * @returns Whether the keys should be fetched from the client certs url or not.
     */
    UrlKeyFetcher.prototype.shouldRefresh = function () {
        return !this.publicKeys || this.publicKeysExpireAt <= Date.now();
    };
    UrlKeyFetcher.prototype.refresh = function () {
        var _this = this;
        var client = new api_request_1.HttpClient();
        var request = {
            method: 'GET',
            url: this.clientCertUrl,
            httpAgent: this.httpAgent,
        };
        return client.send(request).then(function (resp) {
            if (!resp.isJson() || resp.data.error) {
                // Treat all non-json messages and messages with an 'error' field as
                // error responses.
                throw new api_request_1.HttpError(resp);
            }
            // reset expire at from previous set of keys.
            _this.publicKeysExpireAt = 0;
            if (Object.prototype.hasOwnProperty.call(resp.headers, 'cache-control')) {
                var cacheControlHeader = resp.headers['cache-control'];
                var parts = cacheControlHeader.split(',');
                parts.forEach(function (part) {
                    var subParts = part.trim().split('=');
                    if (subParts[0] === 'max-age') {
                        var maxAge = +subParts[1];
                        _this.publicKeysExpireAt = Date.now() + (maxAge * 1000);
                    }
                });
            }
            _this.publicKeys = resp.data;
            return resp.data;
        }).catch(function (err) {
            if (err instanceof api_request_1.HttpError) {
                var errorMessage = 'Error fetching public keys for Google certs: ';
                var resp = err.response;
                if (resp.isJson() && resp.data.error) {
                    errorMessage += "" + resp.data.error;
                    if (resp.data.error_description) {
                        errorMessage += ' (' + resp.data.error_description + ')';
                    }
                }
                else {
                    errorMessage += "" + resp.text;
                }
                throw new Error(errorMessage);
            }
            throw err;
        });
    };
    return UrlKeyFetcher;
}());
exports.UrlKeyFetcher = UrlKeyFetcher;
/**
 * Class for verifing JWT signature with a public key.
 */
var PublicKeySignatureVerifier = /** @class */ (function () {
    function PublicKeySignatureVerifier(keyFetcher) {
        this.keyFetcher = keyFetcher;
        if (!validator.isNonNullObject(keyFetcher)) {
            throw new Error('The provided key fetcher is not an object or null.');
        }
    }
    PublicKeySignatureVerifier.withCertificateUrl = function (clientCertUrl, httpAgent) {
        return new PublicKeySignatureVerifier(new UrlKeyFetcher(clientCertUrl, httpAgent));
    };
    PublicKeySignatureVerifier.withJwksUrl = function (jwksUrl) {
        return new PublicKeySignatureVerifier(new JwksFetcher(jwksUrl));
    };
    PublicKeySignatureVerifier.prototype.verify = function (token) {
        var _this = this;
        if (!validator.isString(token)) {
            return Promise.reject(new JwtError(JwtErrorCode.INVALID_ARGUMENT, 'The provided token must be a string.'));
        }
        return verifyJwtSignature(token, getKeyCallback(this.keyFetcher), { algorithms: [exports.ALGORITHM_RS256] })
            .catch(function (error) {
            if (error.code === JwtErrorCode.NO_KID_IN_HEADER) {
                // No kid in JWT header. Try with all the public keys.
                return _this.verifyWithoutKid(token);
            }
            throw error;
        });
    };
    PublicKeySignatureVerifier.prototype.verifyWithoutKid = function (token) {
        var _this = this;
        return this.keyFetcher.fetchPublicKeys()
            .then(function (publicKeys) { return _this.verifyWithAllKeys(token, publicKeys); });
    };
    PublicKeySignatureVerifier.prototype.verifyWithAllKeys = function (token, keys) {
        var promises = [];
        Object.values(keys).forEach(function (key) {
            var result = verifyJwtSignature(token, key)
                .then(function () { return true; })
                .catch(function (error) {
                if (error.code === JwtErrorCode.TOKEN_EXPIRED) {
                    throw error;
                }
                return false;
            });
            promises.push(result);
        });
        return Promise.all(promises)
            .then(function (result) {
            if (result.every(function (r) { return r === false; })) {
                throw new JwtError(JwtErrorCode.INVALID_SIGNATURE, 'Invalid token signature.');
            }
        });
    };
    return PublicKeySignatureVerifier;
}());
exports.PublicKeySignatureVerifier = PublicKeySignatureVerifier;
/**
 * Class for verifing unsigned (emulator) JWTs.
 */
var EmulatorSignatureVerifier = /** @class */ (function () {
    function EmulatorSignatureVerifier() {
    }
    EmulatorSignatureVerifier.prototype.verify = function (token) {
        // Signature checks skipped for emulator; no need to fetch public keys.
        return verifyJwtSignature(token, '');
    };
    return EmulatorSignatureVerifier;
}());
exports.EmulatorSignatureVerifier = EmulatorSignatureVerifier;
/**
 * Provides a callback to fetch public keys.
 *
 * @param fetcher KeyFetcher to fetch the keys from.
 * @returns A callback function that can be used to get keys in `jsonwebtoken`.
 */
function getKeyCallback(fetcher) {
    return function (header, callback) {
        if (!header.kid) {
            callback(new Error(NO_KID_IN_HEADER_ERROR_MESSAGE));
        }
        var kid = header.kid || '';
        fetcher.fetchPublicKeys().then(function (publicKeys) {
            if (!Object.prototype.hasOwnProperty.call(publicKeys, kid)) {
                callback(new Error(NO_MATCHING_KID_ERROR_MESSAGE));
            }
            else {
                callback(null, publicKeys[kid]);
            }
        })
            .catch(function (error) {
            callback(error);
        });
    };
}
/**
 * Verifies the signature of a JWT using the provided secret or a function to fetch
 * the secret or public key.
 *
 * @param token The JWT to be verfied.
 * @param secretOrPublicKey The secret or a function to fetch the secret or public key.
 * @param options JWT verification options.
 * @returns A Promise resolving for a token with a valid signature.
 */
function verifyJwtSignature(token, secretOrPublicKey, options) {
    if (!validator.isString(token)) {
        return Promise.reject(new JwtError(JwtErrorCode.INVALID_ARGUMENT, 'The provided token must be a string.'));
    }
    return new Promise(function (resolve, reject) {
        jwt.verify(token, secretOrPublicKey, options, function (error) {
            if (!error) {
                return resolve();
            }
            if (error.name === 'TokenExpiredError') {
                return reject(new JwtError(JwtErrorCode.TOKEN_EXPIRED, 'The provided token has expired. Get a fresh token from your ' +
                    'client app and try again.'));
            }
            else if (error.name === 'JsonWebTokenError') {
                if (error.message && error.message.includes(JWT_CALLBACK_ERROR_PREFIX)) {
                    var message = error.message.split(JWT_CALLBACK_ERROR_PREFIX).pop() || 'Error fetching public keys.';
                    var code = JwtErrorCode.KEY_FETCH_ERROR;
                    if (message === NO_MATCHING_KID_ERROR_MESSAGE) {
                        code = JwtErrorCode.NO_MATCHING_KID;
                    }
                    else if (message === NO_KID_IN_HEADER_ERROR_MESSAGE) {
                        code = JwtErrorCode.NO_KID_IN_HEADER;
                    }
                    return reject(new JwtError(code, message));
                }
            }
            return reject(new JwtError(JwtErrorCode.INVALID_SIGNATURE, error.message));
        });
    });
}
exports.verifyJwtSignature = verifyJwtSignature;
/**
 * Decodes general purpose Firebase JWTs.
 *
 * @param jwtToken JWT token to be decoded.
 * @returns Decoded token containing the header and payload.
 */
function decodeJwt(jwtToken) {
    if (!validator.isString(jwtToken)) {
        return Promise.reject(new JwtError(JwtErrorCode.INVALID_ARGUMENT, 'The provided token must be a string.'));
    }
    var fullDecodedToken = jwt.decode(jwtToken, {
        complete: true,
    });
    if (!fullDecodedToken) {
        return Promise.reject(new JwtError(JwtErrorCode.INVALID_ARGUMENT, 'Decoding token failed.'));
    }
    var header = fullDecodedToken === null || fullDecodedToken === void 0 ? void 0 : fullDecodedToken.header;
    var payload = fullDecodedToken === null || fullDecodedToken === void 0 ? void 0 : fullDecodedToken.payload;
    return Promise.resolve({ header: header, payload: payload });
}
exports.decodeJwt = decodeJwt;
/**
 * Jwt error code structure.
 *
 * @param code The error code.
 * @param message The error message.
 * @constructor
 */
var JwtError = /** @class */ (function (_super) {
    __extends(JwtError, _super);
    function JwtError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.message = message;
        _this.__proto__ = JwtError.prototype;
        return _this;
    }
    return JwtError;
}(Error));
exports.JwtError = JwtError;
/**
 * JWT error codes.
 */
var JwtErrorCode;
(function (JwtErrorCode) {
    JwtErrorCode["INVALID_ARGUMENT"] = "invalid-argument";
    JwtErrorCode["INVALID_CREDENTIAL"] = "invalid-credential";
    JwtErrorCode["TOKEN_EXPIRED"] = "token-expired";
    JwtErrorCode["INVALID_SIGNATURE"] = "invalid-token";
    JwtErrorCode["NO_MATCHING_KID"] = "no-matching-kid-error";
    JwtErrorCode["NO_KID_IN_HEADER"] = "no-kid-error";
    JwtErrorCode["KEY_FETCH_ERROR"] = "key-fetch-error";
})(JwtErrorCode = exports.JwtErrorCode || (exports.JwtErrorCode = {}));

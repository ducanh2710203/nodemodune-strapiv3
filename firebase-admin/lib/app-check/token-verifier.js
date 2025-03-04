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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCheckTokenVerifier = void 0;
var validator = require("../utils/validator");
var util = require("../utils/index");
var app_check_api_client_internal_1 = require("./app-check-api-client-internal");
var jwt_1 = require("../utils/jwt");
var APP_CHECK_ISSUER = 'https://firebaseappcheck.googleapis.com/';
var JWKS_URL = 'https://firebaseappcheck.googleapis.com/v1beta/jwks';
/**
 * Class for verifying Firebase App Check tokens.
 *
 * @internal
 */
var AppCheckTokenVerifier = /** @class */ (function () {
    function AppCheckTokenVerifier(app) {
        this.app = app;
        this.signatureVerifier = jwt_1.PublicKeySignatureVerifier.withJwksUrl(JWKS_URL);
    }
    /**
     * Verifies the format and signature of a Firebase App Check token.
     *
     * @param token The Firebase Auth JWT token to verify.
     * @return A promise fulfilled with the decoded claims of the Firebase App Check token.
     */
    AppCheckTokenVerifier.prototype.verifyToken = function (token) {
        var _this = this;
        if (!validator.isString(token)) {
            throw new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', 'App check token must be a non-null string.');
        }
        return this.ensureProjectId()
            .then(function (projectId) {
            return _this.decodeAndVerify(token, projectId);
        })
            .then(function (decoded) {
            var decodedAppCheckToken = decoded.payload;
            // eslint-disable-next-line @typescript-eslint/camelcase
            decodedAppCheckToken.app_id = decodedAppCheckToken.sub;
            return decodedAppCheckToken;
        });
    };
    AppCheckTokenVerifier.prototype.ensureProjectId = function () {
        return util.findProjectId(this.app)
            .then(function (projectId) {
            if (!validator.isNonEmptyString(projectId)) {
                throw new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-credential', 'Must initialize app with a cert credential or set your Firebase project ID as the ' +
                    'GOOGLE_CLOUD_PROJECT environment variable to verify an App Check token.');
            }
            return projectId;
        });
    };
    AppCheckTokenVerifier.prototype.decodeAndVerify = function (token, projectId) {
        var _this = this;
        return this.safeDecode(token)
            .then(function (decodedToken) {
            _this.verifyContent(decodedToken, projectId);
            return _this.verifySignature(token)
                .then(function () { return decodedToken; });
        });
    };
    AppCheckTokenVerifier.prototype.safeDecode = function (jwtToken) {
        return jwt_1.decodeJwt(jwtToken)
            .catch(function () {
            var errorMessage = 'Decoding App Check token failed. Make sure you passed ' +
                'the entire string JWT which represents the Firebase App Check token.';
            throw new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', errorMessage);
        });
    };
    /**
     * Verifies the content of a Firebase App Check JWT.
     *
     * @param fullDecodedToken The decoded JWT.
     * @param projectId The Firebase Project Id.
     */
    AppCheckTokenVerifier.prototype.verifyContent = function (fullDecodedToken, projectId) {
        var header = fullDecodedToken.header;
        var payload = fullDecodedToken.payload;
        var projectIdMatchMessage = ' Make sure the App Check token comes from the same ' +
            'Firebase project as the service account used to authenticate this SDK.';
        var scopedProjectId = "projects/" + projectId;
        var errorMessage;
        if (header.alg !== jwt_1.ALGORITHM_RS256) {
            errorMessage = 'The provided App Check token has incorrect algorithm. Expected "' +
                jwt_1.ALGORITHM_RS256 + '" but got ' + '"' + header.alg + '".';
        }
        else if (!validator.isNonEmptyArray(payload.aud) || !payload.aud.includes(scopedProjectId)) {
            errorMessage = 'The provided App Check token has incorrect "aud" (audience) claim. Expected "' +
                scopedProjectId + '" but got "' + payload.aud + '".' + projectIdMatchMessage;
        }
        else if (typeof payload.iss !== 'string' || !payload.iss.startsWith(APP_CHECK_ISSUER)) {
            errorMessage = 'The provided App Check token has incorrect "iss" (issuer) claim.';
        }
        else if (typeof payload.sub !== 'string') {
            errorMessage = 'The provided App Check token has no "sub" (subject) claim.';
        }
        else if (payload.sub === '') {
            errorMessage = 'The provided App Check token has an empty string "sub" (subject) claim.';
        }
        if (errorMessage) {
            throw new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', errorMessage);
        }
    };
    AppCheckTokenVerifier.prototype.verifySignature = function (jwtToken) {
        var _this = this;
        return this.signatureVerifier.verify(jwtToken)
            .catch(function (error) {
            throw _this.mapJwtErrorToAppCheckError(error);
        });
    };
    /**
     * Maps JwtError to FirebaseAppCheckError
     *
     * @param error JwtError to be mapped.
     * @returns FirebaseAppCheckError instance.
     */
    AppCheckTokenVerifier.prototype.mapJwtErrorToAppCheckError = function (error) {
        if (error.code === jwt_1.JwtErrorCode.TOKEN_EXPIRED) {
            var errorMessage = 'The provided App Check token has expired. Get a fresh App Check token' +
                ' from your client app and try again.';
            return new app_check_api_client_internal_1.FirebaseAppCheckError('app-check-token-expired', errorMessage);
        }
        else if (error.code === jwt_1.JwtErrorCode.INVALID_SIGNATURE) {
            var errorMessage = 'The provided App Check token has invalid signature.';
            return new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', errorMessage);
        }
        else if (error.code === jwt_1.JwtErrorCode.NO_MATCHING_KID) {
            var errorMessage = 'The provided App Check token has "kid" claim which does not ' +
                'correspond to a known public key. Most likely the provided App Check token ' +
                'is expired, so get a fresh token from your client app and try again.';
            return new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', errorMessage);
        }
        return new app_check_api_client_internal_1.FirebaseAppCheckError('invalid-argument', error.message);
    };
    return AppCheckTokenVerifier;
}());
exports.AppCheckTokenVerifier = AppCheckTokenVerifier;

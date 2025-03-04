/*! firebase-admin v9.12.0 */
"use strict";
/*!
 * Copyright 2018 Google Inc.
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
exports.createSessionCookieVerifier = exports.createIdTokenVerifier = exports.FirebaseTokenVerifier = exports.SESSION_COOKIE_INFO = exports.ID_TOKEN_INFO = void 0;
var error_1 = require("../utils/error");
var util = require("../utils/index");
var validator = require("../utils/validator");
var jwt_1 = require("../utils/jwt");
// Audience to use for Firebase Auth Custom tokens
var FIREBASE_AUDIENCE = 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit';
// URL containing the public keys for the Google certs (whose private keys are used to sign Firebase
// Auth ID tokens)
var CLIENT_CERT_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
// URL containing the public keys for Firebase session cookies. This will be updated to a different URL soon.
var SESSION_COOKIE_CERT_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/publicKeys';
var EMULATOR_VERIFIER = new jwt_1.EmulatorSignatureVerifier();
/** User facing token information related to the Firebase ID token. */
exports.ID_TOKEN_INFO = {
    url: 'https://firebase.google.com/docs/auth/admin/verify-id-tokens',
    verifyApiName: 'verifyIdToken()',
    jwtName: 'Firebase ID token',
    shortName: 'ID token',
    expiredErrorCode: error_1.AuthClientErrorCode.ID_TOKEN_EXPIRED,
};
/** User facing token information related to the Firebase session cookie. */
exports.SESSION_COOKIE_INFO = {
    url: 'https://firebase.google.com/docs/auth/admin/manage-cookies',
    verifyApiName: 'verifySessionCookie()',
    jwtName: 'Firebase session cookie',
    shortName: 'session cookie',
    expiredErrorCode: error_1.AuthClientErrorCode.SESSION_COOKIE_EXPIRED,
};
/**
 * Class for verifying ID tokens and session cookies.
 */
var FirebaseTokenVerifier = /** @class */ (function () {
    function FirebaseTokenVerifier(clientCertUrl, issuer, tokenInfo, app) {
        this.issuer = issuer;
        this.tokenInfo = tokenInfo;
        this.app = app;
        if (!validator.isURL(clientCertUrl)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, 'The provided public client certificate URL is an invalid URL.');
        }
        else if (!validator.isURL(issuer)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, 'The provided JWT issuer is an invalid URL.');
        }
        else if (!validator.isNonNullObject(tokenInfo)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, 'The provided JWT information is not an object or null.');
        }
        else if (!validator.isURL(tokenInfo.url)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, 'The provided JWT verification documentation URL is invalid.');
        }
        else if (!validator.isNonEmptyString(tokenInfo.verifyApiName)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, 'The JWT verify API name must be a non-empty string.');
        }
        else if (!validator.isNonEmptyString(tokenInfo.jwtName)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, 'The JWT public full name must be a non-empty string.');
        }
        else if (!validator.isNonEmptyString(tokenInfo.shortName)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, 'The JWT public short name must be a non-empty string.');
        }
        else if (!validator.isNonNullObject(tokenInfo.expiredErrorCode) || !('code' in tokenInfo.expiredErrorCode)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, 'The JWT expiration error code must be a non-null ErrorInfo object.');
        }
        this.shortNameArticle = tokenInfo.shortName.charAt(0).match(/[aeiou]/i) ? 'an' : 'a';
        this.signatureVerifier =
            jwt_1.PublicKeySignatureVerifier.withCertificateUrl(clientCertUrl, app.options.httpAgent);
        // For backward compatibility, the project ID is validated in the verification call.
    }
    /**
     * Verifies the format and signature of a Firebase Auth JWT token.
     *
     * @param jwtToken The Firebase Auth JWT token to verify.
     * @param isEmulator Whether to accept Auth Emulator tokens.
     * @return A promise fulfilled with the decoded claims of the Firebase Auth ID token.
     */
    FirebaseTokenVerifier.prototype.verifyJWT = function (jwtToken, isEmulator) {
        var _this = this;
        if (isEmulator === void 0) { isEmulator = false; }
        if (!validator.isString(jwtToken)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, "First argument to " + this.tokenInfo.verifyApiName + " must be a " + this.tokenInfo.jwtName + " string.");
        }
        return this.ensureProjectId()
            .then(function (projectId) {
            return _this.decodeAndVerify(jwtToken, projectId, isEmulator);
        })
            .then(function (decoded) {
            var decodedIdToken = decoded.payload;
            decodedIdToken.uid = decodedIdToken.sub;
            return decodedIdToken;
        });
    };
    FirebaseTokenVerifier.prototype.ensureProjectId = function () {
        var _this = this;
        return util.findProjectId(this.app)
            .then(function (projectId) {
            if (!validator.isNonEmptyString(projectId)) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CREDENTIAL, 'Must initialize app with a cert credential or set your Firebase project ID as the ' +
                    ("GOOGLE_CLOUD_PROJECT environment variable to call " + _this.tokenInfo.verifyApiName + "."));
            }
            return Promise.resolve(projectId);
        });
    };
    FirebaseTokenVerifier.prototype.decodeAndVerify = function (token, projectId, isEmulator) {
        var _this = this;
        return this.safeDecode(token)
            .then(function (decodedToken) {
            _this.verifyContent(decodedToken, projectId, isEmulator);
            return _this.verifySignature(token, isEmulator)
                .then(function () { return decodedToken; });
        });
    };
    FirebaseTokenVerifier.prototype.safeDecode = function (jwtToken) {
        var _this = this;
        return jwt_1.decodeJwt(jwtToken)
            .catch(function (err) {
            if (err.code == jwt_1.JwtErrorCode.INVALID_ARGUMENT) {
                var verifyJwtTokenDocsMessage = " See " + _this.tokenInfo.url + " " +
                    ("for details on how to retrieve " + _this.shortNameArticle + " " + _this.tokenInfo.shortName + ".");
                var errorMessage = "Decoding " + _this.tokenInfo.jwtName + " failed. Make sure you passed " +
                    ("the entire string JWT which represents " + _this.shortNameArticle + " ") +
                    (_this.tokenInfo.shortName + ".") + verifyJwtTokenDocsMessage;
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, errorMessage);
            }
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INTERNAL_ERROR, err.message);
        });
    };
    /**
     * Verifies the content of a Firebase Auth JWT.
     *
     * @param fullDecodedToken The decoded JWT.
     * @param projectId The Firebase Project Id.
     * @param isEmulator Whether the token is an Emulator token.
     */
    FirebaseTokenVerifier.prototype.verifyContent = function (fullDecodedToken, projectId, isEmulator) {
        var header = fullDecodedToken && fullDecodedToken.header;
        var payload = fullDecodedToken && fullDecodedToken.payload;
        var projectIdMatchMessage = " Make sure the " + this.tokenInfo.shortName + " comes from the same " +
            'Firebase project as the service account used to authenticate this SDK.';
        var verifyJwtTokenDocsMessage = " See " + this.tokenInfo.url + " " +
            ("for details on how to retrieve " + this.shortNameArticle + " " + this.tokenInfo.shortName + ".");
        var errorMessage;
        if (!isEmulator && typeof header.kid === 'undefined') {
            var isCustomToken = (payload.aud === FIREBASE_AUDIENCE);
            var isLegacyCustomToken = (header.alg === 'HS256' && payload.v === 0 && 'd' in payload && 'uid' in payload.d);
            if (isCustomToken) {
                errorMessage = this.tokenInfo.verifyApiName + " expects " + this.shortNameArticle + " " +
                    (this.tokenInfo.shortName + ", but was given a custom token.");
            }
            else if (isLegacyCustomToken) {
                errorMessage = this.tokenInfo.verifyApiName + " expects " + this.shortNameArticle + " " +
                    (this.tokenInfo.shortName + ", but was given a legacy custom token.");
            }
            else {
                errorMessage = 'Firebase ID token has no "kid" claim.';
            }
            errorMessage += verifyJwtTokenDocsMessage;
        }
        else if (!isEmulator && header.alg !== jwt_1.ALGORITHM_RS256) {
            errorMessage = this.tokenInfo.jwtName + " has incorrect algorithm. Expected \"" + jwt_1.ALGORITHM_RS256 + '" but got ' +
                '"' + header.alg + '".' + verifyJwtTokenDocsMessage;
        }
        else if (payload.aud !== projectId) {
            errorMessage = this.tokenInfo.jwtName + " has incorrect \"aud\" (audience) claim. Expected \"" +
                projectId + '" but got "' + payload.aud + '".' + projectIdMatchMessage +
                verifyJwtTokenDocsMessage;
        }
        else if (payload.iss !== this.issuer + projectId) {
            errorMessage = this.tokenInfo.jwtName + " has incorrect \"iss\" (issuer) claim. Expected " +
                ("\"" + this.issuer) + projectId + '" but got "' +
                payload.iss + '".' + projectIdMatchMessage + verifyJwtTokenDocsMessage;
        }
        else if (typeof payload.sub !== 'string') {
            errorMessage = this.tokenInfo.jwtName + " has no \"sub\" (subject) claim." + verifyJwtTokenDocsMessage;
        }
        else if (payload.sub === '') {
            errorMessage = this.tokenInfo.jwtName + " has an empty string \"sub\" (subject) claim." + verifyJwtTokenDocsMessage;
        }
        else if (payload.sub.length > 128) {
            errorMessage = this.tokenInfo.jwtName + " has \"sub\" (subject) claim longer than 128 characters." +
                verifyJwtTokenDocsMessage;
        }
        if (errorMessage) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, errorMessage);
        }
    };
    FirebaseTokenVerifier.prototype.verifySignature = function (jwtToken, isEmulator) {
        var _this = this;
        var verifier = isEmulator ? EMULATOR_VERIFIER : this.signatureVerifier;
        return verifier.verify(jwtToken)
            .catch(function (error) {
            throw _this.mapJwtErrorToAuthError(error);
        });
    };
    /**
     * Maps JwtError to FirebaseAuthError
     *
     * @param error JwtError to be mapped.
     * @returns FirebaseAuthError or Error instance.
     */
    FirebaseTokenVerifier.prototype.mapJwtErrorToAuthError = function (error) {
        var verifyJwtTokenDocsMessage = " See " + this.tokenInfo.url + " " +
            ("for details on how to retrieve " + this.shortNameArticle + " " + this.tokenInfo.shortName + ".");
        if (error.code === jwt_1.JwtErrorCode.TOKEN_EXPIRED) {
            var errorMessage = this.tokenInfo.jwtName + " has expired. Get a fresh " + this.tokenInfo.shortName +
                (" from your client app and try again (auth/" + this.tokenInfo.expiredErrorCode.code + ").") +
                verifyJwtTokenDocsMessage;
            return new error_1.FirebaseAuthError(this.tokenInfo.expiredErrorCode, errorMessage);
        }
        else if (error.code === jwt_1.JwtErrorCode.INVALID_SIGNATURE) {
            var errorMessage = this.tokenInfo.jwtName + " has invalid signature." + verifyJwtTokenDocsMessage;
            return new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, errorMessage);
        }
        else if (error.code === jwt_1.JwtErrorCode.NO_MATCHING_KID) {
            var errorMessage = this.tokenInfo.jwtName + " has \"kid\" claim which does not " +
                ("correspond to a known public key. Most likely the " + this.tokenInfo.shortName + " ") +
                'is expired, so get a fresh token from your client app and try again.';
            return new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, errorMessage);
        }
        return new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, error.message);
    };
    return FirebaseTokenVerifier;
}());
exports.FirebaseTokenVerifier = FirebaseTokenVerifier;
/**
 * Creates a new FirebaseTokenVerifier to verify Firebase ID tokens.
 *
 * @param app Firebase app instance.
 * @return FirebaseTokenVerifier
 */
function createIdTokenVerifier(app) {
    return new FirebaseTokenVerifier(CLIENT_CERT_URL, 'https://securetoken.google.com/', exports.ID_TOKEN_INFO, app);
}
exports.createIdTokenVerifier = createIdTokenVerifier;
/**
 * Creates a new FirebaseTokenVerifier to verify Firebase session cookies.
 *
 * @param app Firebase app instance.
 * @return FirebaseTokenVerifier
 */
function createSessionCookieVerifier(app) {
    return new FirebaseTokenVerifier(SESSION_COOKIE_CERT_URL, 'https://session.firebase.google.com/', exports.SESSION_COOKIE_INFO, app);
}
exports.createSessionCookieVerifier = createSessionCookieVerifier;

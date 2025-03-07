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
exports.OIDCConfig = exports.SAMLConfig = exports.EmailSignInConfig = exports.validateTestPhoneNumbers = exports.MultiFactorAuthConfig = exports.MAXIMUM_TEST_PHONE_NUMBERS = void 0;
var validator = require("../utils/validator");
var deep_copy_1 = require("../utils/deep-copy");
var error_1 = require("../utils/error");
/** A maximum of 10 test phone number / code pairs can be configured. */
exports.MAXIMUM_TEST_PHONE_NUMBERS = 10;
/** Client Auth factor type to server auth factor type mapping. */
var AUTH_FACTOR_CLIENT_TO_SERVER_TYPE = {
    phone: 'PHONE_SMS',
};
/** Server Auth factor type to client auth factor type mapping. */
var AUTH_FACTOR_SERVER_TO_CLIENT_TYPE = Object.keys(AUTH_FACTOR_CLIENT_TO_SERVER_TYPE)
    .reduce(function (res, key) {
    res[AUTH_FACTOR_CLIENT_TO_SERVER_TYPE[key]] = key;
    return res;
}, {});
/**
 * Defines the multi-factor config class used to convert client side MultiFactorConfig
 * to a format that is understood by the Auth server.
 */
var MultiFactorAuthConfig = /** @class */ (function () {
    /**
     * The MultiFactorAuthConfig constructor.
     *
     * @param response The server side response used to initialize the
     *     MultiFactorAuthConfig object.
     * @constructor
     */
    function MultiFactorAuthConfig(response) {
        var _this = this;
        if (typeof response.state === 'undefined') {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INTERNAL_ERROR, 'INTERNAL ASSERT FAILED: Invalid multi-factor configuration response');
        }
        this.state = response.state;
        this.factorIds = [];
        (response.enabledProviders || []).forEach(function (enabledProvider) {
            // Ignore unsupported types. It is possible the current admin SDK version is
            // not up to date and newer backend types are supported.
            if (typeof AUTH_FACTOR_SERVER_TO_CLIENT_TYPE[enabledProvider] !== 'undefined') {
                _this.factorIds.push(AUTH_FACTOR_SERVER_TO_CLIENT_TYPE[enabledProvider]);
            }
        });
    }
    /**
     * Static method to convert a client side request to a MultiFactorAuthServerConfig.
     * Throws an error if validation fails.
     *
     * @param options The options object to convert to a server request.
     * @return The resulting server request.
     */
    MultiFactorAuthConfig.buildServerRequest = function (options) {
        var request = {};
        MultiFactorAuthConfig.validate(options);
        if (Object.prototype.hasOwnProperty.call(options, 'state')) {
            request.state = options.state;
        }
        if (Object.prototype.hasOwnProperty.call(options, 'factorIds')) {
            (options.factorIds || []).forEach(function (factorId) {
                if (typeof request.enabledProviders === 'undefined') {
                    request.enabledProviders = [];
                }
                request.enabledProviders.push(AUTH_FACTOR_CLIENT_TO_SERVER_TYPE[factorId]);
            });
            // In case an empty array is passed. Ensure it gets populated so the array is cleared.
            if (options.factorIds && options.factorIds.length === 0) {
                request.enabledProviders = [];
            }
        }
        return request;
    };
    /**
     * Validates the MultiFactorConfig options object. Throws an error on failure.
     *
     * @param options The options object to validate.
     */
    MultiFactorAuthConfig.validate = function (options) {
        var validKeys = {
            state: true,
            factorIds: true,
        };
        if (!validator.isNonNullObject(options)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"MultiFactorConfig" must be a non-null object.');
        }
        // Check for unsupported top level attributes.
        for (var key in options) {
            if (!(key in validKeys)) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, "\"" + key + "\" is not a valid MultiFactorConfig parameter.");
            }
        }
        // Validate content.
        if (typeof options.state !== 'undefined' &&
            options.state !== 'ENABLED' &&
            options.state !== 'DISABLED') {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"MultiFactorConfig.state" must be either "ENABLED" or "DISABLED".');
        }
        if (typeof options.factorIds !== 'undefined') {
            if (!validator.isArray(options.factorIds)) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"MultiFactorConfig.factorIds" must be an array of valid "AuthFactorTypes".');
            }
            // Validate content of array.
            options.factorIds.forEach(function (factorId) {
                if (typeof AUTH_FACTOR_CLIENT_TO_SERVER_TYPE[factorId] === 'undefined') {
                    throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, "\"" + factorId + "\" is not a valid \"AuthFactorType\".");
                }
            });
        }
    };
    /** @return The plain object representation of the multi-factor config instance. */
    MultiFactorAuthConfig.prototype.toJSON = function () {
        return {
            state: this.state,
            factorIds: this.factorIds,
        };
    };
    return MultiFactorAuthConfig;
}());
exports.MultiFactorAuthConfig = MultiFactorAuthConfig;
/**
 * Validates the provided map of test phone number / code pairs.
 * @param testPhoneNumbers The phone number / code pairs to validate.
 */
function validateTestPhoneNumbers(testPhoneNumbers) {
    if (!validator.isObject(testPhoneNumbers)) {
        throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, '"testPhoneNumbers" must be a map of phone number / code pairs.');
    }
    if (Object.keys(testPhoneNumbers).length > exports.MAXIMUM_TEST_PHONE_NUMBERS) {
        throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.MAXIMUM_TEST_PHONE_NUMBER_EXCEEDED);
    }
    for (var phoneNumber in testPhoneNumbers) {
        // Validate phone number.
        if (!validator.isPhoneNumber(phoneNumber)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_TESTING_PHONE_NUMBER, "\"" + phoneNumber + "\" is not a valid E.164 standard compliant phone number.");
        }
        // Validate code.
        if (!validator.isString(testPhoneNumbers[phoneNumber]) ||
            !/^[\d]{6}$/.test(testPhoneNumbers[phoneNumber])) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_TESTING_PHONE_NUMBER, "\"" + testPhoneNumbers[phoneNumber] + "\" is not a valid 6 digit code string.");
        }
    }
}
exports.validateTestPhoneNumbers = validateTestPhoneNumbers;
/**
 * Defines the email sign-in config class used to convert client side EmailSignInConfig
 * to a format that is understood by the Auth server.
 */
var EmailSignInConfig = /** @class */ (function () {
    /**
     * The EmailSignInConfig constructor.
     *
     * @param {any} response The server side response used to initialize the
     *     EmailSignInConfig object.
     * @constructor
     */
    function EmailSignInConfig(response) {
        if (typeof response.allowPasswordSignup === 'undefined') {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INTERNAL_ERROR, 'INTERNAL ASSERT FAILED: Invalid email sign-in configuration response');
        }
        this.enabled = response.allowPasswordSignup;
        this.passwordRequired = !response.enableEmailLinkSignin;
    }
    /**
     * Static method to convert a client side request to a EmailSignInConfigServerRequest.
     * Throws an error if validation fails.
     *
     * @param {any} options The options object to convert to a server request.
     * @return {EmailSignInConfigServerRequest} The resulting server request.
     */
    EmailSignInConfig.buildServerRequest = function (options) {
        var request = {};
        EmailSignInConfig.validate(options);
        if (Object.prototype.hasOwnProperty.call(options, 'enabled')) {
            request.allowPasswordSignup = options.enabled;
        }
        if (Object.prototype.hasOwnProperty.call(options, 'passwordRequired')) {
            request.enableEmailLinkSignin = !options.passwordRequired;
        }
        return request;
    };
    /**
     * Validates the EmailSignInConfig options object. Throws an error on failure.
     *
     * @param {any} options The options object to validate.
     */
    EmailSignInConfig.validate = function (options) {
        // TODO: Validate the request.
        var validKeys = {
            enabled: true,
            passwordRequired: true,
        };
        if (!validator.isNonNullObject(options)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, '"EmailSignInConfig" must be a non-null object.');
        }
        // Check for unsupported top level attributes.
        for (var key in options) {
            if (!(key in validKeys)) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, "\"" + key + "\" is not a valid EmailSignInConfig parameter.");
            }
        }
        // Validate content.
        if (typeof options.enabled !== 'undefined' &&
            !validator.isBoolean(options.enabled)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, '"EmailSignInConfig.enabled" must be a boolean.');
        }
        if (typeof options.passwordRequired !== 'undefined' &&
            !validator.isBoolean(options.passwordRequired)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, '"EmailSignInConfig.passwordRequired" must be a boolean.');
        }
    };
    /** @return {object} The plain object representation of the email sign-in config. */
    EmailSignInConfig.prototype.toJSON = function () {
        return {
            enabled: this.enabled,
            passwordRequired: this.passwordRequired,
        };
    };
    return EmailSignInConfig;
}());
exports.EmailSignInConfig = EmailSignInConfig;
/**
 * Defines the SAMLConfig class used to convert a client side configuration to its
 * server side representation.
 */
var SAMLConfig = /** @class */ (function () {
    /**
     * The SAMLConfig constructor.
     *
     * @param {any} response The server side response used to initialize the SAMLConfig object.
     * @constructor
     */
    function SAMLConfig(response) {
        if (!response ||
            !response.idpConfig ||
            !response.idpConfig.idpEntityId ||
            !response.idpConfig.ssoUrl ||
            !response.spConfig ||
            !response.spConfig.spEntityId ||
            !response.name ||
            !(validator.isString(response.name) &&
                SAMLConfig.getProviderIdFromResourceName(response.name))) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INTERNAL_ERROR, 'INTERNAL ASSERT FAILED: Invalid SAML configuration response');
        }
        var providerId = SAMLConfig.getProviderIdFromResourceName(response.name);
        if (!providerId) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INTERNAL_ERROR, 'INTERNAL ASSERT FAILED: Invalid SAML configuration response');
        }
        this.providerId = providerId;
        // RP config.
        this.rpEntityId = response.spConfig.spEntityId;
        this.callbackURL = response.spConfig.callbackUri;
        // IdP config.
        this.idpEntityId = response.idpConfig.idpEntityId;
        this.ssoURL = response.idpConfig.ssoUrl;
        this.enableRequestSigning = !!response.idpConfig.signRequest;
        var x509Certificates = [];
        for (var _i = 0, _a = (response.idpConfig.idpCertificates || []); _i < _a.length; _i++) {
            var cert = _a[_i];
            if (cert.x509Certificate) {
                x509Certificates.push(cert.x509Certificate);
            }
        }
        this.x509Certificates = x509Certificates;
        // When enabled is undefined, it takes its default value of false.
        this.enabled = !!response.enabled;
        this.displayName = response.displayName;
    }
    /**
     * Converts a client side request to a SAMLConfigServerRequest which is the format
     * accepted by the backend server.
     * Throws an error if validation fails. If the request is not a SAMLConfig request,
     * returns null.
     *
     * @param {SAMLAuthProviderRequest} options The options object to convert to a server request.
     * @param {boolean=} ignoreMissingFields Whether to ignore missing fields.
     * @return {?SAMLConfigServerRequest} The resulting server request or null if not valid.
     */
    SAMLConfig.buildServerRequest = function (options, ignoreMissingFields) {
        if (ignoreMissingFields === void 0) { ignoreMissingFields = false; }
        var makeRequest = validator.isNonNullObject(options) &&
            (options.providerId || ignoreMissingFields);
        if (!makeRequest) {
            return null;
        }
        var request = {};
        // Validate options.
        SAMLConfig.validate(options, ignoreMissingFields);
        request.enabled = options.enabled;
        request.displayName = options.displayName;
        // IdP config.
        if (options.idpEntityId || options.ssoURL || options.x509Certificates) {
            request.idpConfig = {
                idpEntityId: options.idpEntityId,
                ssoUrl: options.ssoURL,
                signRequest: options.enableRequestSigning,
                idpCertificates: typeof options.x509Certificates === 'undefined' ? undefined : [],
            };
            if (options.x509Certificates) {
                for (var _i = 0, _a = (options.x509Certificates || []); _i < _a.length; _i++) {
                    var cert = _a[_i];
                    request.idpConfig.idpCertificates.push({ x509Certificate: cert });
                }
            }
        }
        // RP config.
        if (options.callbackURL || options.rpEntityId) {
            request.spConfig = {
                spEntityId: options.rpEntityId,
                callbackUri: options.callbackURL,
            };
        }
        return request;
    };
    /**
     * Returns the provider ID corresponding to the resource name if available.
     *
     * @param {string} resourceName The server side resource name.
     * @return {?string} The provider ID corresponding to the resource, null otherwise.
     */
    SAMLConfig.getProviderIdFromResourceName = function (resourceName) {
        // name is of form projects/project1/inboundSamlConfigs/providerId1
        var matchProviderRes = resourceName.match(/\/inboundSamlConfigs\/(saml\..*)$/);
        if (!matchProviderRes || matchProviderRes.length < 2) {
            return null;
        }
        return matchProviderRes[1];
    };
    /**
     * @param {any} providerId The provider ID to check.
     * @return {boolean} Whether the provider ID corresponds to a SAML provider.
     */
    SAMLConfig.isProviderId = function (providerId) {
        return validator.isNonEmptyString(providerId) && providerId.indexOf('saml.') === 0;
    };
    /**
     * Validates the SAMLConfig options object. Throws an error on failure.
     *
     * @param {SAMLAuthProviderRequest} options The options object to validate.
     * @param {boolean=} ignoreMissingFields Whether to ignore missing fields.
     */
    SAMLConfig.validate = function (options, ignoreMissingFields) {
        if (ignoreMissingFields === void 0) { ignoreMissingFields = false; }
        var validKeys = {
            enabled: true,
            displayName: true,
            providerId: true,
            idpEntityId: true,
            ssoURL: true,
            x509Certificates: true,
            rpEntityId: true,
            callbackURL: true,
            enableRequestSigning: true,
        };
        if (!validator.isNonNullObject(options)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig" must be a valid non-null object.');
        }
        // Check for unsupported top level attributes.
        for (var key in options) {
            if (!(key in validKeys)) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, "\"" + key + "\" is not a valid SAML config parameter.");
            }
        }
        // Required fields.
        if (validator.isNonEmptyString(options.providerId)) {
            if (options.providerId.indexOf('saml.') !== 0) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_PROVIDER_ID, '"SAMLAuthProviderConfig.providerId" must be a valid non-empty string prefixed with "saml.".');
            }
        }
        else if (!ignoreMissingFields) {
            // providerId is required and not provided correctly.
            throw new error_1.FirebaseAuthError(!options.providerId ? error_1.AuthClientErrorCode.MISSING_PROVIDER_ID : error_1.AuthClientErrorCode.INVALID_PROVIDER_ID, '"SAMLAuthProviderConfig.providerId" must be a valid non-empty string prefixed with "saml.".');
        }
        if (!(ignoreMissingFields && typeof options.idpEntityId === 'undefined') &&
            !validator.isNonEmptyString(options.idpEntityId)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.idpEntityId" must be a valid non-empty string.');
        }
        if (!(ignoreMissingFields && typeof options.ssoURL === 'undefined') &&
            !validator.isURL(options.ssoURL)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.ssoURL" must be a valid URL string.');
        }
        if (!(ignoreMissingFields && typeof options.rpEntityId === 'undefined') &&
            !validator.isNonEmptyString(options.rpEntityId)) {
            throw new error_1.FirebaseAuthError(!options.rpEntityId ? error_1.AuthClientErrorCode.MISSING_SAML_RELYING_PARTY_CONFIG :
                error_1.AuthClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.rpEntityId" must be a valid non-empty string.');
        }
        if (!(ignoreMissingFields && typeof options.callbackURL === 'undefined') &&
            !validator.isURL(options.callbackURL)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.callbackURL" must be a valid URL string.');
        }
        if (!(ignoreMissingFields && typeof options.x509Certificates === 'undefined') &&
            !validator.isArray(options.x509Certificates)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.x509Certificates" must be a valid array of X509 certificate strings.');
        }
        (options.x509Certificates || []).forEach(function (cert) {
            if (!validator.isNonEmptyString(cert)) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.x509Certificates" must be a valid array of X509 certificate strings.');
            }
        });
        if (typeof options.enableRequestSigning !== 'undefined' &&
            !validator.isBoolean(options.enableRequestSigning)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.enableRequestSigning" must be a boolean.');
        }
        if (typeof options.enabled !== 'undefined' &&
            !validator.isBoolean(options.enabled)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.enabled" must be a boolean.');
        }
        if (typeof options.displayName !== 'undefined' &&
            !validator.isString(options.displayName)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.displayName" must be a valid string.');
        }
    };
    /** @return The plain object representation of the SAMLConfig. */
    SAMLConfig.prototype.toJSON = function () {
        return {
            enabled: this.enabled,
            displayName: this.displayName,
            providerId: this.providerId,
            idpEntityId: this.idpEntityId,
            ssoURL: this.ssoURL,
            x509Certificates: deep_copy_1.deepCopy(this.x509Certificates),
            rpEntityId: this.rpEntityId,
            callbackURL: this.callbackURL,
            enableRequestSigning: this.enableRequestSigning,
        };
    };
    return SAMLConfig;
}());
exports.SAMLConfig = SAMLConfig;
/**
 * Defines the OIDCConfig class used to convert a client side configuration to its
 * server side representation.
 */
var OIDCConfig = /** @class */ (function () {
    /**
     * The OIDCConfig constructor.
     *
     * @param {any} response The server side response used to initialize the OIDCConfig object.
     * @constructor
     */
    function OIDCConfig(response) {
        if (!response ||
            !response.issuer ||
            !response.clientId ||
            !response.name ||
            !(validator.isString(response.name) &&
                OIDCConfig.getProviderIdFromResourceName(response.name))) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INTERNAL_ERROR, 'INTERNAL ASSERT FAILED: Invalid OIDC configuration response');
        }
        var providerId = OIDCConfig.getProviderIdFromResourceName(response.name);
        if (!providerId) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INTERNAL_ERROR, 'INTERNAL ASSERT FAILED: Invalid SAML configuration response');
        }
        this.providerId = providerId;
        this.clientId = response.clientId;
        this.issuer = response.issuer;
        // When enabled is undefined, it takes its default value of false.
        this.enabled = !!response.enabled;
        this.displayName = response.displayName;
        if (typeof response.clientSecret !== 'undefined') {
            this.clientSecret = response.clientSecret;
        }
        if (typeof response.responseType !== 'undefined') {
            this.responseType = response.responseType;
        }
    }
    /**
     * Converts a client side request to a OIDCConfigServerRequest which is the format
     * accepted by the backend server.
     * Throws an error if validation fails. If the request is not a OIDCConfig request,
     * returns null.
     *
     * @param options The options object to convert to a server request.
     * @param ignoreMissingFields Whether to ignore missing fields.
     * @return The resulting server request or null if not valid.
     */
    OIDCConfig.buildServerRequest = function (options, ignoreMissingFields) {
        if (ignoreMissingFields === void 0) { ignoreMissingFields = false; }
        var makeRequest = validator.isNonNullObject(options) &&
            (options.providerId || ignoreMissingFields);
        if (!makeRequest) {
            return null;
        }
        var request = {};
        // Validate options.
        OIDCConfig.validate(options, ignoreMissingFields);
        request.enabled = options.enabled;
        request.displayName = options.displayName;
        request.issuer = options.issuer;
        request.clientId = options.clientId;
        if (typeof options.clientSecret !== 'undefined') {
            request.clientSecret = options.clientSecret;
        }
        if (typeof options.responseType !== 'undefined') {
            request.responseType = options.responseType;
        }
        return request;
    };
    /**
     * Returns the provider ID corresponding to the resource name if available.
     *
     * @param {string} resourceName The server side resource name
     * @return {?string} The provider ID corresponding to the resource, null otherwise.
     */
    OIDCConfig.getProviderIdFromResourceName = function (resourceName) {
        // name is of form projects/project1/oauthIdpConfigs/providerId1
        var matchProviderRes = resourceName.match(/\/oauthIdpConfigs\/(oidc\..*)$/);
        if (!matchProviderRes || matchProviderRes.length < 2) {
            return null;
        }
        return matchProviderRes[1];
    };
    /**
     * @param {any} providerId The provider ID to check.
     * @return {boolean} Whether the provider ID corresponds to an OIDC provider.
     */
    OIDCConfig.isProviderId = function (providerId) {
        return validator.isNonEmptyString(providerId) && providerId.indexOf('oidc.') === 0;
    };
    /**
     * Validates the OIDCConfig options object. Throws an error on failure.
     *
     * @param options The options object to validate.
     * @param ignoreMissingFields Whether to ignore missing fields.
     */
    OIDCConfig.validate = function (options, ignoreMissingFields) {
        if (ignoreMissingFields === void 0) { ignoreMissingFields = false; }
        var validKeys = {
            enabled: true,
            displayName: true,
            providerId: true,
            clientId: true,
            issuer: true,
            clientSecret: true,
            responseType: true,
        };
        var validResponseTypes = {
            idToken: true,
            code: true,
        };
        if (!validator.isNonNullObject(options)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"OIDCAuthProviderConfig" must be a valid non-null object.');
        }
        // Check for unsupported top level attributes.
        for (var key in options) {
            if (!(key in validKeys)) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, "\"" + key + "\" is not a valid OIDC config parameter.");
            }
        }
        // Required fields.
        if (validator.isNonEmptyString(options.providerId)) {
            if (options.providerId.indexOf('oidc.') !== 0) {
                throw new error_1.FirebaseAuthError(!options.providerId ? error_1.AuthClientErrorCode.MISSING_PROVIDER_ID : error_1.AuthClientErrorCode.INVALID_PROVIDER_ID, '"OIDCAuthProviderConfig.providerId" must be a valid non-empty string prefixed with "oidc.".');
            }
        }
        else if (!ignoreMissingFields) {
            throw new error_1.FirebaseAuthError(!options.providerId ? error_1.AuthClientErrorCode.MISSING_PROVIDER_ID : error_1.AuthClientErrorCode.INVALID_PROVIDER_ID, '"OIDCAuthProviderConfig.providerId" must be a valid non-empty string prefixed with "oidc.".');
        }
        if (!(ignoreMissingFields && typeof options.clientId === 'undefined') &&
            !validator.isNonEmptyString(options.clientId)) {
            throw new error_1.FirebaseAuthError(!options.clientId ? error_1.AuthClientErrorCode.MISSING_OAUTH_CLIENT_ID : error_1.AuthClientErrorCode.INVALID_OAUTH_CLIENT_ID, '"OIDCAuthProviderConfig.clientId" must be a valid non-empty string.');
        }
        if (!(ignoreMissingFields && typeof options.issuer === 'undefined') &&
            !validator.isURL(options.issuer)) {
            throw new error_1.FirebaseAuthError(!options.issuer ? error_1.AuthClientErrorCode.MISSING_ISSUER : error_1.AuthClientErrorCode.INVALID_CONFIG, '"OIDCAuthProviderConfig.issuer" must be a valid URL string.');
        }
        if (typeof options.enabled !== 'undefined' &&
            !validator.isBoolean(options.enabled)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"OIDCAuthProviderConfig.enabled" must be a boolean.');
        }
        if (typeof options.displayName !== 'undefined' &&
            !validator.isString(options.displayName)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"OIDCAuthProviderConfig.displayName" must be a valid string.');
        }
        if (typeof options.clientSecret !== 'undefined' &&
            !validator.isNonEmptyString(options.clientSecret)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, '"OIDCAuthProviderConfig.clientSecret" must be a valid string.');
        }
        if (validator.isNonNullObject(options.responseType) && typeof options.responseType !== 'undefined') {
            Object.keys(options.responseType).forEach(function (key) {
                if (!(key in validResponseTypes)) {
                    throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_CONFIG, "\"" + key + "\" is not a valid OAuthResponseType parameter.");
                }
            });
            var idToken = options.responseType.idToken;
            if (typeof idToken !== 'undefined' && !validator.isBoolean(idToken)) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, '"OIDCAuthProviderConfig.responseType.idToken" must be a boolean.');
            }
            var code = options.responseType.code;
            if (typeof code !== 'undefined') {
                if (!validator.isBoolean(code)) {
                    throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, '"OIDCAuthProviderConfig.responseType.code" must be a boolean.');
                }
                // If code flow is enabled, client secret must be provided.
                if (code && typeof options.clientSecret === 'undefined') {
                    throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.MISSING_OAUTH_CLIENT_SECRET, 'The OAuth configuration client secret is required to enable OIDC code flow.');
                }
            }
            var allKeys = Object.keys(options.responseType).length;
            var enabledCount = Object.values(options.responseType).filter(Boolean).length;
            // Only one of OAuth response types can be set to true.
            if (allKeys > 1 && enabledCount != 1) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_OAUTH_RESPONSETYPE, 'Only exactly one OAuth responseType should be set to true.');
            }
        }
    };
    /** @return {OIDCAuthProviderConfig} The plain object representation of the OIDCConfig. */
    OIDCConfig.prototype.toJSON = function () {
        return {
            enabled: this.enabled,
            displayName: this.displayName,
            providerId: this.providerId,
            issuer: this.issuer,
            clientId: this.clientId,
            clientSecret: deep_copy_1.deepCopy(this.clientSecret),
            responseType: deep_copy_1.deepCopy(this.responseType),
        };
    };
    return OIDCConfig;
}());
exports.OIDCConfig = OIDCConfig;

/*! firebase-admin v9.12.0 */
"use strict";
/*!
 * Copyright 2019 Google Inc.
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
exports.Tenant = void 0;
var validator = require("../utils/validator");
var deep_copy_1 = require("../utils/deep-copy");
var error_1 = require("../utils/error");
var auth_config_1 = require("./auth-config");
/**
 * Tenant class that defines a Firebase Auth tenant.
 */
var Tenant = /** @class */ (function () {
    /**
     * The Tenant object constructor.
     *
     * @param response The server side response used to initialize the Tenant object.
     * @constructor
     */
    function Tenant(response) {
        var tenantId = Tenant.getTenantIdFromResourceName(response.name);
        if (!tenantId) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INTERNAL_ERROR, 'INTERNAL ASSERT FAILED: Invalid tenant response');
        }
        this.tenantId = tenantId;
        this.displayName = response.displayName;
        try {
            this.emailSignInConfig = new auth_config_1.EmailSignInConfig(response);
        }
        catch (e) {
            // If allowPasswordSignup is undefined, it is disabled by default.
            this.emailSignInConfig = new auth_config_1.EmailSignInConfig({
                allowPasswordSignup: false,
            });
        }
        this.anonymousSignInEnabled = !!response.enableAnonymousUser;
        if (typeof response.mfaConfig !== 'undefined') {
            this.multiFactorConfig = new auth_config_1.MultiFactorAuthConfig(response.mfaConfig);
        }
        if (typeof response.testPhoneNumbers !== 'undefined') {
            this.testPhoneNumbers = deep_copy_1.deepCopy(response.testPhoneNumbers || {});
        }
    }
    /**
     * Builds the corresponding server request for a TenantOptions object.
     *
     * @param {TenantOptions} tenantOptions The properties to convert to a server request.
     * @param {boolean} createRequest Whether this is a create request.
     * @return {object} The equivalent server request.
     */
    Tenant.buildServerRequest = function (tenantOptions, createRequest) {
        var _a;
        Tenant.validate(tenantOptions, createRequest);
        var request = {};
        if (typeof tenantOptions.emailSignInConfig !== 'undefined') {
            request = auth_config_1.EmailSignInConfig.buildServerRequest(tenantOptions.emailSignInConfig);
        }
        if (typeof tenantOptions.displayName !== 'undefined') {
            request.displayName = tenantOptions.displayName;
        }
        if (typeof tenantOptions.anonymousSignInEnabled !== 'undefined') {
            request.enableAnonymousUser = tenantOptions.anonymousSignInEnabled;
        }
        if (typeof tenantOptions.multiFactorConfig !== 'undefined') {
            request.mfaConfig = auth_config_1.MultiFactorAuthConfig.buildServerRequest(tenantOptions.multiFactorConfig);
        }
        if (typeof tenantOptions.testPhoneNumbers !== 'undefined') {
            // null will clear existing test phone numbers. Translate to empty object.
            request.testPhoneNumbers = (_a = tenantOptions.testPhoneNumbers) !== null && _a !== void 0 ? _a : {};
        }
        return request;
    };
    /**
     * Returns the tenant ID corresponding to the resource name if available.
     *
     * @param {string} resourceName The server side resource name
     * @return {?string} The tenant ID corresponding to the resource, null otherwise.
     */
    Tenant.getTenantIdFromResourceName = function (resourceName) {
        // name is of form projects/project1/tenants/tenant1
        var matchTenantRes = resourceName.match(/\/tenants\/(.*)$/);
        if (!matchTenantRes || matchTenantRes.length < 2) {
            return null;
        }
        return matchTenantRes[1];
    };
    /**
     * Validates a tenant options object. Throws an error on failure.
     *
     * @param {any} request The tenant options object to validate.
     * @param {boolean} createRequest Whether this is a create request.
     */
    Tenant.validate = function (request, createRequest) {
        var validKeys = {
            displayName: true,
            emailSignInConfig: true,
            anonymousSignInEnabled: true,
            multiFactorConfig: true,
            testPhoneNumbers: true,
        };
        var label = createRequest ? 'CreateTenantRequest' : 'UpdateTenantRequest';
        if (!validator.isNonNullObject(request)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, "\"" + label + "\" must be a valid non-null object.");
        }
        // Check for unsupported top level attributes.
        for (var key in request) {
            if (!(key in validKeys)) {
                throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, "\"" + key + "\" is not a valid " + label + " parameter.");
            }
        }
        // Validate displayName type if provided.
        if (typeof request.displayName !== 'undefined' &&
            !validator.isNonEmptyString(request.displayName)) {
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, "\"" + label + ".displayName\" must be a valid non-empty string.");
        }
        // Validate emailSignInConfig type if provided.
        if (typeof request.emailSignInConfig !== 'undefined') {
            // This will throw an error if invalid.
            auth_config_1.EmailSignInConfig.buildServerRequest(request.emailSignInConfig);
        }
        // Validate test phone numbers if provided.
        if (typeof request.testPhoneNumbers !== 'undefined' &&
            request.testPhoneNumbers !== null) {
            auth_config_1.validateTestPhoneNumbers(request.testPhoneNumbers);
        }
        else if (request.testPhoneNumbers === null && createRequest) {
            // null allowed only for update operations.
            throw new error_1.FirebaseAuthError(error_1.AuthClientErrorCode.INVALID_ARGUMENT, "\"" + label + ".testPhoneNumbers\" must be a non-null object.");
        }
        // Validate multiFactorConfig type if provided.
        if (typeof request.multiFactorConfig !== 'undefined') {
            // This will throw an error if invalid.
            auth_config_1.MultiFactorAuthConfig.buildServerRequest(request.multiFactorConfig);
        }
    };
    /** @return {object} The plain object representation of the tenant. */
    Tenant.prototype.toJSON = function () {
        var _a, _b;
        var json = {
            tenantId: this.tenantId,
            displayName: this.displayName,
            emailSignInConfig: (_a = this.emailSignInConfig) === null || _a === void 0 ? void 0 : _a.toJSON(),
            anonymousSignInEnabled: this.anonymousSignInEnabled,
            multiFactorConfig: (_b = this.multiFactorConfig) === null || _b === void 0 ? void 0 : _b.toJSON(),
            testPhoneNumbers: this.testPhoneNumbers,
        };
        if (typeof json.multiFactorConfig === 'undefined') {
            delete json.multiFactorConfig;
        }
        if (typeof json.testPhoneNumbers === 'undefined') {
            delete json.testPhoneNumbers;
        }
        return json;
    };
    return Tenant;
}());
exports.Tenant = Tenant;

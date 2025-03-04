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
exports.ProjectManagementRequestHandler = exports.assertServerResponse = void 0;
var api_request_1 = require("../utils/api-request");
var error_1 = require("../utils/error");
var validator = require("../utils/validator");
var index_1 = require("../utils/index");
/** Project management backend host and port. */
var PROJECT_MANAGEMENT_HOST_AND_PORT = 'firebase.googleapis.com:443';
/** Project management backend path. */
var PROJECT_MANAGEMENT_PATH = '/v1/';
/** Project management beta backend path. */
var PROJECT_MANAGEMENT_BETA_PATH = '/v1beta1/';
/** Project management request header. */
var PROJECT_MANAGEMENT_HEADERS = {
    'X-Client-Version': "Node/Admin/" + index_1.getSdkVersion(),
};
/** Project management request timeout duration in milliseconds. */
var PROJECT_MANAGEMENT_TIMEOUT_MILLIS = 10000;
var LIST_APPS_MAX_PAGE_SIZE = 100;
var CERT_TYPE_API_MAP = {
    sha1: 'SHA_1',
    sha256: 'SHA_256',
};
function assertServerResponse(condition, responseData, message) {
    if (!condition) {
        throw new error_1.FirebaseProjectManagementError('invalid-server-response', message + " Response data: " + JSON.stringify(responseData, null, 2));
    }
}
exports.assertServerResponse = assertServerResponse;
/**
 * Class that provides mechanism to send requests to the Firebase project management backend
 * endpoints.
 *
 * @private
 */
var ProjectManagementRequestHandler = /** @class */ (function () {
    /**
     * @param {FirebaseApp} app The app used to fetch access tokens to sign API requests.
     * @constructor
     */
    function ProjectManagementRequestHandler(app) {
        this.baseUrl = "https://" + PROJECT_MANAGEMENT_HOST_AND_PORT + PROJECT_MANAGEMENT_PATH;
        this.baseBetaUrl = "https://" + PROJECT_MANAGEMENT_HOST_AND_PORT + PROJECT_MANAGEMENT_BETA_PATH;
        this.httpClient = new api_request_1.AuthorizedHttpClient(app);
    }
    ProjectManagementRequestHandler.wrapAndRethrowHttpError = function (errStatusCode, errText) {
        var errorCode;
        var errorMessage;
        switch (errStatusCode) {
            case 400:
                errorCode = 'invalid-argument';
                errorMessage = 'Invalid argument provided.';
                break;
            case 401:
            case 403:
                errorCode = 'authentication-error';
                errorMessage = 'An error occurred when trying to authenticate. Make sure the credential '
                    + 'used to authenticate this SDK has the proper permissions. See '
                    + 'https://firebase.google.com/docs/admin/setup for setup instructions.';
                break;
            case 404:
                errorCode = 'not-found';
                errorMessage = 'The specified entity could not be found.';
                break;
            case 409:
                errorCode = 'already-exists';
                errorMessage = 'The specified entity already exists.';
                break;
            case 500:
                errorCode = 'internal-error';
                errorMessage = 'An internal error has occurred. Please retry the request.';
                break;
            case 503:
                errorCode = 'service-unavailable';
                errorMessage = 'The server could not process the request in time. See the error '
                    + 'documentation for more details.';
                break;
            default:
                errorCode = 'unknown-error';
                errorMessage = 'An unknown server error was returned.';
        }
        if (!errText) {
            errText = '<missing>';
        }
        throw new error_1.FirebaseProjectManagementError(errorCode, errorMessage + " Status code: " + errStatusCode + ". Raw server response: \"" + errText + "\".");
    };
    /**
     * @param {string} parentResourceName Fully-qualified resource name of the project whose Android
     *     apps you want to list.
     */
    ProjectManagementRequestHandler.prototype.listAndroidApps = function (parentResourceName) {
        return this.invokeRequestHandler('GET', parentResourceName + "/androidApps?page_size=" + LIST_APPS_MAX_PAGE_SIZE, 
        /* requestData */ null, 'v1beta1');
    };
    /**
     * @param {string} parentResourceName Fully-qualified resource name of the project whose iOS apps
     *     you want to list.
     */
    ProjectManagementRequestHandler.prototype.listIosApps = function (parentResourceName) {
        return this.invokeRequestHandler('GET', parentResourceName + "/iosApps?page_size=" + LIST_APPS_MAX_PAGE_SIZE, 
        /* requestData */ null, 'v1beta1');
    };
    /**
     * @param {string} parentResourceName Fully-qualified resource name of the project whose iOS apps
     *     you want to list.
     */
    ProjectManagementRequestHandler.prototype.listAppMetadata = function (parentResourceName) {
        return this.invokeRequestHandler('GET', parentResourceName + ":searchApps?page_size=" + LIST_APPS_MAX_PAGE_SIZE, 
        /* requestData */ null, 'v1beta1');
    };
    /**
     * @param {string} parentResourceName Fully-qualified resource name of the project that you want
     *     to create the Android app within.
     */
    ProjectManagementRequestHandler.prototype.createAndroidApp = function (parentResourceName, packageName, displayName) {
        var _this = this;
        var requestData = {
            packageName: packageName,
        };
        if (validator.isNonEmptyString(displayName)) {
            requestData.displayName = displayName;
        }
        return this
            .invokeRequestHandler('POST', parentResourceName + "/androidApps", requestData, 'v1beta1')
            .then(function (responseData) {
            assertServerResponse(validator.isNonNullObject(responseData), responseData, 'createAndroidApp\'s responseData must be a non-null object.');
            assertServerResponse(validator.isNonEmptyString(responseData.name), responseData, 'createAndroidApp\'s responseData.name must be a non-empty string.');
            return _this.pollRemoteOperationWithExponentialBackoff(responseData.name);
        });
    };
    /**
     * @param {string} parentResourceName Fully-qualified resource name of the project that you want
     *     to create the iOS app within.
     */
    ProjectManagementRequestHandler.prototype.createIosApp = function (parentResourceName, bundleId, displayName) {
        var _this = this;
        var requestData = {
            bundleId: bundleId,
        };
        if (validator.isNonEmptyString(displayName)) {
            requestData.displayName = displayName;
        }
        return this
            .invokeRequestHandler('POST', parentResourceName + "/iosApps", requestData, 'v1beta1')
            .then(function (responseData) {
            assertServerResponse(validator.isNonNullObject(responseData), responseData, 'createIosApp\'s responseData must be a non-null object.');
            assertServerResponse(validator.isNonEmptyString(responseData.name), responseData, 'createIosApp\'s responseData.name must be a non-empty string.');
            return _this.pollRemoteOperationWithExponentialBackoff(responseData.name);
        });
    };
    /**
     * @param {string} resourceName Fully-qualified resource name of the entity whose display name you
     *     want to set.
     */
    ProjectManagementRequestHandler.prototype.setDisplayName = function (resourceName, newDisplayName) {
        var requestData = {
            displayName: newDisplayName,
        };
        return this
            .invokeRequestHandler('PATCH', resourceName + "?update_mask=display_name", requestData, 'v1beta1')
            .then(function () { return undefined; });
    };
    /**
     * @param {string} parentResourceName Fully-qualified resource name of the Android app whose SHA
     *     certificates you want to get.
     */
    ProjectManagementRequestHandler.prototype.getAndroidShaCertificates = function (parentResourceName) {
        return this.invokeRequestHandler('GET', parentResourceName + "/sha", /* requestData */ null, 'v1beta1');
    };
    /**
     * @param {string} parentResourceName Fully-qualified resource name of the Android app that you
     *     want to add the given SHA certificate to.
     */
    ProjectManagementRequestHandler.prototype.addAndroidShaCertificate = function (parentResourceName, certificate) {
        var requestData = {
            shaHash: certificate.shaHash,
            certType: CERT_TYPE_API_MAP[certificate.certType],
        };
        return this
            .invokeRequestHandler('POST', parentResourceName + "/sha", requestData, 'v1beta1')
            .then(function () { return undefined; });
    };
    /**
     * @param {string} parentResourceName Fully-qualified resource name of the app whose config you
     *     want to get.
     */
    ProjectManagementRequestHandler.prototype.getConfig = function (parentResourceName) {
        return this.invokeRequestHandler('GET', parentResourceName + "/config", /* requestData */ null, 'v1beta1');
    };
    /**
     * @param {string} parentResourceName Fully-qualified resource name of the entity that you want to
     *     get.
     */
    ProjectManagementRequestHandler.prototype.getResource = function (parentResourceName) {
        return this.invokeRequestHandler('GET', parentResourceName, /* requestData */ null, 'v1beta1');
    };
    /**
     * @param {string} resourceName Fully-qualified resource name of the entity that you want to
     *     delete.
     */
    ProjectManagementRequestHandler.prototype.deleteResource = function (resourceName) {
        return this
            .invokeRequestHandler('DELETE', resourceName, /* requestData */ null, 'v1beta1')
            .then(function () { return undefined; });
    };
    ProjectManagementRequestHandler.prototype.pollRemoteOperationWithExponentialBackoff = function (operationResourceName) {
        var _this = this;
        var poller = new api_request_1.ExponentialBackoffPoller();
        return poller.poll(function () {
            return _this.invokeRequestHandler('GET', operationResourceName, /* requestData */ null)
                .then(function (responseData) {
                if (responseData.error) {
                    var errStatusCode = responseData.error.code || 500;
                    var errText = responseData.error.message || JSON.stringify(responseData.error);
                    ProjectManagementRequestHandler.wrapAndRethrowHttpError(errStatusCode, errText);
                }
                if (!responseData.done) {
                    // Continue polling.
                    return null;
                }
                // Polling complete. Resolve with operation response JSON.
                return responseData.response;
            });
        });
    };
    /**
     * Invokes the request handler with the provided request data.
     */
    ProjectManagementRequestHandler.prototype.invokeRequestHandler = function (method, path, requestData, apiVersion) {
        if (apiVersion === void 0) { apiVersion = 'v1'; }
        var baseUrlToUse = (apiVersion === 'v1') ? this.baseUrl : this.baseBetaUrl;
        var request = {
            method: method,
            url: "" + baseUrlToUse + path,
            headers: PROJECT_MANAGEMENT_HEADERS,
            data: requestData,
            timeout: PROJECT_MANAGEMENT_TIMEOUT_MILLIS,
        };
        return this.httpClient.send(request)
            .then(function (response) {
            // Send non-JSON responses to the catch() below, where they will be treated as errors.
            if (!response.isJson()) {
                throw new api_request_1.HttpError(response);
            }
            return response.data;
        })
            .catch(function (err) {
            if (err instanceof api_request_1.HttpError) {
                ProjectManagementRequestHandler.wrapAndRethrowHttpError(err.response.status, err.response.text);
            }
            throw err;
        });
    };
    return ProjectManagementRequestHandler;
}());
exports.ProjectManagementRequestHandler = ProjectManagementRequestHandler;

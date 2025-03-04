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
exports.FirebaseRemoteConfigError = exports.RemoteConfigApiClient = void 0;
var api_request_1 = require("../utils/api-request");
var error_1 = require("../utils/error");
var utils = require("../utils/index");
var validator = require("../utils/validator");
var deep_copy_1 = require("../utils/deep-copy");
// Remote Config backend constants
var FIREBASE_REMOTE_CONFIG_V1_API = 'https://firebaseremoteconfig.googleapis.com/v1';
var FIREBASE_REMOTE_CONFIG_HEADERS = {
    'X-Firebase-Client': "fire-admin-node/" + utils.getSdkVersion(),
    // There is a known issue in which the ETag is not properly returned in cases where the request
    // does not specify a compression type. Currently, it is required to include the header
    // `Accept-Encoding: gzip` or equivalent in all requests.
    // https://firebase.google.com/docs/remote-config/use-config-rest#etag_usage_and_forced_updates
    'Accept-Encoding': 'gzip',
};
/**
 * Class that facilitates sending requests to the Firebase Remote Config backend API.
 *
 * @private
 */
var RemoteConfigApiClient = /** @class */ (function () {
    function RemoteConfigApiClient(app) {
        this.app = app;
        if (!validator.isNonNullObject(app) || !('options' in app)) {
            throw new FirebaseRemoteConfigError('invalid-argument', 'First argument passed to admin.remoteConfig() must be a valid Firebase app instance.');
        }
        this.httpClient = new api_request_1.AuthorizedHttpClient(app);
    }
    RemoteConfigApiClient.prototype.getTemplate = function () {
        var _this = this;
        return this.getUrl()
            .then(function (url) {
            var request = {
                method: 'GET',
                url: url + "/remoteConfig",
                headers: FIREBASE_REMOTE_CONFIG_HEADERS
            };
            return _this.httpClient.send(request);
        })
            .then(function (resp) {
            return _this.toRemoteConfigTemplate(resp);
        })
            .catch(function (err) {
            throw _this.toFirebaseError(err);
        });
    };
    RemoteConfigApiClient.prototype.getTemplateAtVersion = function (versionNumber) {
        var _this = this;
        var data = { versionNumber: this.validateVersionNumber(versionNumber) };
        return this.getUrl()
            .then(function (url) {
            var request = {
                method: 'GET',
                url: url + "/remoteConfig",
                headers: FIREBASE_REMOTE_CONFIG_HEADERS,
                data: data
            };
            return _this.httpClient.send(request);
        })
            .then(function (resp) {
            return _this.toRemoteConfigTemplate(resp);
        })
            .catch(function (err) {
            throw _this.toFirebaseError(err);
        });
    };
    RemoteConfigApiClient.prototype.validateTemplate = function (template) {
        var _this = this;
        template = this.validateInputRemoteConfigTemplate(template);
        return this.sendPutRequest(template, template.etag, true)
            .then(function (resp) {
            // validating a template returns an etag with the suffix -0 means that your update
            // was successfully validated. We set the etag back to the original etag of the template
            // to allow future operations.
            _this.validateEtag(resp.headers['etag']);
            return _this.toRemoteConfigTemplate(resp, template.etag);
        })
            .catch(function (err) {
            throw _this.toFirebaseError(err);
        });
    };
    RemoteConfigApiClient.prototype.publishTemplate = function (template, options) {
        var _this = this;
        template = this.validateInputRemoteConfigTemplate(template);
        var ifMatch = template.etag;
        if (options && options.force == true) {
            // setting `If-Match: *` forces the Remote Config template to be updated
            // and circumvent the ETag, and the protection from that it provides.
            ifMatch = '*';
        }
        return this.sendPutRequest(template, ifMatch)
            .then(function (resp) {
            return _this.toRemoteConfigTemplate(resp);
        })
            .catch(function (err) {
            throw _this.toFirebaseError(err);
        });
    };
    RemoteConfigApiClient.prototype.rollback = function (versionNumber) {
        var _this = this;
        var data = { versionNumber: this.validateVersionNumber(versionNumber) };
        return this.getUrl()
            .then(function (url) {
            var request = {
                method: 'POST',
                url: url + "/remoteConfig:rollback",
                headers: FIREBASE_REMOTE_CONFIG_HEADERS,
                data: data
            };
            return _this.httpClient.send(request);
        })
            .then(function (resp) {
            return _this.toRemoteConfigTemplate(resp);
        })
            .catch(function (err) {
            throw _this.toFirebaseError(err);
        });
    };
    RemoteConfigApiClient.prototype.listVersions = function (options) {
        var _this = this;
        if (typeof options !== 'undefined') {
            options = this.validateListVersionsOptions(options);
        }
        return this.getUrl()
            .then(function (url) {
            var request = {
                method: 'GET',
                url: url + "/remoteConfig:listVersions",
                headers: FIREBASE_REMOTE_CONFIG_HEADERS,
                data: options
            };
            return _this.httpClient.send(request);
        })
            .then(function (resp) {
            return resp.data;
        })
            .catch(function (err) {
            throw _this.toFirebaseError(err);
        });
    };
    RemoteConfigApiClient.prototype.sendPutRequest = function (template, etag, validateOnly) {
        var _this = this;
        var path = 'remoteConfig';
        if (validateOnly) {
            path += '?validate_only=true';
        }
        return this.getUrl()
            .then(function (url) {
            var request = {
                method: 'PUT',
                url: url + "/" + path,
                headers: __assign(__assign({}, FIREBASE_REMOTE_CONFIG_HEADERS), { 'If-Match': etag }),
                data: {
                    conditions: template.conditions,
                    parameters: template.parameters,
                    parameterGroups: template.parameterGroups,
                    version: template.version,
                }
            };
            return _this.httpClient.send(request);
        });
    };
    RemoteConfigApiClient.prototype.getUrl = function () {
        return this.getProjectIdPrefix()
            .then(function (projectIdPrefix) {
            return FIREBASE_REMOTE_CONFIG_V1_API + "/" + projectIdPrefix;
        });
    };
    RemoteConfigApiClient.prototype.getProjectIdPrefix = function () {
        var _this = this;
        if (this.projectIdPrefix) {
            return Promise.resolve(this.projectIdPrefix);
        }
        return utils.findProjectId(this.app)
            .then(function (projectId) {
            if (!validator.isNonEmptyString(projectId)) {
                throw new FirebaseRemoteConfigError('unknown-error', 'Failed to determine project ID. Initialize the SDK with service account credentials, or '
                    + 'set project ID as an app option. Alternatively, set the GOOGLE_CLOUD_PROJECT '
                    + 'environment variable.');
            }
            _this.projectIdPrefix = "projects/" + projectId;
            return _this.projectIdPrefix;
        });
    };
    RemoteConfigApiClient.prototype.toFirebaseError = function (err) {
        if (err instanceof error_1.PrefixedFirebaseError) {
            return err;
        }
        var response = err.response;
        if (!response.isJson()) {
            return new FirebaseRemoteConfigError('unknown-error', "Unexpected response with status: " + response.status + " and body: " + response.text);
        }
        var error = response.data.error || {};
        var code = 'unknown-error';
        if (error.status && error.status in ERROR_CODE_MAPPING) {
            code = ERROR_CODE_MAPPING[error.status];
        }
        var message = error.message || "Unknown server error: " + response.text;
        return new FirebaseRemoteConfigError(code, message);
    };
    /**
     * Creates a RemoteConfigTemplate from the API response.
     * If provided, customEtag is used instead of the etag returned in the API response.
     *
     * @param {HttpResponse} resp API response object.
     * @param {string} customEtag A custom etag to replace the etag fom the API response (Optional).
     */
    RemoteConfigApiClient.prototype.toRemoteConfigTemplate = function (resp, customEtag) {
        var etag = (typeof customEtag == 'undefined') ? resp.headers['etag'] : customEtag;
        this.validateEtag(etag);
        return {
            conditions: resp.data.conditions,
            parameters: resp.data.parameters,
            parameterGroups: resp.data.parameterGroups,
            etag: etag,
            version: resp.data.version,
        };
    };
    /**
     * Checks if the given RemoteConfigTemplate object is valid.
     * The object must have valid parameters, parameter groups, conditions, and an etag.
     * Removes output only properties from version metadata.
     *
     * @param {RemoteConfigTemplate} template A RemoteConfigTemplate object to be validated.
     *
     * @returns {RemoteConfigTemplate} The validated RemoteConfigTemplate object.
     */
    RemoteConfigApiClient.prototype.validateInputRemoteConfigTemplate = function (template) {
        var templateCopy = deep_copy_1.deepCopy(template);
        if (!validator.isNonNullObject(templateCopy)) {
            throw new FirebaseRemoteConfigError('invalid-argument', "Invalid Remote Config template: " + JSON.stringify(templateCopy));
        }
        if (!validator.isNonEmptyString(templateCopy.etag)) {
            throw new FirebaseRemoteConfigError('invalid-argument', 'ETag must be a non-empty string.');
        }
        if (!validator.isNonNullObject(templateCopy.parameters)) {
            throw new FirebaseRemoteConfigError('invalid-argument', 'Remote Config parameters must be a non-null object');
        }
        if (!validator.isNonNullObject(templateCopy.parameterGroups)) {
            throw new FirebaseRemoteConfigError('invalid-argument', 'Remote Config parameter groups must be a non-null object');
        }
        if (!validator.isArray(templateCopy.conditions)) {
            throw new FirebaseRemoteConfigError('invalid-argument', 'Remote Config conditions must be an array');
        }
        if (typeof templateCopy.version !== 'undefined') {
            // exclude output only properties and keep the only input property: description
            templateCopy.version = { description: templateCopy.version.description };
        }
        return templateCopy;
    };
    /**
     * Checks if a given version number is valid.
     * A version number must be an integer or a string in int64 format.
     * If valid, returns the string representation of the provided version number.
     *
     * @param {string|number} versionNumber A version number to be validated.
     *
     * @returns {string} The validated version number as a string.
     */
    RemoteConfigApiClient.prototype.validateVersionNumber = function (versionNumber, propertyName) {
        if (propertyName === void 0) { propertyName = 'versionNumber'; }
        if (!validator.isNonEmptyString(versionNumber) &&
            !validator.isNumber(versionNumber)) {
            throw new FirebaseRemoteConfigError('invalid-argument', propertyName + " must be a non-empty string in int64 format or a number");
        }
        if (!Number.isInteger(Number(versionNumber))) {
            throw new FirebaseRemoteConfigError('invalid-argument', propertyName + " must be an integer or a string in int64 format");
        }
        return versionNumber.toString();
    };
    RemoteConfigApiClient.prototype.validateEtag = function (etag) {
        if (!validator.isNonEmptyString(etag)) {
            throw new FirebaseRemoteConfigError('invalid-argument', 'ETag header is not present in the server response.');
        }
    };
    /**
     * Checks if a given `ListVersionsOptions` object is valid. If successful, creates a copy of the
     * options object and convert `startTime` and `endTime` to RFC3339 UTC "Zulu" format, if present.
     *
     * @param {ListVersionsOptions} options An options object to be validated.
     *
     * @return {ListVersionsOptions} A copy of the provided options object with timestamps converted
     * to UTC Zulu format.
     */
    RemoteConfigApiClient.prototype.validateListVersionsOptions = function (options) {
        var optionsCopy = deep_copy_1.deepCopy(options);
        if (!validator.isNonNullObject(optionsCopy)) {
            throw new FirebaseRemoteConfigError('invalid-argument', 'ListVersionsOptions must be a non-null object.');
        }
        if (typeof optionsCopy.pageSize !== 'undefined') {
            if (!validator.isNumber(optionsCopy.pageSize)) {
                throw new FirebaseRemoteConfigError('invalid-argument', 'pageSize must be a number.');
            }
            if (optionsCopy.pageSize < 1 || optionsCopy.pageSize > 300) {
                throw new FirebaseRemoteConfigError('invalid-argument', 'pageSize must be a number between 1 and 300 (inclusive).');
            }
        }
        if (typeof optionsCopy.pageToken !== 'undefined' && !validator.isNonEmptyString(optionsCopy.pageToken)) {
            throw new FirebaseRemoteConfigError('invalid-argument', 'pageToken must be a string value.');
        }
        if (typeof optionsCopy.endVersionNumber !== 'undefined') {
            optionsCopy.endVersionNumber = this.validateVersionNumber(optionsCopy.endVersionNumber, 'endVersionNumber');
        }
        if (typeof optionsCopy.startTime !== 'undefined') {
            if (!(optionsCopy.startTime instanceof Date) && !validator.isUTCDateString(optionsCopy.startTime)) {
                throw new FirebaseRemoteConfigError('invalid-argument', 'startTime must be a valid Date object or a UTC date string.');
            }
            // Convert startTime to RFC3339 UTC "Zulu" format.
            if (optionsCopy.startTime instanceof Date) {
                optionsCopy.startTime = optionsCopy.startTime.toISOString();
            }
            else {
                optionsCopy.startTime = new Date(optionsCopy.startTime).toISOString();
            }
        }
        if (typeof optionsCopy.endTime !== 'undefined') {
            if (!(optionsCopy.endTime instanceof Date) && !validator.isUTCDateString(optionsCopy.endTime)) {
                throw new FirebaseRemoteConfigError('invalid-argument', 'endTime must be a valid Date object or a UTC date string.');
            }
            // Convert endTime to RFC3339 UTC "Zulu" format.
            if (optionsCopy.endTime instanceof Date) {
                optionsCopy.endTime = optionsCopy.endTime.toISOString();
            }
            else {
                optionsCopy.endTime = new Date(optionsCopy.endTime).toISOString();
            }
        }
        // Remove undefined fields from optionsCopy
        Object.keys(optionsCopy).forEach(function (key) {
            return (typeof optionsCopy[key] === 'undefined') && delete optionsCopy[key];
        });
        return optionsCopy;
    };
    return RemoteConfigApiClient;
}());
exports.RemoteConfigApiClient = RemoteConfigApiClient;
var ERROR_CODE_MAPPING = {
    ABORTED: 'aborted',
    ALREADY_EXISTS: 'already-exists',
    INVALID_ARGUMENT: 'invalid-argument',
    INTERNAL: 'internal-error',
    FAILED_PRECONDITION: 'failed-precondition',
    NOT_FOUND: 'not-found',
    OUT_OF_RANGE: 'out-of-range',
    PERMISSION_DENIED: 'permission-denied',
    RESOURCE_EXHAUSTED: 'resource-exhausted',
    UNAUTHENTICATED: 'unauthenticated',
    UNKNOWN: 'unknown-error',
};
/**
 * Firebase Remote Config error code structure. This extends PrefixedFirebaseError.
 *
 * @param {RemoteConfigErrorCode} code The error code.
 * @param {string} message The error message.
 * @constructor
 */
var FirebaseRemoteConfigError = /** @class */ (function (_super) {
    __extends(FirebaseRemoteConfigError, _super);
    function FirebaseRemoteConfigError(code, message) {
        return _super.call(this, 'remote-config', code, message) || this;
    }
    return FirebaseRemoteConfigError;
}(error_1.PrefixedFirebaseError));
exports.FirebaseRemoteConfigError = FirebaseRemoteConfigError;

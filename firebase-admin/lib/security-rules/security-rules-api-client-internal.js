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
exports.SecurityRulesApiClient = void 0;
var api_request_1 = require("../utils/api-request");
var error_1 = require("../utils/error");
var security_rules_internal_1 = require("./security-rules-internal");
var utils = require("../utils/index");
var validator = require("../utils/validator");
var RULES_V1_API = 'https://firebaserules.googleapis.com/v1';
var FIREBASE_VERSION_HEADER = {
    'X-Firebase-Client': "fire-admin-node/" + utils.getSdkVersion(),
};
/**
 * Class that facilitates sending requests to the Firebase security rules backend API.
 *
 * @private
 */
var SecurityRulesApiClient = /** @class */ (function () {
    function SecurityRulesApiClient(app) {
        this.app = app;
        if (!validator.isNonNullObject(app) || !('options' in app)) {
            throw new security_rules_internal_1.FirebaseSecurityRulesError('invalid-argument', 'First argument passed to admin.securityRules() must be a valid Firebase app '
                + 'instance.');
        }
        this.httpClient = new api_request_1.AuthorizedHttpClient(app);
    }
    SecurityRulesApiClient.prototype.getRuleset = function (name) {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            return _this.getRulesetName(name);
        })
            .then(function (rulesetName) {
            return _this.getResource(rulesetName);
        });
    };
    SecurityRulesApiClient.prototype.createRuleset = function (ruleset) {
        var _this = this;
        if (!validator.isNonNullObject(ruleset) ||
            !validator.isNonNullObject(ruleset.source) ||
            !validator.isNonEmptyArray(ruleset.source.files)) {
            var err = new security_rules_internal_1.FirebaseSecurityRulesError('invalid-argument', 'Invalid rules content.');
            return Promise.reject(err);
        }
        for (var _i = 0, _a = ruleset.source.files; _i < _a.length; _i++) {
            var rf = _a[_i];
            if (!validator.isNonNullObject(rf) ||
                !validator.isNonEmptyString(rf.name) ||
                !validator.isNonEmptyString(rf.content)) {
                var err = new security_rules_internal_1.FirebaseSecurityRulesError('invalid-argument', "Invalid rules file argument: " + JSON.stringify(rf));
                return Promise.reject(err);
            }
        }
        return this.getUrl()
            .then(function (url) {
            var request = {
                method: 'POST',
                url: url + "/rulesets",
                data: ruleset,
            };
            return _this.sendRequest(request);
        });
    };
    SecurityRulesApiClient.prototype.deleteRuleset = function (name) {
        var _this = this;
        return this.getUrl()
            .then(function (url) {
            var rulesetName = _this.getRulesetName(name);
            var request = {
                method: 'DELETE',
                url: url + "/" + rulesetName,
            };
            return _this.sendRequest(request);
        });
    };
    SecurityRulesApiClient.prototype.listRulesets = function (pageSize, pageToken) {
        var _this = this;
        if (pageSize === void 0) { pageSize = 100; }
        if (!validator.isNumber(pageSize)) {
            var err = new security_rules_internal_1.FirebaseSecurityRulesError('invalid-argument', 'Invalid page size.');
            return Promise.reject(err);
        }
        if (pageSize < 1 || pageSize > 100) {
            var err = new security_rules_internal_1.FirebaseSecurityRulesError('invalid-argument', 'Page size must be between 1 and 100.');
            return Promise.reject(err);
        }
        if (typeof pageToken !== 'undefined' && !validator.isNonEmptyString(pageToken)) {
            var err = new security_rules_internal_1.FirebaseSecurityRulesError('invalid-argument', 'Next page token must be a non-empty string.');
            return Promise.reject(err);
        }
        var data = {
            pageSize: pageSize,
            pageToken: pageToken,
        };
        if (!pageToken) {
            delete data.pageToken;
        }
        return this.getUrl()
            .then(function (url) {
            var request = {
                method: 'GET',
                url: url + "/rulesets",
                data: data,
            };
            return _this.sendRequest(request);
        });
    };
    SecurityRulesApiClient.prototype.getRelease = function (name) {
        return this.getResource("releases/" + name);
    };
    SecurityRulesApiClient.prototype.updateRelease = function (name, rulesetName) {
        var _this = this;
        return this.getUrl()
            .then(function (url) {
            return _this.getReleaseDescription(name, rulesetName)
                .then(function (release) {
                var request = {
                    method: 'PATCH',
                    url: url + "/releases/" + name,
                    data: { release: release },
                };
                return _this.sendRequest(request);
            });
        });
    };
    SecurityRulesApiClient.prototype.getUrl = function () {
        return this.getProjectIdPrefix()
            .then(function (projectIdPrefix) {
            return RULES_V1_API + "/" + projectIdPrefix;
        });
    };
    SecurityRulesApiClient.prototype.getProjectIdPrefix = function () {
        var _this = this;
        if (this.projectIdPrefix) {
            return Promise.resolve(this.projectIdPrefix);
        }
        return utils.findProjectId(this.app)
            .then(function (projectId) {
            if (!validator.isNonEmptyString(projectId)) {
                throw new security_rules_internal_1.FirebaseSecurityRulesError('invalid-argument', 'Failed to determine project ID. Initialize the SDK with service account credentials, or '
                    + 'set project ID as an app option. Alternatively, set the GOOGLE_CLOUD_PROJECT '
                    + 'environment variable.');
            }
            _this.projectIdPrefix = "projects/" + projectId;
            return _this.projectIdPrefix;
        });
    };
    /**
     * Gets the specified resource from the rules API. Resource names must be the short names without project
     * ID prefix (e.g. `rulesets/ruleset-name`).
     *
     * @param {string} name Full qualified name of the resource to get.
     * @returns {Promise<T>} A promise that fulfills with the resource.
     */
    SecurityRulesApiClient.prototype.getResource = function (name) {
        var _this = this;
        return this.getUrl()
            .then(function (url) {
            var request = {
                method: 'GET',
                url: url + "/" + name,
            };
            return _this.sendRequest(request);
        });
    };
    SecurityRulesApiClient.prototype.getReleaseDescription = function (name, rulesetName) {
        var _this = this;
        return this.getProjectIdPrefix()
            .then(function (projectIdPrefix) {
            return {
                name: projectIdPrefix + "/releases/" + name,
                rulesetName: projectIdPrefix + "/" + _this.getRulesetName(rulesetName),
            };
        });
    };
    SecurityRulesApiClient.prototype.getRulesetName = function (name) {
        if (!validator.isNonEmptyString(name)) {
            throw new security_rules_internal_1.FirebaseSecurityRulesError('invalid-argument', 'Ruleset name must be a non-empty string.');
        }
        if (name.indexOf('/') !== -1) {
            throw new security_rules_internal_1.FirebaseSecurityRulesError('invalid-argument', 'Ruleset name must not contain any "/" characters.');
        }
        return "rulesets/" + name;
    };
    SecurityRulesApiClient.prototype.sendRequest = function (request) {
        var _this = this;
        request.headers = FIREBASE_VERSION_HEADER;
        return this.httpClient.send(request)
            .then(function (resp) {
            return resp.data;
        })
            .catch(function (err) {
            throw _this.toFirebaseError(err);
        });
    };
    SecurityRulesApiClient.prototype.toFirebaseError = function (err) {
        if (err instanceof error_1.PrefixedFirebaseError) {
            return err;
        }
        var response = err.response;
        if (!response.isJson()) {
            return new security_rules_internal_1.FirebaseSecurityRulesError('unknown-error', "Unexpected response with status: " + response.status + " and body: " + response.text);
        }
        var error = response.data.error || {};
        var code = 'unknown-error';
        if (error.status && error.status in ERROR_CODE_MAPPING) {
            code = ERROR_CODE_MAPPING[error.status];
        }
        var message = error.message || "Unknown server error: " + response.text;
        return new security_rules_internal_1.FirebaseSecurityRulesError(code, message);
    };
    return SecurityRulesApiClient;
}());
exports.SecurityRulesApiClient = SecurityRulesApiClient;
var ERROR_CODE_MAPPING = {
    INVALID_ARGUMENT: 'invalid-argument',
    NOT_FOUND: 'not-found',
    RESOURCE_EXHAUSTED: 'resource-exhausted',
    UNAUTHENTICATED: 'authentication-error',
    UNKNOWN: 'unknown-error',
};

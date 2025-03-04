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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineLearningApiClient = exports.isGcsTfliteModelOptions = void 0;
var api_request_1 = require("../utils/api-request");
var error_1 = require("../utils/error");
var machine_learning_utils_1 = require("./machine-learning-utils");
var utils = require("../utils/index");
var validator = require("../utils/validator");
var ML_V1BETA2_API = 'https://firebaseml.googleapis.com/v1beta2';
var FIREBASE_VERSION_HEADER = {
    'X-Firebase-Client': "fire-admin-node/" + utils.getSdkVersion(),
};
// Operation polling defaults
var POLL_DEFAULT_MAX_TIME_MILLISECONDS = 120000; // Maximum overall 2 minutes
var POLL_BASE_WAIT_TIME_MILLISECONDS = 3000; // Start with 3 second delay
var POLL_MAX_WAIT_TIME_MILLISECONDS = 30000; // Maximum 30 second delay
function isGcsTfliteModelOptions(options) {
    var _a, _b;
    var gcsUri = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.tfliteModel) === null || _b === void 0 ? void 0 : _b.gcsTfliteUri;
    return typeof gcsUri !== 'undefined';
}
exports.isGcsTfliteModelOptions = isGcsTfliteModelOptions;
/**
 * Class that facilitates sending requests to the Firebase ML backend API.
 *
 * @private
 */
var MachineLearningApiClient = /** @class */ (function () {
    function MachineLearningApiClient(app) {
        this.app = app;
        if (!validator.isNonNullObject(app) || !('options' in app)) {
            throw new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'First argument passed to admin.machineLearning() must be a valid '
                + 'Firebase app instance.');
        }
        this.httpClient = new api_request_1.AuthorizedHttpClient(app);
    }
    MachineLearningApiClient.prototype.createModel = function (model) {
        var _this = this;
        if (!validator.isNonNullObject(model) ||
            !validator.isNonEmptyString(model.displayName)) {
            var err = new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'Invalid model content.');
            return Promise.reject(err);
        }
        return this.getProjectUrl()
            .then(function (url) {
            var request = {
                method: 'POST',
                url: url + "/models",
                data: model,
            };
            return _this.sendRequest(request);
        });
    };
    MachineLearningApiClient.prototype.updateModel = function (modelId, model, updateMask) {
        var _this = this;
        if (!validator.isNonEmptyString(modelId) ||
            !validator.isNonNullObject(model) ||
            !validator.isNonEmptyArray(updateMask)) {
            var err = new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'Invalid model or mask content.');
            return Promise.reject(err);
        }
        return this.getProjectUrl()
            .then(function (url) {
            var request = {
                method: 'PATCH',
                url: url + "/models/" + modelId + "?updateMask=" + updateMask.join(),
                data: model,
            };
            return _this.sendRequest(request);
        });
    };
    MachineLearningApiClient.prototype.getModel = function (modelId) {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            return _this.getModelName(modelId);
        })
            .then(function (modelName) {
            return _this.getResourceWithShortName(modelName);
        });
    };
    MachineLearningApiClient.prototype.getOperation = function (operationName) {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            return _this.getResourceWithFullName(operationName);
        });
    };
    MachineLearningApiClient.prototype.listModels = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (!validator.isNonNullObject(options)) {
            var err = new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'Invalid ListModelsOptions');
            return Promise.reject(err);
        }
        if (typeof options.filter !== 'undefined' && !validator.isNonEmptyString(options.filter)) {
            var err = new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'Invalid list filter.');
            return Promise.reject(err);
        }
        if (typeof options.pageSize !== 'undefined') {
            if (!validator.isNumber(options.pageSize)) {
                var err = new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'Invalid page size.');
                return Promise.reject(err);
            }
            if (options.pageSize < 1 || options.pageSize > 100) {
                var err = new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'Page size must be between 1 and 100.');
                return Promise.reject(err);
            }
        }
        if (typeof options.pageToken !== 'undefined' && !validator.isNonEmptyString(options.pageToken)) {
            var err = new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'Next page token must be a non-empty string.');
            return Promise.reject(err);
        }
        return this.getProjectUrl()
            .then(function (url) {
            var request = {
                method: 'GET',
                url: url + "/models",
                data: options,
            };
            return _this.sendRequest(request);
        });
    };
    MachineLearningApiClient.prototype.deleteModel = function (modelId) {
        var _this = this;
        return this.getProjectUrl()
            .then(function (url) {
            var modelName = _this.getModelName(modelId);
            var request = {
                method: 'DELETE',
                url: url + "/" + modelName,
            };
            return _this.sendRequest(request);
        });
    };
    /**
     * Handles a Long Running Operation coming back from the server.
     *
     * @param op The operation to handle
     * @param options The options for polling
     */
    MachineLearningApiClient.prototype.handleOperation = function (op, options) {
        if (op.done) {
            if (op.response) {
                return Promise.resolve(op.response);
            }
            else if (op.error) {
                var err = machine_learning_utils_1.FirebaseMachineLearningError.fromOperationError(op.error.code, op.error.message);
                return Promise.reject(err);
            }
            // Done operations must have either a response or an error.
            throw new machine_learning_utils_1.FirebaseMachineLearningError('invalid-server-response', 'Invalid operation response.');
        }
        // Operation is not done
        if (options === null || options === void 0 ? void 0 : options.wait) {
            return this.pollOperationWithExponentialBackoff(op.name, options);
        }
        var metadata = op.metadata || {};
        var metadataType = metadata['@type'] || '';
        if (!metadataType.includes('ModelOperationMetadata')) {
            throw new machine_learning_utils_1.FirebaseMachineLearningError('invalid-server-response', "Unknown Metadata type: " + JSON.stringify(metadata));
        }
        return this.getModel(extractModelId(metadata.name));
    };
    // baseWaitMillis and maxWaitMillis should only ever be modified by unit tests to run faster.
    MachineLearningApiClient.prototype.pollOperationWithExponentialBackoff = function (opName, options) {
        var _this = this;
        var _a, _b, _c;
        var maxTimeMilliseconds = (_a = options === null || options === void 0 ? void 0 : options.maxTimeMillis) !== null && _a !== void 0 ? _a : POLL_DEFAULT_MAX_TIME_MILLISECONDS;
        var baseWaitMillis = (_b = options === null || options === void 0 ? void 0 : options.baseWaitMillis) !== null && _b !== void 0 ? _b : POLL_BASE_WAIT_TIME_MILLISECONDS;
        var maxWaitMillis = (_c = options === null || options === void 0 ? void 0 : options.maxWaitMillis) !== null && _c !== void 0 ? _c : POLL_MAX_WAIT_TIME_MILLISECONDS;
        var poller = new api_request_1.ExponentialBackoffPoller(baseWaitMillis, maxWaitMillis, maxTimeMilliseconds);
        return poller.poll(function () {
            return _this.getOperation(opName)
                .then(function (responseData) {
                if (!responseData.done) {
                    return null;
                }
                if (responseData.error) {
                    var err = machine_learning_utils_1.FirebaseMachineLearningError.fromOperationError(responseData.error.code, responseData.error.message);
                    throw err;
                }
                return responseData.response;
            });
        });
    };
    /**
     * Gets the specified resource from the ML API. Resource names must be the short names without project
     * ID prefix (e.g. `models/123456789`).
     *
     * @param {string} name Short name of the resource to get. e.g. 'models/12345'
     * @returns {Promise<T>} A promise that fulfills with the resource.
     */
    MachineLearningApiClient.prototype.getResourceWithShortName = function (name) {
        var _this = this;
        return this.getProjectUrl()
            .then(function (url) {
            var request = {
                method: 'GET',
                url: url + "/" + name,
            };
            return _this.sendRequest(request);
        });
    };
    /**
     * Gets the specified resource from the ML API. Resource names must be the full names including project
     * number prefix.
     * @param fullName Full resource name of the resource to get. e.g. projects/123465/operations/987654
     * @returns {Promise<T>} A promise that fulfulls with the resource.
     */
    MachineLearningApiClient.prototype.getResourceWithFullName = function (fullName) {
        var request = {
            method: 'GET',
            url: ML_V1BETA2_API + "/" + fullName
        };
        return this.sendRequest(request);
    };
    MachineLearningApiClient.prototype.sendRequest = function (request) {
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
    MachineLearningApiClient.prototype.toFirebaseError = function (err) {
        if (err instanceof error_1.PrefixedFirebaseError) {
            return err;
        }
        var response = err.response;
        if (!response.isJson()) {
            return new machine_learning_utils_1.FirebaseMachineLearningError('unknown-error', "Unexpected response with status: " + response.status + " and body: " + response.text);
        }
        var error = response.data.error || {};
        var code = 'unknown-error';
        if (error.status && error.status in ERROR_CODE_MAPPING) {
            code = ERROR_CODE_MAPPING[error.status];
        }
        var message = error.message || "Unknown server error: " + response.text;
        return new machine_learning_utils_1.FirebaseMachineLearningError(code, message);
    };
    MachineLearningApiClient.prototype.getProjectUrl = function () {
        return this.getProjectIdPrefix()
            .then(function (projectIdPrefix) {
            return ML_V1BETA2_API + "/" + projectIdPrefix;
        });
    };
    MachineLearningApiClient.prototype.getProjectIdPrefix = function () {
        var _this = this;
        if (this.projectIdPrefix) {
            return Promise.resolve(this.projectIdPrefix);
        }
        return utils.findProjectId(this.app)
            .then(function (projectId) {
            if (!validator.isNonEmptyString(projectId)) {
                throw new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'Failed to determine project ID. Initialize the SDK with service account credentials, or '
                    + 'set project ID as an app option. Alternatively, set the GOOGLE_CLOUD_PROJECT '
                    + 'environment variable.');
            }
            _this.projectIdPrefix = "projects/" + projectId;
            return _this.projectIdPrefix;
        });
    };
    MachineLearningApiClient.prototype.getModelName = function (modelId) {
        if (!validator.isNonEmptyString(modelId)) {
            throw new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'Model ID must be a non-empty string.');
        }
        if (modelId.indexOf('/') !== -1) {
            throw new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', 'Model ID must not contain any "/" characters.');
        }
        return "models/" + modelId;
    };
    return MachineLearningApiClient;
}());
exports.MachineLearningApiClient = MachineLearningApiClient;
var ERROR_CODE_MAPPING = {
    INVALID_ARGUMENT: 'invalid-argument',
    NOT_FOUND: 'not-found',
    RESOURCE_EXHAUSTED: 'resource-exhausted',
    UNAUTHENTICATED: 'authentication-error',
    UNKNOWN: 'unknown-error',
};
function extractModelId(resourceName) {
    return resourceName.split('/').pop();
}

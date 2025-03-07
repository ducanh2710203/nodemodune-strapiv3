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
exports.Model = exports.MachineLearning = void 0;
var machine_learning_api_client_1 = require("./machine-learning-api-client");
var error_1 = require("../utils/error");
var validator = require("../utils/validator");
var machine_learning_utils_1 = require("./machine-learning-utils");
var deep_copy_1 = require("../utils/deep-copy");
var utils = require("../utils");
/**
 * The Firebase Machine Learning class
 */
var MachineLearning = /** @class */ (function () {
    /**
     * @param {FirebaseApp} app The app for this ML service.
     * @constructor
     */
    function MachineLearning(app) {
        if (!validator.isNonNullObject(app) || !('options' in app)) {
            throw new error_1.FirebaseError({
                code: 'machine-learning/invalid-argument',
                message: 'First argument passed to admin.machineLearning() must be a ' +
                    'valid Firebase app instance.',
            });
        }
        this.appInternal = app;
        this.client = new machine_learning_api_client_1.MachineLearningApiClient(app);
    }
    Object.defineProperty(MachineLearning.prototype, "app", {
        /**
         * Returns the app associated with this ML instance.
         *
         * @return {FirebaseApp} The app associated with this ML instance.
         */
        get: function () {
            return this.appInternal;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates a model in Firebase ML.
     *
     * @param {ModelOptions} model The model to create.
     *
     * @return {Promise<Model>} A Promise fulfilled with the created model.
     */
    MachineLearning.prototype.createModel = function (model) {
        var _this = this;
        return this.signUrlIfPresent(model)
            .then(function (modelContent) { return _this.client.createModel(modelContent); })
            .then(function (operation) { return _this.client.handleOperation(operation); })
            .then(function (modelResponse) { return new Model(modelResponse, _this.client); });
    };
    /**
     * Updates a model in Firebase ML.
     *
     * @param {string} modelId The id of the model to update.
     * @param {ModelOptions} model The model fields to update.
     *
     * @return {Promise<Model>} A Promise fulfilled with the updated model.
     */
    MachineLearning.prototype.updateModel = function (modelId, model) {
        var _this = this;
        var updateMask = utils.generateUpdateMask(model);
        return this.signUrlIfPresent(model)
            .then(function (modelContent) { return _this.client.updateModel(modelId, modelContent, updateMask); })
            .then(function (operation) { return _this.client.handleOperation(operation); })
            .then(function (modelResponse) { return new Model(modelResponse, _this.client); });
    };
    /**
     * Publishes a model in Firebase ML.
     *
     * @param {string} modelId The id of the model to publish.
     *
     * @return {Promise<Model>} A Promise fulfilled with the published model.
     */
    MachineLearning.prototype.publishModel = function (modelId) {
        return this.setPublishStatus(modelId, true);
    };
    /**
     * Unpublishes a model in Firebase ML.
     *
     * @param {string} modelId The id of the model to unpublish.
     *
     * @return {Promise<Model>} A Promise fulfilled with the unpublished model.
     */
    MachineLearning.prototype.unpublishModel = function (modelId) {
        return this.setPublishStatus(modelId, false);
    };
    /**
     * Gets a model from Firebase ML.
     *
     * @param {string} modelId The id of the model to get.
     *
     * @return {Promise<Model>} A Promise fulfilled with the unpublished model.
     */
    MachineLearning.prototype.getModel = function (modelId) {
        var _this = this;
        return this.client.getModel(modelId)
            .then(function (modelResponse) { return new Model(modelResponse, _this.client); });
    };
    /**
     * Lists models from Firebase ML.
     *
     * @param {ListModelsOptions} options The listing options.
     *
     * @return {Promise<{models: Model[], pageToken?: string}>} A promise that
     *     resolves with the current (filtered) list of models and the next page
     *     token. For the last page, an empty list of models and no page token are
     *     returned.
     */
    MachineLearning.prototype.listModels = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this.client.listModels(options)
            .then(function (resp) {
            if (!validator.isNonNullObject(resp)) {
                throw new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', "Invalid ListModels response: " + JSON.stringify(resp));
            }
            var models = [];
            if (resp.models) {
                models = resp.models.map(function (rs) { return new Model(rs, _this.client); });
            }
            var result = { models: models };
            if (resp.nextPageToken) {
                result.pageToken = resp.nextPageToken;
            }
            return result;
        });
    };
    /**
     * Deletes a model from Firebase ML.
     *
     * @param {string} modelId The id of the model to delete.
     */
    MachineLearning.prototype.deleteModel = function (modelId) {
        return this.client.deleteModel(modelId);
    };
    MachineLearning.prototype.setPublishStatus = function (modelId, publish) {
        var _this = this;
        var updateMask = ['state.published'];
        var options = { state: { published: publish } };
        return this.client.updateModel(modelId, options, updateMask)
            .then(function (operation) { return _this.client.handleOperation(operation); })
            .then(function (modelResponse) { return new Model(modelResponse, _this.client); });
    };
    MachineLearning.prototype.signUrlIfPresent = function (options) {
        var modelOptions = deep_copy_1.deepCopy(options);
        if (machine_learning_api_client_1.isGcsTfliteModelOptions(modelOptions)) {
            return this.signUrl(modelOptions.tfliteModel.gcsTfliteUri)
                .then(function (uri) {
                modelOptions.tfliteModel.gcsTfliteUri = uri;
                return modelOptions;
            })
                .catch(function (err) {
                throw new machine_learning_utils_1.FirebaseMachineLearningError('internal-error', "Error during signing upload url: " + err.message);
            });
        }
        return Promise.resolve(modelOptions);
    };
    MachineLearning.prototype.signUrl = function (unsignedUrl) {
        var MINUTES_IN_MILLIS = 60 * 1000;
        var URL_VALID_DURATION = 10 * MINUTES_IN_MILLIS;
        var gcsRegex = /^gs:\/\/([a-z0-9_.-]{3,63})\/(.+)$/;
        var matches = gcsRegex.exec(unsignedUrl);
        if (!matches) {
            throw new machine_learning_utils_1.FirebaseMachineLearningError('invalid-argument', "Invalid unsigned url: " + unsignedUrl);
        }
        var bucketName = matches[1];
        var blobName = matches[2];
        var bucket = this.appInternal.storage().bucket(bucketName);
        var blob = bucket.file(blobName);
        return blob.getSignedUrl({
            action: 'read',
            expires: Date.now() + URL_VALID_DURATION,
        }).then(function (signUrl) { return signUrl[0]; });
    };
    return MachineLearning;
}());
exports.MachineLearning = MachineLearning;
/**
 * A Firebase ML Model output object.
 */
var Model = /** @class */ (function () {
    function Model(model, client) {
        this.model = Model.validateAndClone(model);
        this.client = client;
    }
    Object.defineProperty(Model.prototype, "modelId", {
        get: function () {
            return extractModelId(this.model.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "displayName", {
        get: function () {
            return this.model.displayName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "tags", {
        get: function () {
            return this.model.tags || [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "createTime", {
        get: function () {
            return new Date(this.model.createTime).toUTCString();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "updateTime", {
        get: function () {
            return new Date(this.model.updateTime).toUTCString();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "validationError", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.model.state) === null || _a === void 0 ? void 0 : _a.validationError) === null || _b === void 0 ? void 0 : _b.message;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "published", {
        get: function () {
            var _a;
            return ((_a = this.model.state) === null || _a === void 0 ? void 0 : _a.published) || false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "etag", {
        get: function () {
            return this.model.etag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "modelHash", {
        get: function () {
            return this.model.modelHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "tfliteModel", {
        get: function () {
            // Make a copy so people can't directly modify the private this.model object.
            return deep_copy_1.deepCopy(this.model.tfliteModel);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "locked", {
        /**
         * Locked indicates if there are active long running operations on the model.
         * Models may not be modified when they are locked.
         */
        get: function () {
            var _a, _b;
            return ((_b = (_a = this.model.activeOperations) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Model.prototype.toJSON = function () {
        // We can't just return this.model because it has extra fields and
        // different formats etc. So we build the expected model object.
        var jsonModel = {
            modelId: this.modelId,
            displayName: this.displayName,
            tags: this.tags,
            createTime: this.createTime,
            updateTime: this.updateTime,
            published: this.published,
            etag: this.etag,
            locked: this.locked,
        };
        // Also add possibly undefined fields if they exist.
        if (this.validationError) {
            jsonModel['validationError'] = this.validationError;
        }
        if (this.modelHash) {
            jsonModel['modelHash'] = this.modelHash;
        }
        if (this.tfliteModel) {
            jsonModel['tfliteModel'] = this.tfliteModel;
        }
        return jsonModel;
    };
    /**
     * Wait for the active operations on the model to complete.
     * @param maxTimeMillis The number of milliseconds to wait for the model to be unlocked. If unspecified,
     *     a default will be used.
     */
    Model.prototype.waitForUnlocked = function (maxTimeMillis) {
        var _this = this;
        var _a, _b;
        if (((_b = (_a = this.model.activeOperations) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
            // The client will always be defined on Models that have activeOperations
            // because models with active operations came back from the server and
            // were constructed with a non-empty client.
            return this.client.handleOperation(this.model.activeOperations[0], { wait: true, maxTimeMillis: maxTimeMillis })
                .then(function (modelResponse) {
                _this.model = Model.validateAndClone(modelResponse);
            });
        }
        return Promise.resolve();
    };
    Model.validateAndClone = function (model) {
        if (!validator.isNonNullObject(model) ||
            !validator.isNonEmptyString(model.name) ||
            !validator.isNonEmptyString(model.createTime) ||
            !validator.isNonEmptyString(model.updateTime) ||
            !validator.isNonEmptyString(model.displayName) ||
            !validator.isNonEmptyString(model.etag)) {
            throw new machine_learning_utils_1.FirebaseMachineLearningError('invalid-server-response', "Invalid Model response: " + JSON.stringify(model));
        }
        var tmpModel = deep_copy_1.deepCopy(model);
        // If tflite Model is specified, it must have a source consisting of
        // oneof {gcsTfliteUri, automlModel}
        if (model.tfliteModel &&
            !validator.isNonEmptyString(model.tfliteModel.gcsTfliteUri) &&
            !validator.isNonEmptyString(model.tfliteModel.automlModel)) {
            // If we have some other source, ignore the whole tfliteModel.
            delete tmpModel.tfliteModel;
        }
        // Remove '@type' field. We don't need it.
        if (tmpModel['@type']) {
            delete tmpModel['@type'];
        }
        return tmpModel;
    };
    return Model;
}());
exports.Model = Model;
function extractModelId(resourceName) {
    return resourceName.split('/').pop();
}

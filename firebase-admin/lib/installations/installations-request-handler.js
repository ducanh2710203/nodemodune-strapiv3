/*! firebase-admin v9.12.0 */
"use strict";
/*!
 * @license
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
exports.FirebaseInstallationsRequestHandler = void 0;
var error_1 = require("../utils/error");
var api_request_1 = require("../utils/api-request");
var utils = require("../utils/index");
var validator = require("../utils/validator");
/** Firebase IID backend host. */
var FIREBASE_IID_HOST = 'console.firebase.google.com';
/** Firebase IID backend path. */
var FIREBASE_IID_PATH = '/v1/';
/** Firebase IID request timeout duration in milliseconds. */
var FIREBASE_IID_TIMEOUT = 10000;
/** HTTP error codes raised by the backend server. */
var ERROR_CODES = {
    400: 'Malformed installation ID argument.',
    401: 'Request not authorized.',
    403: 'Project does not match installation ID or the client does not have sufficient privileges.',
    404: 'Failed to find the installation ID.',
    409: 'Already deleted.',
    429: 'Request throttled out by the backend server.',
    500: 'Internal server error.',
    503: 'Backend servers are over capacity. Try again later.',
};
/**
 * Class that provides mechanism to send requests to the FIS backend endpoints.
 */
var FirebaseInstallationsRequestHandler = /** @class */ (function () {
    /**
     * @param app The app used to fetch access tokens to sign API requests.
     *
     * @constructor
     */
    function FirebaseInstallationsRequestHandler(app) {
        this.app = app;
        this.host = FIREBASE_IID_HOST;
        this.timeout = FIREBASE_IID_TIMEOUT;
        this.httpClient = new api_request_1.AuthorizedHttpClient(app);
    }
    FirebaseInstallationsRequestHandler.prototype.deleteInstallation = function (fid) {
        if (!validator.isNonEmptyString(fid)) {
            return Promise.reject(new error_1.FirebaseInstallationsError(error_1.InstallationsClientErrorCode.INVALID_INSTALLATION_ID, 'Installation ID must be a non-empty string.'));
        }
        return this.invokeRequestHandler(new api_request_1.ApiSettings(fid, 'DELETE'));
    };
    /**
     * Invokes the request handler based on the API settings object passed.
     *
     * @param apiSettings The API endpoint settings to apply to request and response.
     * @return A promise that resolves when the request is complete.
     */
    FirebaseInstallationsRequestHandler.prototype.invokeRequestHandler = function (apiSettings) {
        var _this = this;
        return this.getPathPrefix()
            .then(function (path) {
            var req = {
                url: "https://" + _this.host + path + apiSettings.getEndpoint(),
                method: apiSettings.getHttpMethod(),
                timeout: _this.timeout,
            };
            return _this.httpClient.send(req);
        })
            .then(function () {
            // return nothing on success
        })
            .catch(function (err) {
            if (err instanceof api_request_1.HttpError) {
                var response = err.response;
                var errorMessage = (response.isJson() && 'error' in response.data) ?
                    response.data.error : response.text;
                var template = ERROR_CODES[response.status];
                var message = template ?
                    "Installation ID \"" + apiSettings.getEndpoint() + "\": " + template : errorMessage;
                throw new error_1.FirebaseInstallationsError(error_1.InstallationsClientErrorCode.API_ERROR, message);
            }
            // In case of timeouts and other network errors, the HttpClient returns a
            // FirebaseError wrapped in the response. Simply throw it here.
            throw err;
        });
    };
    FirebaseInstallationsRequestHandler.prototype.getPathPrefix = function () {
        var _this = this;
        if (this.path) {
            return Promise.resolve(this.path);
        }
        return utils.findProjectId(this.app)
            .then(function (projectId) {
            if (!validator.isNonEmptyString(projectId)) {
                // Assert for an explicit projct ID (either via AppOptions or the cert itself).
                throw new error_1.FirebaseInstallationsError(error_1.InstallationsClientErrorCode.INVALID_PROJECT_ID, 'Failed to determine project ID for Installations. Initialize the '
                    + 'SDK with service account credentials or set project ID as an app option. '
                    + 'Alternatively set the GOOGLE_CLOUD_PROJECT environment variable.');
            }
            _this.path = FIREBASE_IID_PATH + ("project/" + projectId + "/instanceId/");
            return _this.path;
        });
    };
    return FirebaseInstallationsRequestHandler;
}());
exports.FirebaseInstallationsRequestHandler = FirebaseInstallationsRequestHandler;

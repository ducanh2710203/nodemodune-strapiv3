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
exports.ProjectManagement = void 0;
var error_1 = require("../utils/error");
var utils = require("../utils/index");
var validator = require("../utils/validator");
var android_app_1 = require("./android-app");
var ios_app_1 = require("./ios-app");
var project_management_api_request_internal_1 = require("./project-management-api-request-internal");
var index_1 = require("./index");
var AppPlatform = index_1.projectManagement.AppPlatform;
/**
 * The Firebase ProjectManagement service interface.
 *
 * Do not call this constructor directly. Instead, use
 * [`admin.projectManagement()`](projectManagement#projectManagement).
 */
var ProjectManagement = /** @class */ (function () {
    /**
     * @param {object} app The app for this ProjectManagement service.
     * @constructor
     */
    function ProjectManagement(app) {
        this.app = app;
        if (!validator.isNonNullObject(app) || !('options' in app)) {
            throw new error_1.FirebaseProjectManagementError('invalid-argument', 'First argument passed to admin.projectManagement() must be a valid Firebase app '
                + 'instance.');
        }
        this.requestHandler = new project_management_api_request_internal_1.ProjectManagementRequestHandler(app);
    }
    /**
     * Lists up to 100 Firebase Android apps associated with this Firebase project.
     *
     * @return The list of Android apps.
     */
    ProjectManagement.prototype.listAndroidApps = function () {
        return this.listPlatformApps('android', 'listAndroidApps()');
    };
    /**
     * Lists up to 100 Firebase iOS apps associated with this Firebase project.
     *
     * @return The list of iOS apps.
     */
    ProjectManagement.prototype.listIosApps = function () {
        return this.listPlatformApps('ios', 'listIosApps()');
    };
    /**
     * Creates an `AndroidApp` object, referencing the specified Android app within
     * this Firebase project.
     *
     * This method does not perform an RPC.
     *
     * @param appId The `appId` of the Android app to reference.
     *
     * @return An `AndroidApp` object that references the specified Firebase Android app.
     */
    ProjectManagement.prototype.androidApp = function (appId) {
        return new android_app_1.AndroidApp(appId, this.requestHandler);
    };
    /**
     * Creates an `iOSApp` object, referencing the specified iOS app within
     * this Firebase project.
     *
     * This method does not perform an RPC.
     *
     * @param appId The `appId` of the iOS app to reference.
     *
     * @return An `iOSApp` object that references the specified Firebase iOS app.
     */
    ProjectManagement.prototype.iosApp = function (appId) {
        return new ios_app_1.IosApp(appId, this.requestHandler);
    };
    /**
     * Creates a `ShaCertificate` object.
     *
     * This method does not perform an RPC.
     *
     * @param shaHash The SHA-1 or SHA-256 hash for this certificate.
     *
     * @return A `ShaCertificate` object contains the specified SHA hash.
     */
    ProjectManagement.prototype.shaCertificate = function (shaHash) {
        return new android_app_1.ShaCertificate(shaHash);
    };
    /**
     * Creates a new Firebase Android app associated with this Firebase project.
     *
     * @param packageName The canonical package name of the Android App,
     *     as would appear in the Google Play Developer Console.
     * @param displayName An optional user-assigned display name for this
     *     new app.
     *
     * @return A promise that resolves to the newly created Android app.
     */
    ProjectManagement.prototype.createAndroidApp = function (packageName, displayName) {
        var _this = this;
        return this.getResourceName()
            .then(function (resourceName) {
            return _this.requestHandler.createAndroidApp(resourceName, packageName, displayName);
        })
            .then(function (responseData) {
            project_management_api_request_internal_1.assertServerResponse(validator.isNonNullObject(responseData), responseData, 'createAndroidApp()\'s responseData must be a non-null object.');
            project_management_api_request_internal_1.assertServerResponse(validator.isNonEmptyString(responseData.appId), responseData, '"responseData.appId" field must be present in createAndroidApp()\'s response data.');
            return new android_app_1.AndroidApp(responseData.appId, _this.requestHandler);
        });
    };
    /**
     * Creates a new Firebase iOS app associated with this Firebase project.
     *
     * @param bundleId The iOS app bundle ID to use for this new app.
     * @param displayName An optional user-assigned display name for this
     *     new app.
     *
     * @return A promise that resolves to the newly created iOS app.
     */
    ProjectManagement.prototype.createIosApp = function (bundleId, displayName) {
        var _this = this;
        return this.getResourceName()
            .then(function (resourceName) {
            return _this.requestHandler.createIosApp(resourceName, bundleId, displayName);
        })
            .then(function (responseData) {
            project_management_api_request_internal_1.assertServerResponse(validator.isNonNullObject(responseData), responseData, 'createIosApp()\'s responseData must be a non-null object.');
            project_management_api_request_internal_1.assertServerResponse(validator.isNonEmptyString(responseData.appId), responseData, '"responseData.appId" field must be present in createIosApp()\'s response data.');
            return new ios_app_1.IosApp(responseData.appId, _this.requestHandler);
        });
    };
    /**
     * Lists up to 100 Firebase apps associated with this Firebase project.
     *
     * @return A promise that resolves to the metadata list of the apps.
     */
    ProjectManagement.prototype.listAppMetadata = function () {
        var _this = this;
        return this.getResourceName()
            .then(function (resourceName) {
            return _this.requestHandler.listAppMetadata(resourceName);
        })
            .then(function (responseData) {
            return _this.getProjectId()
                .then(function (projectId) {
                return _this.transformResponseToAppMetadata(responseData, projectId);
            });
        });
    };
    /**
     * Update the display name of this Firebase project.
     *
     * @param newDisplayName The new display name to be updated.
     *
     * @return A promise that resolves when the project display name has been updated.
     */
    ProjectManagement.prototype.setDisplayName = function (newDisplayName) {
        var _this = this;
        return this.getResourceName()
            .then(function (resourceName) {
            return _this.requestHandler.setDisplayName(resourceName, newDisplayName);
        });
    };
    ProjectManagement.prototype.transformResponseToAppMetadata = function (responseData, projectId) {
        this.assertListAppsResponseData(responseData, 'listAppMetadata()');
        if (!responseData.apps) {
            return [];
        }
        return responseData.apps.map(function (appJson) {
            project_management_api_request_internal_1.assertServerResponse(validator.isNonEmptyString(appJson.appId), responseData, '"apps[].appId" field must be present in the listAppMetadata() response data.');
            project_management_api_request_internal_1.assertServerResponse(validator.isNonEmptyString(appJson.platform), responseData, '"apps[].platform" field must be present in the listAppMetadata() response data.');
            var metadata = {
                appId: appJson.appId,
                platform: AppPlatform[appJson.platform] || AppPlatform.PLATFORM_UNKNOWN,
                projectId: projectId,
                resourceName: appJson.name,
            };
            if (appJson.displayName) {
                metadata.displayName = appJson.displayName;
            }
            return metadata;
        });
    };
    ProjectManagement.prototype.getResourceName = function () {
        return this.getProjectId()
            .then(function (projectId) {
            return "projects/" + projectId;
        });
    };
    ProjectManagement.prototype.getProjectId = function () {
        var _this = this;
        if (this.projectId) {
            return Promise.resolve(this.projectId);
        }
        return utils.findProjectId(this.app)
            .then(function (projectId) {
            // Assert that a specific project ID was provided within the app.
            if (!validator.isNonEmptyString(projectId)) {
                throw new error_1.FirebaseProjectManagementError('invalid-project-id', 'Failed to determine project ID. Initialize the SDK with service account credentials, or '
                    + 'set project ID as an app option. Alternatively, set the GOOGLE_CLOUD_PROJECT '
                    + 'environment variable.');
            }
            _this.projectId = projectId;
            return _this.projectId;
        });
    };
    /**
     * Lists up to 100 Firebase apps for a specified platform, associated with this Firebase project.
     */
    ProjectManagement.prototype.listPlatformApps = function (platform, callerName) {
        var _this = this;
        return this.getResourceName()
            .then(function (resourceName) {
            return (platform === 'android') ?
                _this.requestHandler.listAndroidApps(resourceName)
                : _this.requestHandler.listIosApps(resourceName);
        })
            .then(function (responseData) {
            _this.assertListAppsResponseData(responseData, callerName);
            if (!responseData.apps) {
                return [];
            }
            return responseData.apps.map(function (appJson) {
                project_management_api_request_internal_1.assertServerResponse(validator.isNonEmptyString(appJson.appId), responseData, "\"apps[].appId\" field must be present in the " + callerName + " response data.");
                if (platform === 'android') {
                    return new android_app_1.AndroidApp(appJson.appId, _this.requestHandler);
                }
                else {
                    return new ios_app_1.IosApp(appJson.appId, _this.requestHandler);
                }
            });
        });
    };
    ProjectManagement.prototype.assertListAppsResponseData = function (responseData, callerName) {
        project_management_api_request_internal_1.assertServerResponse(validator.isNonNullObject(responseData), responseData, callerName + "'s responseData must be a non-null object.");
        if (responseData.apps) {
            project_management_api_request_internal_1.assertServerResponse(validator.isArray(responseData.apps), responseData, "\"apps\" field must be present in the " + callerName + " response data.");
        }
    };
    return ProjectManagement;
}());
exports.ProjectManagement = ProjectManagement;

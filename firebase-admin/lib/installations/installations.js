/*! firebase-admin v9.12.0 */
"use strict";
/*!
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
exports.Installations = void 0;
var error_1 = require("../utils/error");
var installations_request_handler_1 = require("./installations-request-handler");
var validator = require("../utils/validator");
/**
 * The `Installations` service for the current app.
 */
var Installations = /** @class */ (function () {
    /**
     * @param app The app for this Installations service.
     * @constructor
     */
    function Installations(app) {
        if (!validator.isNonNullObject(app) || !('options' in app)) {
            throw new error_1.FirebaseInstallationsError(error_1.InstallationsClientErrorCode.INVALID_ARGUMENT, 'First argument passed to admin.installations() must be a valid Firebase app instance.');
        }
        this.app_ = app;
        this.requestHandler = new installations_request_handler_1.FirebaseInstallationsRequestHandler(app);
    }
    /**
     * Deletes the specified installation ID and the associated data from Firebase.
     *
     * @param fid The Firebase installation ID to be deleted.
     *
     * @return A promise fulfilled when the installation ID is deleted.
     */
    Installations.prototype.deleteInstallation = function (fid) {
        return this.requestHandler.deleteInstallation(fid);
    };
    Object.defineProperty(Installations.prototype, "app", {
        /**
         * Returns the app associated with this Installations instance.
         *
         * @return The app associated with this Installations instance.
         */
        get: function () {
            return this.app_;
        },
        enumerable: false,
        configurable: true
    });
    return Installations;
}());
exports.Installations = Installations;

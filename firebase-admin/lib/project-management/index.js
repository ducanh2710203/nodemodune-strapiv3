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
exports.projectManagement = void 0;
/* eslint-disable @typescript-eslint/no-namespace */
var projectManagement;
(function (projectManagement) {
    /**
     * Platforms with which a Firebase App can be associated.
     */
    var AppPlatform;
    (function (AppPlatform) {
        /**
         * Unknown state. This is only used for distinguishing unset values.
         */
        AppPlatform["PLATFORM_UNKNOWN"] = "PLATFORM_UNKNOWN";
        /**
         * The Firebase App is associated with iOS.
         */
        AppPlatform["IOS"] = "IOS";
        /**
         * The Firebase App is associated with Android.
         */
        AppPlatform["ANDROID"] = "ANDROID";
    })(AppPlatform = projectManagement.AppPlatform || (projectManagement.AppPlatform = {}));
})(projectManagement = exports.projectManagement || (exports.projectManagement = {}));

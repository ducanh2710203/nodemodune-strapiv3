/*! firebase-admin v9.12.0 */
"use strict";
/*!
 * @license
 * Copyright 2017 Google Inc.
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
exports.transformMillisecondsToSecondsString = exports.generateUpdateMask = exports.formatString = exports.toWebSafeBase64 = exports.findProjectId = exports.getExplicitProjectId = exports.addReadonlyGetter = exports.renameProperties = exports.getSdkVersion = void 0;
var credential_internal_1 = require("../credential/credential-internal");
var validator = require("./validator");
var sdkVersion;
function getSdkVersion() {
    if (!sdkVersion) {
        var version = require('../../package.json').version; // eslint-disable-line @typescript-eslint/no-var-requires
        sdkVersion = version;
    }
    return sdkVersion;
}
exports.getSdkVersion = getSdkVersion;
/**
 * Renames properties on an object given a mapping from old to new property names.
 *
 * For example, this can be used to map underscore_cased properties to camelCase.
 *
 * @param {object} obj The object whose properties to rename.
 * @param {object} keyMap The mapping from old to new property names.
 */
function renameProperties(obj, keyMap) {
    Object.keys(keyMap).forEach(function (oldKey) {
        if (oldKey in obj) {
            var newKey = keyMap[oldKey];
            // The old key's value takes precedence over the new key's value.
            obj[newKey] = obj[oldKey];
            delete obj[oldKey];
        }
    });
}
exports.renameProperties = renameProperties;
/**
 * Defines a new read-only property directly on an object and returns the object.
 *
 * @param {object} obj The object on which to define the property.
 * @param {string} prop The name of the property to be defined or modified.
 * @param {any} value The value associated with the property.
 */
function addReadonlyGetter(obj, prop, value) {
    Object.defineProperty(obj, prop, {
        value: value,
        // Make this property read-only.
        writable: false,
        // Include this property during enumeration of obj's properties.
        enumerable: true,
    });
}
exports.addReadonlyGetter = addReadonlyGetter;
/**
 * Returns the Google Cloud project ID associated with a Firebase app, if it's explicitly
 * specified in either the Firebase app options, credentials or the local environment.
 * Otherwise returns null.
 *
 * @param app A Firebase app to get the project ID from.
 *
 * @return A project ID string or null.
 */
function getExplicitProjectId(app) {
    var options = app.options;
    if (validator.isNonEmptyString(options.projectId)) {
        return options.projectId;
    }
    var credential = app.options.credential;
    if (credential instanceof credential_internal_1.ServiceAccountCredential) {
        return credential.projectId;
    }
    var projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT;
    if (validator.isNonEmptyString(projectId)) {
        return projectId;
    }
    return null;
}
exports.getExplicitProjectId = getExplicitProjectId;
/**
 * Determines the Google Cloud project ID associated with a Firebase app. This method
 * first checks if a project ID is explicitly specified in either the Firebase app options,
 * credentials or the local environment in that order. If no explicit project ID is
 * configured, but the SDK has been initialized with ComputeEngineCredentials, this
 * method attempts to discover the project ID from the local metadata service.
 *
 * @param app A Firebase app to get the project ID from.
 *
 * @return A project ID string or null.
 */
function findProjectId(app) {
    var projectId = getExplicitProjectId(app);
    if (projectId) {
        return Promise.resolve(projectId);
    }
    var credential = app.options.credential;
    if (credential instanceof credential_internal_1.ComputeEngineCredential) {
        return credential.getProjectId();
    }
    return Promise.resolve(null);
}
exports.findProjectId = findProjectId;
/**
 * Encodes data using web-safe-base64.
 *
 * @param {Buffer} data The raw data byte input.
 * @return {string} The base64-encoded result.
 */
function toWebSafeBase64(data) {
    return data.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
}
exports.toWebSafeBase64 = toWebSafeBase64;
/**
 * Formats a string of form 'project/{projectId}/{api}' and replaces
 * with corresponding arguments {projectId: '1234', api: 'resource'}
 * and returns output: 'project/1234/resource'.
 *
 * @param {string} str The original string where the param need to be
 *     replaced.
 * @param {object=} params The optional parameters to replace in the
 *     string.
 * @return {string} The resulting formatted string.
 */
function formatString(str, params) {
    var formatted = str;
    Object.keys(params || {}).forEach(function (key) {
        formatted = formatted.replace(new RegExp('{' + key + '}', 'g'), params[key]);
    });
    return formatted;
}
exports.formatString = formatString;
/**
 * Generates the update mask for the provided object.
 * Note this will ignore the last key with value undefined.
 *
 * @param obj The object to generate the update mask for.
 * @param terminalPaths The optional map of keys for maximum paths to traverse.
 *      Nested objects beyond that path will be ignored. This is useful for
 *      keys with variable object values.
 * @param root The path so far.
 * @return The computed update mask list.
 */
function generateUpdateMask(obj, terminalPaths, root) {
    if (terminalPaths === void 0) { terminalPaths = []; }
    if (root === void 0) { root = ''; }
    var updateMask = [];
    if (!validator.isNonNullObject(obj)) {
        return updateMask;
    }
    var _loop_1 = function (key) {
        if (typeof obj[key] !== 'undefined') {
            var nextPath = root ? root + "." + key : key;
            // We hit maximum path.
            // Consider switching to Set<string> if the list grows too large.
            if (terminalPaths.indexOf(nextPath) !== -1) {
                // Add key and stop traversing this branch.
                updateMask.push(key);
            }
            else {
                var maskList = generateUpdateMask(obj[key], terminalPaths, nextPath);
                if (maskList.length > 0) {
                    maskList.forEach(function (mask) {
                        updateMask.push(key + "." + mask);
                    });
                }
                else {
                    updateMask.push(key);
                }
            }
        }
    };
    for (var key in obj) {
        _loop_1(key);
    }
    return updateMask;
}
exports.generateUpdateMask = generateUpdateMask;
/**
 * Transforms milliseconds to a protobuf Duration type string.
 * Returns the duration in seconds with up to nine fractional
 * digits, terminated by 's'. Example: "3 seconds 0 nano seconds as 3s,
 * 3 seconds 1 nano seconds as 3.000000001s".
 *
 * @param milliseconds The duration in milliseconds.
 * @returns The resulting formatted string in seconds with up to nine fractional
 * digits, terminated by 's'.
 */
function transformMillisecondsToSecondsString(milliseconds) {
    var duration;
    var seconds = Math.floor(milliseconds / 1000);
    var nanos = Math.floor((milliseconds - seconds * 1000) * 1000000);
    if (nanos > 0) {
        var nanoString = nanos.toString();
        while (nanoString.length < 9) {
            nanoString = '0' + nanoString;
        }
        duration = seconds + "." + nanoString + "s";
    }
    else {
        duration = seconds + "s";
    }
    return duration;
}
exports.transformMillisecondsToSecondsString = transformMillisecondsToSecondsString;

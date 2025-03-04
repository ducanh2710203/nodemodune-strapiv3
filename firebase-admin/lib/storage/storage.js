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
exports.Storage = void 0;
var error_1 = require("../utils/error");
var credential_internal_1 = require("../credential/credential-internal");
var utils = require("../utils/index");
var validator = require("../utils/validator");
/**
 * The default `Storage` service if no
 * app is provided or the `Storage` service associated with the provided
 * app.
 */
var Storage = /** @class */ (function () {
    /**
     * @param {FirebaseApp} app The app for this Storage service.
     * @constructor
     * @internal
     */
    function Storage(app) {
        if (!validator.isNonNullObject(app) || !('options' in app)) {
            throw new error_1.FirebaseError({
                code: 'storage/invalid-argument',
                message: 'First argument passed to admin.storage() must be a valid Firebase app instance.',
            });
        }
        if (!process.env.STORAGE_EMULATOR_HOST && process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
            var firebaseStorageEmulatorHost = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
            if (firebaseStorageEmulatorHost.match(/https?:\/\//)) {
                throw new error_1.FirebaseError({
                    code: 'storage/invalid-emulator-host',
                    message: 'FIREBASE_STORAGE_EMULATOR_HOST should not contain a protocol (http or https).',
                });
            }
            process.env.STORAGE_EMULATOR_HOST = "http://" + process.env.FIREBASE_STORAGE_EMULATOR_HOST;
        }
        var storage;
        try {
            storage = require('@google-cloud/storage').Storage;
        }
        catch (err) {
            throw new error_1.FirebaseError({
                code: 'storage/missing-dependencies',
                message: 'Failed to import the Cloud Storage client library for Node.js. '
                    + 'Make sure to install the "@google-cloud/storage" npm package. '
                    + ("Original error: " + err),
            });
        }
        var projectId = utils.getExplicitProjectId(app);
        var credential = app.options.credential;
        if (credential instanceof credential_internal_1.ServiceAccountCredential) {
            this.storageClient = new storage({
                // When the SDK is initialized with ServiceAccountCredentials an explicit projectId is
                // guaranteed to be available.
                projectId: projectId,
                credentials: {
                    private_key: credential.privateKey,
                    client_email: credential.clientEmail,
                },
            });
        }
        else if (credential_internal_1.isApplicationDefault(app.options.credential)) {
            // Try to use the Google application default credentials.
            this.storageClient = new storage();
        }
        else {
            throw new error_1.FirebaseError({
                code: 'storage/invalid-credential',
                message: 'Failed to initialize Google Cloud Storage client with the available credential. ' +
                    'Must initialize the SDK with a certificate credential or application default credentials ' +
                    'to use Cloud Storage API.',
            });
        }
        this.appInternal = app;
    }
    /**
     * @param name Optional name of the bucket to be retrieved. If name is not specified,
     * retrieves a reference to the default bucket.
     * @returns A [Bucket](https://cloud.google.com/nodejs/docs/reference/storage/latest/Bucket)
     * instance as defined in the `@google-cloud/storage` package.
     */
    Storage.prototype.bucket = function (name) {
        var bucketName = (typeof name !== 'undefined')
            ? name : this.appInternal.options.storageBucket;
        if (validator.isNonEmptyString(bucketName)) {
            return this.storageClient.bucket(bucketName);
        }
        throw new error_1.FirebaseError({
            code: 'storage/invalid-argument',
            message: 'Bucket name not specified or invalid. Specify a valid bucket name via the ' +
                'storageBucket option when initializing the app, or specify the bucket name ' +
                'explicitly when calling the getBucket() method.',
        });
    };
    Object.defineProperty(Storage.prototype, "app", {
        /**
         * @return The app associated with this Storage instance.
         */
        get: function () {
            return this.appInternal;
        },
        enumerable: false,
        configurable: true
    });
    return Storage;
}());
exports.Storage = Storage;

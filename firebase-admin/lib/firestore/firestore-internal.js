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
exports.getFirestoreOptions = exports.FirestoreService = void 0;
var error_1 = require("../utils/error");
var credential_internal_1 = require("../credential/credential-internal");
var validator = require("../utils/validator");
var utils = require("../utils/index");
var FirestoreService = /** @class */ (function () {
    function FirestoreService(app) {
        this.firestoreClient = initFirestore(app);
        this.appInternal = app;
    }
    Object.defineProperty(FirestoreService.prototype, "app", {
        /**
         * Returns the app associated with this Storage instance.
         *
         * @return {FirebaseApp} The app associated with this Storage instance.
         */
        get: function () {
            return this.appInternal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirestoreService.prototype, "client", {
        get: function () {
            return this.firestoreClient;
        },
        enumerable: false,
        configurable: true
    });
    return FirestoreService;
}());
exports.FirestoreService = FirestoreService;
function getFirestoreOptions(app) {
    if (!validator.isNonNullObject(app) || !('options' in app)) {
        throw new error_1.FirebaseFirestoreError({
            code: 'invalid-argument',
            message: 'First argument passed to admin.firestore() must be a valid Firebase app instance.',
        });
    }
    var projectId = utils.getExplicitProjectId(app);
    var credential = app.options.credential;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    var firebaseVersion = require('../../package.json').version;
    if (credential instanceof credential_internal_1.ServiceAccountCredential) {
        return {
            credentials: {
                private_key: credential.privateKey,
                client_email: credential.clientEmail,
            },
            // When the SDK is initialized with ServiceAccountCredentials an explicit projectId is
            // guaranteed to be available.
            projectId: projectId,
            firebaseVersion: firebaseVersion,
        };
    }
    else if (credential_internal_1.isApplicationDefault(app.options.credential)) {
        // Try to use the Google application default credentials.
        // If an explicit project ID is not available, let Firestore client discover one from the
        // environment. This prevents the users from having to set GOOGLE_CLOUD_PROJECT in GCP runtimes.
        return validator.isNonEmptyString(projectId) ? { projectId: projectId, firebaseVersion: firebaseVersion } : { firebaseVersion: firebaseVersion };
    }
    throw new error_1.FirebaseFirestoreError({
        code: 'invalid-credential',
        message: 'Failed to initialize Google Cloud Firestore client with the available credentials. ' +
            'Must initialize the SDK with a certificate credential or application default credentials ' +
            'to use Cloud Firestore API.',
    });
}
exports.getFirestoreOptions = getFirestoreOptions;
function initFirestore(app) {
    var options = getFirestoreOptions(app);
    var firestoreDatabase;
    try {
        // Lazy-load the Firestore implementation here, which in turns loads gRPC.
        firestoreDatabase = require('@google-cloud/firestore').Firestore;
    }
    catch (err) {
        throw new error_1.FirebaseFirestoreError({
            code: 'missing-dependencies',
            message: 'Failed to import the Cloud Firestore client library for Node.js. '
                + 'Make sure to install the "@google-cloud/firestore" npm package. '
                + ("Original error: " + err),
        });
    }
    return new firestoreDatabase(options);
}

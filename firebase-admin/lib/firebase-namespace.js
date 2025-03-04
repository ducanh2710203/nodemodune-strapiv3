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
exports.FirebaseNamespace = exports.FirebaseNamespaceInternals = exports.FIREBASE_CONFIG_VAR = void 0;
var fs = require("fs");
var error_1 = require("./utils/error");
var firebase_app_1 = require("./firebase-app");
var credential_1 = require("./credential/credential");
var credential_internal_1 = require("./credential/credential-internal");
var validator = require("./utils/validator");
var index_1 = require("./utils/index");
var DEFAULT_APP_NAME = '[DEFAULT]';
/**
 * Constant holding the environment variable name with the default config.
 * If the environment variable contains a string that starts with '{' it will be parsed as JSON,
 * otherwise it will be assumed to be pointing to a file.
 */
exports.FIREBASE_CONFIG_VAR = 'FIREBASE_CONFIG';
/**
 * Internals of a FirebaseNamespace instance.
 */
var FirebaseNamespaceInternals = /** @class */ (function () {
    function FirebaseNamespaceInternals(firebase_) {
        this.firebase_ = firebase_;
        this.apps_ = {};
    }
    /**
     * Initializes the App instance.
     *
     * @param options Optional options for the App instance. If none present will try to initialize
     *   from the FIREBASE_CONFIG environment variable. If the environment variable contains a string
     *   that starts with '{' it will be parsed as JSON, otherwise it will be assumed to be pointing
     *   to a file.
     * @param appName Optional name of the FirebaseApp instance.
     *
     * @return A new App instance.
     */
    FirebaseNamespaceInternals.prototype.initializeApp = function (options, appName) {
        if (appName === void 0) { appName = DEFAULT_APP_NAME; }
        if (typeof options === 'undefined') {
            options = this.loadOptionsFromEnvVar();
            options.credential = credential_internal_1.getApplicationDefault();
        }
        if (typeof appName !== 'string' || appName === '') {
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INVALID_APP_NAME, "Invalid Firebase app name \"" + appName + "\" provided. App name must be a non-empty string.");
        }
        else if (appName in this.apps_) {
            if (appName === DEFAULT_APP_NAME) {
                throw new error_1.FirebaseAppError(error_1.AppErrorCodes.DUPLICATE_APP, 'The default Firebase app already exists. This means you called initializeApp() ' +
                    'more than once without providing an app name as the second argument. In most cases ' +
                    'you only need to call initializeApp() once. But if you do want to initialize ' +
                    'multiple apps, pass a second argument to initializeApp() to give each app a unique ' +
                    'name.');
            }
            else {
                throw new error_1.FirebaseAppError(error_1.AppErrorCodes.DUPLICATE_APP, "Firebase app named \"" + appName + "\" already exists. This means you called initializeApp() " +
                    'more than once with the same app name as the second argument. Make sure you provide a ' +
                    'unique name every time you call initializeApp().');
            }
        }
        var app = new firebase_app_1.FirebaseApp(options, appName, this);
        this.apps_[appName] = app;
        return app;
    };
    /**
     * Returns the App instance with the provided name (or the default App instance
     * if no name is provided).
     *
     * @param appName Optional name of the FirebaseApp instance to return.
     * @return The App instance which has the provided name.
     */
    FirebaseNamespaceInternals.prototype.app = function (appName) {
        if (appName === void 0) { appName = DEFAULT_APP_NAME; }
        if (typeof appName !== 'string' || appName === '') {
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INVALID_APP_NAME, "Invalid Firebase app name \"" + appName + "\" provided. App name must be a non-empty string.");
        }
        else if (!(appName in this.apps_)) {
            var errorMessage = (appName === DEFAULT_APP_NAME)
                ? 'The default Firebase app does not exist. ' : "Firebase app named \"" + appName + "\" does not exist. ";
            errorMessage += 'Make sure you call initializeApp() before using any of the Firebase services.';
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.NO_APP, errorMessage);
        }
        return this.apps_[appName];
    };
    Object.defineProperty(FirebaseNamespaceInternals.prototype, "apps", {
        /*
         * Returns an array of all the non-deleted App instances.
         */
        get: function () {
            var _this = this;
            // Return a copy so the caller cannot mutate the array
            return Object.keys(this.apps_).map(function (appName) { return _this.apps_[appName]; });
        },
        enumerable: false,
        configurable: true
    });
    /*
     * Removes the specified App instance.
     */
    FirebaseNamespaceInternals.prototype.removeApp = function (appName) {
        if (typeof appName === 'undefined') {
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INVALID_APP_NAME, 'No Firebase app name provided. App name must be a non-empty string.');
        }
        var appToRemove = this.app(appName);
        delete this.apps_[appToRemove.name];
    };
    /**
     * Parse the file pointed to by the FIREBASE_CONFIG_VAR, if it exists.
     * Or if the FIREBASE_CONFIG_ENV contains a valid JSON object, parse it directly.
     * If the environment variable contains a string that starts with '{' it will be parsed as JSON,
     * otherwise it will be assumed to be pointing to a file.
     */
    FirebaseNamespaceInternals.prototype.loadOptionsFromEnvVar = function () {
        var config = process.env[exports.FIREBASE_CONFIG_VAR];
        if (!validator.isNonEmptyString(config)) {
            return {};
        }
        try {
            var contents = config.startsWith('{') ? config : fs.readFileSync(config, 'utf8');
            return JSON.parse(contents);
        }
        catch (error) {
            // Throw a nicely formed error message if the file contents cannot be parsed
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INVALID_APP_OPTIONS, 'Failed to parse app options file: ' + error);
        }
    };
    return FirebaseNamespaceInternals;
}());
exports.FirebaseNamespaceInternals = FirebaseNamespaceInternals;
var firebaseCredential = {
    cert: credential_1.cert, refreshToken: credential_1.refreshToken, applicationDefault: credential_1.applicationDefault
};
/**
 * Global Firebase context object.
 */
var FirebaseNamespace = /** @class */ (function () {
    /* tslint:enable */
    function FirebaseNamespace() {
        // Hack to prevent Babel from modifying the object returned as the default admin namespace.
        /* tslint:disable:variable-name */
        this.__esModule = true;
        /* tslint:enable:variable-name */
        this.credential = firebaseCredential;
        this.SDK_VERSION = index_1.getSdkVersion();
        /* tslint:disable */
        // TODO(jwenger): Database is the only consumer of firebase.Promise. We should update it to use
        // use the native Promise and then remove this.
        this.Promise = Promise;
        this.INTERNAL = new FirebaseNamespaceInternals(this);
    }
    Object.defineProperty(FirebaseNamespace.prototype, "auth", {
        /**
         * Gets the `Auth` service namespace. The returned namespace can be used to get the
         * `Auth` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).auth();
            };
            var auth = require('./auth/auth').Auth;
            return Object.assign(fn, { Auth: auth });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "database", {
        /**
         * Gets the `Database` service namespace. The returned namespace can be used to get the
         * `Database` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).database();
            };
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            return Object.assign(fn, require('@firebase/database-compat/standalone'));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "messaging", {
        /**
         * Gets the `Messaging` service namespace. The returned namespace can be used to get the
         * `Messaging` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).messaging();
            };
            var messaging = require('./messaging/messaging').Messaging;
            return Object.assign(fn, { Messaging: messaging });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "storage", {
        /**
         * Gets the `Storage` service namespace. The returned namespace can be used to get the
         * `Storage` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).storage();
            };
            var storage = require('./storage/storage').Storage;
            return Object.assign(fn, { Storage: storage });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "firestore", {
        /**
         * Gets the `Firestore` service namespace. The returned namespace can be used to get the
         * `Firestore` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).firestore();
            };
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            var firestore = require('@google-cloud/firestore');
            fn = Object.assign(fn, firestore.Firestore);
            // `v1beta1` and `v1` are lazy-loaded in the Firestore SDK. We use the same trick here
            // to avoid triggering this lazy-loading upon initialization.
            Object.defineProperty(fn, 'v1beta1', {
                get: function () {
                    return firestore.v1beta1;
                },
            });
            Object.defineProperty(fn, 'v1', {
                get: function () {
                    return firestore.v1;
                },
            });
            return fn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "machineLearning", {
        /**
         * Gets the `MachineLearning` service namespace. The returned namespace can be
         * used to get the `MachineLearning` service for the default app or an
         * explicityly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).machineLearning();
            };
            var machineLearning = require('./machine-learning/machine-learning').MachineLearning;
            return Object.assign(fn, { MachineLearning: machineLearning });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "installations", {
        /**
         * Gets the `Installations` service namespace. The returned namespace can be used to get the
         * `Installations` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).installations();
            };
            var installations = require('./installations/installations').Installations;
            return Object.assign(fn, { Installations: installations });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "instanceId", {
        /**
         * Gets the `InstanceId` service namespace. The returned namespace can be used to get the
         * `Instance` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).instanceId();
            };
            var instanceId = require('./instance-id/instance-id').InstanceId;
            return Object.assign(fn, { InstanceId: instanceId });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "projectManagement", {
        /**
         * Gets the `ProjectManagement` service namespace. The returned namespace can be used to get the
         * `ProjectManagement` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).projectManagement();
            };
            var projectManagement = require('./project-management/project-management').ProjectManagement;
            return Object.assign(fn, { ProjectManagement: projectManagement });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "securityRules", {
        /**
         * Gets the `SecurityRules` service namespace. The returned namespace can be used to get the
         * `SecurityRules` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).securityRules();
            };
            var securityRules = require('./security-rules/security-rules').SecurityRules;
            return Object.assign(fn, { SecurityRules: securityRules });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "remoteConfig", {
        /**
         * Gets the `RemoteConfig` service namespace. The returned namespace can be used to get the
         * `RemoteConfig` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).remoteConfig();
            };
            var remoteConfig = require('./remote-config/remote-config').RemoteConfig;
            return Object.assign(fn, { RemoteConfig: remoteConfig });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FirebaseNamespace.prototype, "appCheck", {
        /**
         * Gets the `AppCheck` service namespace. The returned namespace can be used to get the
         * `AppCheck` service for the default app or an explicitly specified app.
         */
        get: function () {
            var _this = this;
            var fn = function (app) {
                return _this.ensureApp(app).appCheck();
            };
            var appCheck = require('./app-check/app-check').AppCheck;
            return Object.assign(fn, { AppCheck: appCheck });
        },
        enumerable: false,
        configurable: true
    });
    // TODO: Change the return types to app.App in the following methods.
    /**
     * Initializes the FirebaseApp instance.
     *
     * @param options Optional options for the FirebaseApp instance.
     *   If none present will try to initialize from the FIREBASE_CONFIG environment variable.
     *   If the environment variable contains a string that starts with '{' it will be parsed as JSON,
     *   otherwise it will be assumed to be pointing to a file.
     * @param appName Optional name of the FirebaseApp instance.
     *
     * @return A new FirebaseApp instance.
     */
    FirebaseNamespace.prototype.initializeApp = function (options, appName) {
        return this.INTERNAL.initializeApp(options, appName);
    };
    /**
     * Returns the FirebaseApp instance with the provided name (or the default FirebaseApp instance
     * if no name is provided).
     *
     * @param appName Optional name of the FirebaseApp instance to return.
     * @return The FirebaseApp instance which has the provided name.
     */
    FirebaseNamespace.prototype.app = function (appName) {
        return this.INTERNAL.app(appName);
    };
    Object.defineProperty(FirebaseNamespace.prototype, "apps", {
        /*
         * Returns an array of all the non-deleted FirebaseApp instances.
         */
        get: function () {
            return this.INTERNAL.apps;
        },
        enumerable: false,
        configurable: true
    });
    FirebaseNamespace.prototype.ensureApp = function (app) {
        if (typeof app === 'undefined') {
            app = this.app();
        }
        return app;
    };
    return FirebaseNamespace;
}());
exports.FirebaseNamespace = FirebaseNamespace;

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
exports.database = void 0;
var standalone_1 = require("@firebase/database-compat/standalone");
var rtdb = require("@firebase/database-types");
/* eslint-disable @typescript-eslint/no-namespace */
var database;
(function (database) {
    database.enableLogging = rtdb.enableLogging;
    /**
     * [`ServerValue`](https://firebase.google.com/docs/reference/js/firebase.database.ServerValue)
     * module from the `@firebase/database` package.
     */
    database.ServerValue = standalone_1.ServerValue;
})(database = exports.database || (exports.database = {}));

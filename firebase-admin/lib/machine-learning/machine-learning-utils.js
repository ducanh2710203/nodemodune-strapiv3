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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseMachineLearningError = void 0;
var error_1 = require("../utils/error");
var FirebaseMachineLearningError = /** @class */ (function (_super) {
    __extends(FirebaseMachineLearningError, _super);
    function FirebaseMachineLearningError(code, message) {
        return _super.call(this, 'machine-learning', code, message) || this;
    }
    FirebaseMachineLearningError.fromOperationError = function (code, message) {
        switch (code) {
            case 1: return new FirebaseMachineLearningError('cancelled', message);
            case 2: return new FirebaseMachineLearningError('unknown-error', message);
            case 3: return new FirebaseMachineLearningError('invalid-argument', message);
            case 4: return new FirebaseMachineLearningError('deadline-exceeded', message);
            case 5: return new FirebaseMachineLearningError('not-found', message);
            case 6: return new FirebaseMachineLearningError('already-exists', message);
            case 7: return new FirebaseMachineLearningError('permission-denied', message);
            case 8: return new FirebaseMachineLearningError('resource-exhausted', message);
            case 9: return new FirebaseMachineLearningError('failed-precondition', message);
            case 10: return new FirebaseMachineLearningError('aborted', message);
            case 11: return new FirebaseMachineLearningError('out-of-range', message);
            case 13: return new FirebaseMachineLearningError('internal-error', message);
            case 14: return new FirebaseMachineLearningError('service-unavailable', message);
            case 15: return new FirebaseMachineLearningError('data-loss', message);
            case 16: return new FirebaseMachineLearningError('unauthenticated', message);
            default:
                return new FirebaseMachineLearningError('unknown-error', message);
        }
    };
    return FirebaseMachineLearningError;
}(error_1.PrefixedFirebaseError));
exports.FirebaseMachineLearningError = FirebaseMachineLearningError;

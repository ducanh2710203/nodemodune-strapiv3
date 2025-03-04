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
exports.AppCheck = void 0;
var app_check_api_client_internal_1 = require("./app-check-api-client-internal");
var token_generator_1 = require("./token-generator");
var token_verifier_1 = require("./token-verifier");
var crypto_signer_1 = require("../utils/crypto-signer");
/**
 * AppCheck service bound to the provided app.
 */
var AppCheck = /** @class */ (function () {
    /**
     * @param app The app for this AppCheck service.
     * @constructor
     */
    function AppCheck(app) {
        this.app = app;
        this.client = new app_check_api_client_internal_1.AppCheckApiClient(app);
        try {
            this.tokenGenerator = new token_generator_1.AppCheckTokenGenerator(crypto_signer_1.cryptoSignerFromApp(app));
        }
        catch (err) {
            throw token_generator_1.appCheckErrorFromCryptoSignerError(err);
        }
        this.appCheckTokenVerifier = new token_verifier_1.AppCheckTokenVerifier(app);
    }
    /**
     * Creates a new {@link appCheck.AppCheckToken `AppCheckToken`} that can be sent
     * back to a client.
     *
     * @param appId The app ID to use as the JWT app_id.
     * @param options Optional options object when creating a new App Check Token.
     *
     * @returns A promise that fulfills with a `AppCheckToken`.
     */
    AppCheck.prototype.createToken = function (appId, options) {
        var _this = this;
        return this.tokenGenerator.createCustomToken(appId, options)
            .then(function (customToken) {
            return _this.client.exchangeToken(customToken, appId);
        });
    };
    /**
     * Verifies an App Check token.
     *
     * @param appCheckToken The App Check token to verify.
     *
     * @return A promise that fulfills with a `VerifyAppCheckTokenResponse` on successful
     *     verification.
     */
    AppCheck.prototype.verifyToken = function (appCheckToken) {
        return this.appCheckTokenVerifier.verifyToken(appCheckToken)
            .then(function (decodedToken) {
            return {
                appId: decodedToken.app_id,
                token: decodedToken,
            };
        });
    };
    return AppCheck;
}());
exports.AppCheck = AppCheck;

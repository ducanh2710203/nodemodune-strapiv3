/*! firebase-admin v9.12.0 */
"use strict";
/*!
 * Copyright 2019 Google Inc.
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
exports.BatchRequestClient = void 0;
var api_request_1 = require("../utils/api-request");
var error_1 = require("../utils/error");
var PART_BOUNDARY = '__END_OF_PART__';
var TEN_SECONDS_IN_MILLIS = 10000;
/**
 * An HTTP client that can be used to make batch requests. This client is not tied to any service
 * (FCM or otherwise). Therefore it can be used to make batch requests to any service that allows
 * it. If this requirement ever arises we can move this implementation to the utils module
 * where it can be easily shared among other modules.
 */
var BatchRequestClient = /** @class */ (function () {
    /**
     * @param {HttpClient} httpClient The client that will be used to make HTTP calls.
     * @param {string} batchUrl The URL that accepts batch requests.
     * @param {object=} commonHeaders Optional headers that will be included in all requests.
     *
     * @constructor
     */
    function BatchRequestClient(httpClient, batchUrl, commonHeaders) {
        this.httpClient = httpClient;
        this.batchUrl = batchUrl;
        this.commonHeaders = commonHeaders;
    }
    /**
     * Sends the given array of sub requests as a single batch, and parses the results into an array
     * of HttpResponse objects.
     *
     * @param {SubRequest[]} requests An array of sub requests to send.
     * @return {Promise<HttpResponse[]>} A promise that resolves when the send operation is complete.
     */
    BatchRequestClient.prototype.send = function (requests) {
        var _this = this;
        requests = requests.map(function (req) {
            req.headers = Object.assign({}, _this.commonHeaders, req.headers);
            return req;
        });
        var requestHeaders = {
            'Content-Type': "multipart/mixed; boundary=" + PART_BOUNDARY,
        };
        var request = {
            method: 'POST',
            url: this.batchUrl,
            data: this.getMultipartPayload(requests),
            headers: Object.assign({}, this.commonHeaders, requestHeaders),
            timeout: TEN_SECONDS_IN_MILLIS,
        };
        return this.httpClient.send(request).then(function (response) {
            if (!response.multipart) {
                throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INTERNAL_ERROR, 'Expected a multipart response.');
            }
            return response.multipart.map(function (buff) {
                return api_request_1.parseHttpResponse(buff, request);
            });
        });
    };
    BatchRequestClient.prototype.getMultipartPayload = function (requests) {
        var buffer = '';
        requests.forEach(function (request, idx) {
            buffer += createPart(request, PART_BOUNDARY, idx);
        });
        buffer += "--" + PART_BOUNDARY + "--\r\n";
        return Buffer.from(buffer, 'utf-8');
    };
    return BatchRequestClient;
}());
exports.BatchRequestClient = BatchRequestClient;
/**
 * Creates a single part in a multipart HTTP request body. The part consists of several headers
 * followed by the serialized sub request as the body. As per the requirements of the FCM batch
 * API, sets the content-type header to application/http, and the content-transfer-encoding to
 * binary.
 *
 * @param {SubRequest} request A sub request that will be used to populate the part.
 * @param {string} boundary Multipart boundary string.
 * @param {number} idx An index number that is used to set the content-id header.
 * @return {string} The part as a string that can be included in the HTTP body.
 */
function createPart(request, boundary, idx) {
    var serializedRequest = serializeSubRequest(request);
    var part = "--" + boundary + "\r\n";
    part += "Content-Length: " + serializedRequest.length + "\r\n";
    part += 'Content-Type: application/http\r\n';
    part += "content-id: " + (idx + 1) + "\r\n";
    part += 'content-transfer-encoding: binary\r\n';
    part += '\r\n';
    part += serializedRequest + "\r\n";
    return part;
}
/**
 * Serializes a sub request into a string that can be embedded in a multipart HTTP request. The
 * format of the string is the wire format of a typical HTTP request, consisting of a header and a
 * body.
 *
 * @param request {SubRequest} The sub request to be serialized.
 * @return {string} String representation of the SubRequest.
 */
function serializeSubRequest(request) {
    var requestBody = JSON.stringify(request.body);
    var messagePayload = "POST " + request.url + " HTTP/1.1\r\n";
    messagePayload += "Content-Length: " + requestBody.length + "\r\n";
    messagePayload += 'Content-Type: application/json; charset=UTF-8\r\n';
    if (request.headers) {
        Object.keys(request.headers).forEach(function (key) {
            messagePayload += key + ": " + request.headers[key] + "\r\n";
        });
    }
    messagePayload += '\r\n';
    messagePayload += requestBody;
    return messagePayload;
}

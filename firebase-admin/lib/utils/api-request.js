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
exports.ExponentialBackoffPoller = exports.ApiSettings = exports.AuthorizedHttpClient = exports.parseHttpResponse = exports.HttpClient = exports.defaultRetryConfig = exports.HttpError = void 0;
var error_1 = require("./error");
var validator = require("./validator");
var http = require("http");
var https = require("https");
var url = require("url");
var events_1 = require("events");
var DefaultHttpResponse = /** @class */ (function () {
    /**
     * Constructs a new HttpResponse from the given LowLevelResponse.
     */
    function DefaultHttpResponse(resp) {
        this.status = resp.status;
        this.headers = resp.headers;
        this.text = resp.data;
        try {
            if (!resp.data) {
                throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INTERNAL_ERROR, 'HTTP response missing data.');
            }
            this.parsedData = JSON.parse(resp.data);
        }
        catch (err) {
            this.parsedData = undefined;
            this.parseError = err;
        }
        this.request = resp.config.method + " " + resp.config.url;
    }
    Object.defineProperty(DefaultHttpResponse.prototype, "data", {
        get: function () {
            if (this.isJson()) {
                return this.parsedData;
            }
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.UNABLE_TO_PARSE_RESPONSE, "Error while parsing response data: \"" + this.parseError.toString() + "\". Raw server " +
                ("response: \"" + this.text + "\". Status code: \"" + this.status + "\". Outgoing ") +
                ("request: \"" + this.request + ".\""));
        },
        enumerable: false,
        configurable: true
    });
    DefaultHttpResponse.prototype.isJson = function () {
        return typeof this.parsedData !== 'undefined';
    };
    return DefaultHttpResponse;
}());
/**
 * Represents a multipart HTTP response. Parts that constitute the response body can be accessed
 * via the multipart getter. Getters for text and data throw errors.
 */
var MultipartHttpResponse = /** @class */ (function () {
    function MultipartHttpResponse(resp) {
        this.status = resp.status;
        this.headers = resp.headers;
        this.multipart = resp.multipart;
    }
    Object.defineProperty(MultipartHttpResponse.prototype, "text", {
        get: function () {
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.UNABLE_TO_PARSE_RESPONSE, 'Unable to parse multipart payload as text');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultipartHttpResponse.prototype, "data", {
        get: function () {
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.UNABLE_TO_PARSE_RESPONSE, 'Unable to parse multipart payload as JSON');
        },
        enumerable: false,
        configurable: true
    });
    MultipartHttpResponse.prototype.isJson = function () {
        return false;
    };
    return MultipartHttpResponse;
}());
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(response) {
        var _this = _super.call(this, "Server responded with status " + response.status + ".") || this;
        _this.response = response;
        // Set the prototype so that instanceof checks will work correctly.
        // See: https://github.com/Microsoft/TypeScript/issues/13965
        Object.setPrototypeOf(_this, HttpError.prototype);
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
/**
 * Default retry configuration for HTTP requests. Retries up to 4 times on connection reset and timeout errors
 * as well as HTTP 503 errors. Exposed as a function to ensure that every HttpClient gets its own RetryConfig
 * instance.
 */
function defaultRetryConfig() {
    return {
        maxRetries: 4,
        statusCodes: [503],
        ioErrorCodes: ['ECONNRESET', 'ETIMEDOUT'],
        backOffFactor: 0.5,
        maxDelayInMillis: 60 * 1000,
    };
}
exports.defaultRetryConfig = defaultRetryConfig;
/**
 * Ensures that the given RetryConfig object is valid.
 *
 * @param retry The configuration to be validated.
 */
function validateRetryConfig(retry) {
    if (!validator.isNumber(retry.maxRetries) || retry.maxRetries < 0) {
        throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INVALID_ARGUMENT, 'maxRetries must be a non-negative integer');
    }
    if (typeof retry.backOffFactor !== 'undefined') {
        if (!validator.isNumber(retry.backOffFactor) || retry.backOffFactor < 0) {
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INVALID_ARGUMENT, 'backOffFactor must be a non-negative number');
        }
    }
    if (!validator.isNumber(retry.maxDelayInMillis) || retry.maxDelayInMillis < 0) {
        throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INVALID_ARGUMENT, 'maxDelayInMillis must be a non-negative integer');
    }
    if (typeof retry.statusCodes !== 'undefined' && !validator.isArray(retry.statusCodes)) {
        throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INVALID_ARGUMENT, 'statusCodes must be an array');
    }
    if (typeof retry.ioErrorCodes !== 'undefined' && !validator.isArray(retry.ioErrorCodes)) {
        throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INVALID_ARGUMENT, 'ioErrorCodes must be an array');
    }
}
var HttpClient = /** @class */ (function () {
    function HttpClient(retry) {
        if (retry === void 0) { retry = defaultRetryConfig(); }
        this.retry = retry;
        if (this.retry) {
            validateRetryConfig(this.retry);
        }
    }
    /**
     * Sends an HTTP request to a remote server. If the server responds with a successful response (2xx), the returned
     * promise resolves with an HttpResponse. If the server responds with an error (3xx, 4xx, 5xx), the promise rejects
     * with an HttpError. In case of all other errors, the promise rejects with a FirebaseAppError. If a request fails
     * due to a low-level network error, transparently retries the request once before rejecting the promise.
     *
     * If the request data is specified as an object, it will be serialized into a JSON string. The application/json
     * content-type header will also be automatically set in this case. For all other payload types, the content-type
     * header should be explicitly set by the caller. To send a JSON leaf value (e.g. "foo", 5), parse it into JSON,
     * and pass as a string or a Buffer along with the appropriate content-type header.
     *
     * @param {HttpRequest} config HTTP request to be sent.
     * @return {Promise<HttpResponse>} A promise that resolves with the response details.
     */
    HttpClient.prototype.send = function (config) {
        return this.sendWithRetry(config);
    };
    /**
     * Sends an HTTP request. In the event of an error, retries the HTTP request according to the
     * RetryConfig set on the HttpClient.
     *
     * @param {HttpRequestConfig} config HTTP request to be sent.
     * @param {number} retryAttempts Number of retries performed up to now.
     * @return {Promise<HttpResponse>} A promise that resolves with the response details.
     */
    HttpClient.prototype.sendWithRetry = function (config, retryAttempts) {
        var _this = this;
        if (retryAttempts === void 0) { retryAttempts = 0; }
        return AsyncHttpCall.invoke(config)
            .then(function (resp) {
            return _this.createHttpResponse(resp);
        })
            .catch(function (err) {
            var _a = _this.getRetryDelayMillis(retryAttempts, err), delayMillis = _a[0], canRetry = _a[1];
            if (canRetry && _this.retry && delayMillis <= _this.retry.maxDelayInMillis) {
                return _this.waitForRetry(delayMillis).then(function () {
                    return _this.sendWithRetry(config, retryAttempts + 1);
                });
            }
            if (err.response) {
                throw new HttpError(_this.createHttpResponse(err.response));
            }
            if (err.code === 'ETIMEDOUT') {
                throw new error_1.FirebaseAppError(error_1.AppErrorCodes.NETWORK_TIMEOUT, "Error while making request: " + err.message + ".");
            }
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.NETWORK_ERROR, "Error while making request: " + err.message + ". Error code: " + err.code);
        });
    };
    HttpClient.prototype.createHttpResponse = function (resp) {
        if (resp.multipart) {
            return new MultipartHttpResponse(resp);
        }
        return new DefaultHttpResponse(resp);
    };
    HttpClient.prototype.waitForRetry = function (delayMillis) {
        if (delayMillis > 0) {
            return new Promise(function (resolve) {
                setTimeout(resolve, delayMillis);
            });
        }
        return Promise.resolve();
    };
    /**
     * Checks if a failed request is eligible for a retry, and if so returns the duration to wait before initiating
     * the retry.
     *
     * @param {number} retryAttempts Number of retries completed up to now.
     * @param {LowLevelError} err The last encountered error.
     * @returns {[number, boolean]} A 2-tuple where the 1st element is the duration to wait before another retry, and the
     *     2nd element is a boolean indicating whether the request is eligible for a retry or not.
     */
    HttpClient.prototype.getRetryDelayMillis = function (retryAttempts, err) {
        if (!this.isRetryEligible(retryAttempts, err)) {
            return [0, false];
        }
        var response = err.response;
        if (response && response.headers['retry-after']) {
            var delayMillis = this.parseRetryAfterIntoMillis(response.headers['retry-after']);
            if (delayMillis > 0) {
                return [delayMillis, true];
            }
        }
        return [this.backOffDelayMillis(retryAttempts), true];
    };
    HttpClient.prototype.isRetryEligible = function (retryAttempts, err) {
        if (!this.retry) {
            return false;
        }
        if (retryAttempts >= this.retry.maxRetries) {
            return false;
        }
        if (err.response) {
            var statusCodes = this.retry.statusCodes || [];
            return statusCodes.indexOf(err.response.status) !== -1;
        }
        if (err.code) {
            var retryCodes = this.retry.ioErrorCodes || [];
            return retryCodes.indexOf(err.code) !== -1;
        }
        return false;
    };
    /**
     * Parses the Retry-After HTTP header as a milliseconds value. Return value is negative if the Retry-After header
     * contains an expired timestamp or otherwise malformed.
     */
    HttpClient.prototype.parseRetryAfterIntoMillis = function (retryAfter) {
        var delaySeconds = parseInt(retryAfter, 10);
        if (!isNaN(delaySeconds)) {
            return delaySeconds * 1000;
        }
        var date = new Date(retryAfter);
        if (!isNaN(date.getTime())) {
            return date.getTime() - Date.now();
        }
        return -1;
    };
    HttpClient.prototype.backOffDelayMillis = function (retryAttempts) {
        if (retryAttempts === 0) {
            return 0;
        }
        if (!this.retry) {
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INTERNAL_ERROR, 'Expected this.retry to exist.');
        }
        var backOffFactor = this.retry.backOffFactor || 0;
        var delayInSeconds = (Math.pow(2, retryAttempts)) * backOffFactor;
        return Math.min(delayInSeconds * 1000, this.retry.maxDelayInMillis);
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
/**
 * Parses a full HTTP response message containing both a header and a body.
 *
 * @param {string|Buffer} response The HTTP response to be parsed.
 * @param {HttpRequestConfig} config The request configuration that resulted in the HTTP response.
 * @return {HttpResponse} An object containing the parsed HTTP status, headers and the body.
 */
function parseHttpResponse(response, config) {
    var responseText = validator.isBuffer(response) ?
        response.toString('utf-8') : response;
    var endOfHeaderPos = responseText.indexOf('\r\n\r\n');
    var headerLines = responseText.substring(0, endOfHeaderPos).split('\r\n');
    var statusLine = headerLines[0];
    var status = statusLine.trim().split(/\s/)[1];
    var headers = {};
    headerLines.slice(1).forEach(function (line) {
        var colonPos = line.indexOf(':');
        var name = line.substring(0, colonPos).trim().toLowerCase();
        var value = line.substring(colonPos + 1).trim();
        headers[name] = value;
    });
    var data = responseText.substring(endOfHeaderPos + 4);
    if (data.endsWith('\n')) {
        data = data.slice(0, -1);
    }
    if (data.endsWith('\r')) {
        data = data.slice(0, -1);
    }
    var lowLevelResponse = {
        status: parseInt(status, 10),
        headers: headers,
        data: data,
        config: config,
        request: null,
    };
    if (!validator.isNumber(lowLevelResponse.status)) {
        throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INTERNAL_ERROR, 'Malformed HTTP status line.');
    }
    return new DefaultHttpResponse(lowLevelResponse);
}
exports.parseHttpResponse = parseHttpResponse;
/**
 * A helper class for sending HTTP requests over the wire. This is a wrapper around the standard
 * http and https packages of Node.js, providing content processing, timeouts and error handling.
 * It also wraps the callback API of the Node.js standard library in a more flexible Promise API.
 */
var AsyncHttpCall = /** @class */ (function () {
    function AsyncHttpCall(config) {
        var _this = this;
        try {
            this.config = new HttpRequestConfigImpl(config);
            this.options = this.config.buildRequestOptions();
            this.entity = this.config.buildEntity(this.options.headers);
            this.promise = new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
                _this.execute();
            });
        }
        catch (err) {
            this.promise = Promise.reject(this.enhanceError(err, null));
        }
    }
    /**
     * Sends an HTTP request based on the provided configuration.
     */
    AsyncHttpCall.invoke = function (config) {
        return new AsyncHttpCall(config).promise;
    };
    AsyncHttpCall.prototype.execute = function () {
        var _this = this;
        var transport = this.options.protocol === 'https:' ? https : http;
        var req = transport.request(this.options, function (res) {
            _this.handleResponse(res, req);
        });
        // Handle errors
        req.on('error', function (err) {
            if (req.aborted) {
                return;
            }
            _this.enhanceAndReject(err, null, req);
        });
        var timeout = this.config.timeout;
        var timeoutCallback = function () {
            req.abort();
            _this.rejectWithError("timeout of " + timeout + "ms exceeded", 'ETIMEDOUT', req);
        };
        if (timeout) {
            // Listen to timeouts and throw an error.
            req.setTimeout(timeout, timeoutCallback);
            req.on('socket', function (socket) {
                socket.setTimeout(timeout, timeoutCallback);
            });
        }
        // Send the request
        req.end(this.entity);
    };
    AsyncHttpCall.prototype.handleResponse = function (res, req) {
        if (req.aborted) {
            return;
        }
        if (!res.statusCode) {
            throw new error_1.FirebaseAppError(error_1.AppErrorCodes.INTERNAL_ERROR, 'Expected a statusCode on the response from a ClientRequest');
        }
        var response = {
            status: res.statusCode,
            headers: res.headers,
            request: req,
            data: undefined,
            config: this.config,
        };
        var boundary = this.getMultipartBoundary(res.headers);
        var respStream = this.uncompressResponse(res);
        if (boundary) {
            this.handleMultipartResponse(response, respStream, boundary);
        }
        else {
            this.handleRegularResponse(response, respStream);
        }
    };
    /**
     * Extracts multipart boundary from the HTTP header. The content-type header of a multipart
     * response has the form 'multipart/subtype; boundary=string'.
     *
     * If the content-type header does not exist, or does not start with
     * 'multipart/', then null will be returned.
     */
    AsyncHttpCall.prototype.getMultipartBoundary = function (headers) {
        var contentType = headers['content-type'];
        if (!contentType || !contentType.startsWith('multipart/')) {
            return null;
        }
        var segments = contentType.split(';');
        var emptyObject = {};
        var headerParams = segments.slice(1)
            .map(function (segment) { return segment.trim().split('='); })
            .reduce(function (curr, params) {
            // Parse key=value pairs in the content-type header into properties of an object.
            if (params.length === 2) {
                var keyValuePair = {};
                keyValuePair[params[0]] = params[1];
                return Object.assign(curr, keyValuePair);
            }
            return curr;
        }, emptyObject);
        return headerParams.boundary;
    };
    AsyncHttpCall.prototype.uncompressResponse = function (res) {
        // Uncompress the response body transparently if required.
        var respStream = res;
        var encodings = ['gzip', 'compress', 'deflate'];
        if (res.headers['content-encoding'] && encodings.indexOf(res.headers['content-encoding']) !== -1) {
            // Add the unzipper to the body stream processing pipeline.
            var zlib = require('zlib'); // eslint-disable-line @typescript-eslint/no-var-requires
            respStream = respStream.pipe(zlib.createUnzip());
            // Remove the content-encoding in order to not confuse downstream operations.
            delete res.headers['content-encoding'];
        }
        return respStream;
    };
    AsyncHttpCall.prototype.handleMultipartResponse = function (response, respStream, boundary) {
        var _this = this;
        var dicer = require('dicer'); // eslint-disable-line @typescript-eslint/no-var-requires
        var multipartParser = new dicer({ boundary: boundary });
        var responseBuffer = [];
        multipartParser.on('part', function (part) {
            var tempBuffers = [];
            part.on('data', function (partData) {
                tempBuffers.push(partData);
            });
            part.on('end', function () {
                responseBuffer.push(Buffer.concat(tempBuffers));
            });
        });
        multipartParser.on('finish', function () {
            response.data = undefined;
            response.multipart = responseBuffer;
            _this.finalizeResponse(response);
        });
        respStream.pipe(multipartParser);
    };
    AsyncHttpCall.prototype.handleRegularResponse = function (response, respStream) {
        var _this = this;
        var responseBuffer = [];
        respStream.on('data', function (chunk) {
            responseBuffer.push(chunk);
        });
        respStream.on('error', function (err) {
            var req = response.request;
            if (req && req.aborted) {
                return;
            }
            _this.enhanceAndReject(err, null, req);
        });
        respStream.on('end', function () {
            response.data = Buffer.concat(responseBuffer).toString();
            _this.finalizeResponse(response);
        });
    };
    /**
     * Finalizes the current HTTP call in-flight by either resolving or rejecting the associated
     * promise. In the event of an error, adds additional useful information to the returned error.
     */
    AsyncHttpCall.prototype.finalizeResponse = function (response) {
        if (response.status >= 200 && response.status < 300) {
            this.resolve(response);
        }
        else {
            this.rejectWithError('Request failed with status code ' + response.status, null, response.request, response);
        }
    };
    /**
     * Creates a new error from the given message, and enhances it with other information available.
     * Then the promise associated with this HTTP call is rejected with the resulting error.
     */
    AsyncHttpCall.prototype.rejectWithError = function (message, code, request, response) {
        var error = new Error(message);
        this.enhanceAndReject(error, code, request, response);
    };
    AsyncHttpCall.prototype.enhanceAndReject = function (error, code, request, response) {
        this.reject(this.enhanceError(error, code, request, response));
    };
    /**
     * Enhances the given error by adding more information to it. Specifically, the HttpRequestConfig,
     * the underlying request and response will be attached to the error.
     */
    AsyncHttpCall.prototype.enhanceError = function (error, code, request, response) {
        error.config = this.config;
        if (code) {
            error.code = code;
        }
        error.request = request;
        error.response = response;
        return error;
    };
    return AsyncHttpCall;
}());
/**
 * An adapter class for extracting options and entity data from an HttpRequestConfig.
 */
var HttpRequestConfigImpl = /** @class */ (function () {
    function HttpRequestConfigImpl(config) {
        this.config = config;
    }
    Object.defineProperty(HttpRequestConfigImpl.prototype, "method", {
        get: function () {
            return this.config.method;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequestConfigImpl.prototype, "url", {
        get: function () {
            return this.config.url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequestConfigImpl.prototype, "headers", {
        get: function () {
            return this.config.headers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequestConfigImpl.prototype, "data", {
        get: function () {
            return this.config.data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequestConfigImpl.prototype, "timeout", {
        get: function () {
            return this.config.timeout;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpRequestConfigImpl.prototype, "httpAgent", {
        get: function () {
            return this.config.httpAgent;
        },
        enumerable: false,
        configurable: true
    });
    HttpRequestConfigImpl.prototype.buildRequestOptions = function () {
        var parsed = this.buildUrl();
        var protocol = parsed.protocol;
        var port = parsed.port;
        if (!port) {
            var isHttps = protocol === 'https:';
            port = isHttps ? '443' : '80';
        }
        return {
            protocol: protocol,
            hostname: parsed.hostname,
            port: port,
            path: parsed.path,
            method: this.method,
            agent: this.httpAgent,
            headers: Object.assign({}, this.headers),
        };
    };
    HttpRequestConfigImpl.prototype.buildEntity = function (headers) {
        var data;
        if (!this.hasEntity() || !this.isEntityEnclosingRequest()) {
            return data;
        }
        if (validator.isBuffer(this.data)) {
            data = this.data;
        }
        else if (validator.isObject(this.data)) {
            data = Buffer.from(JSON.stringify(this.data), 'utf-8');
            if (typeof headers['content-type'] === 'undefined') {
                headers['content-type'] = 'application/json;charset=utf-8';
            }
        }
        else if (validator.isString(this.data)) {
            data = Buffer.from(this.data, 'utf-8');
        }
        else {
            throw new Error('Request data must be a string, a Buffer or a json serializable object');
        }
        // Add Content-Length header if data exists.
        headers['Content-Length'] = data.length.toString();
        return data;
    };
    HttpRequestConfigImpl.prototype.buildUrl = function () {
        var fullUrl = this.urlWithProtocol();
        if (!this.hasEntity() || this.isEntityEnclosingRequest()) {
            return url.parse(fullUrl);
        }
        if (!validator.isObject(this.data)) {
            throw new Error(this.method + " requests cannot have a body");
        }
        // Parse URL and append data to query string.
        var parsedUrl = new url.URL(fullUrl);
        var dataObj = this.data;
        for (var key in dataObj) {
            if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
                parsedUrl.searchParams.append(key, dataObj[key]);
            }
        }
        return url.parse(parsedUrl.toString());
    };
    HttpRequestConfigImpl.prototype.urlWithProtocol = function () {
        var fullUrl = this.url;
        if (fullUrl.startsWith('http://') || fullUrl.startsWith('https://')) {
            return fullUrl;
        }
        return "https://" + fullUrl;
    };
    HttpRequestConfigImpl.prototype.hasEntity = function () {
        return !!this.data;
    };
    HttpRequestConfigImpl.prototype.isEntityEnclosingRequest = function () {
        // GET and HEAD requests do not support entity (body) in request.
        return this.method !== 'GET' && this.method !== 'HEAD';
    };
    return HttpRequestConfigImpl;
}());
var AuthorizedHttpClient = /** @class */ (function (_super) {
    __extends(AuthorizedHttpClient, _super);
    function AuthorizedHttpClient(app) {
        var _this = _super.call(this) || this;
        _this.app = app;
        return _this;
    }
    AuthorizedHttpClient.prototype.send = function (request) {
        var _this = this;
        return this.getToken().then(function (token) {
            var requestCopy = Object.assign({}, request);
            requestCopy.headers = Object.assign({}, request.headers);
            var authHeader = 'Authorization';
            requestCopy.headers[authHeader] = "Bearer " + token;
            if (!requestCopy.httpAgent && _this.app.options.httpAgent) {
                requestCopy.httpAgent = _this.app.options.httpAgent;
            }
            return _super.prototype.send.call(_this, requestCopy);
        });
    };
    AuthorizedHttpClient.prototype.getToken = function () {
        return this.app.INTERNAL.getToken()
            .then(function (accessTokenObj) {
            return accessTokenObj.accessToken;
        });
    };
    return AuthorizedHttpClient;
}(HttpClient));
exports.AuthorizedHttpClient = AuthorizedHttpClient;
/**
 * Class that defines all the settings for the backend API endpoint.
 *
 * @param {string} endpoint The Firebase Auth backend endpoint.
 * @param {HttpMethod} httpMethod The http method for that endpoint.
 * @constructor
 */
var ApiSettings = /** @class */ (function () {
    function ApiSettings(endpoint, httpMethod) {
        if (httpMethod === void 0) { httpMethod = 'POST'; }
        this.endpoint = endpoint;
        this.httpMethod = httpMethod;
        this.setRequestValidator(null)
            .setResponseValidator(null);
    }
    /** @return {string} The backend API endpoint. */
    ApiSettings.prototype.getEndpoint = function () {
        return this.endpoint;
    };
    /** @return {HttpMethod} The request HTTP method. */
    ApiSettings.prototype.getHttpMethod = function () {
        return this.httpMethod;
    };
    /**
     * @param {ApiCallbackFunction} requestValidator The request validator.
     * @return {ApiSettings} The current API settings instance.
     */
    ApiSettings.prototype.setRequestValidator = function (requestValidator) {
        var nullFunction = function () { return undefined; };
        this.requestValidator = requestValidator || nullFunction;
        return this;
    };
    /** @return {ApiCallbackFunction} The request validator. */
    ApiSettings.prototype.getRequestValidator = function () {
        return this.requestValidator;
    };
    /**
     * @param {ApiCallbackFunction} responseValidator The response validator.
     * @return {ApiSettings} The current API settings instance.
     */
    ApiSettings.prototype.setResponseValidator = function (responseValidator) {
        var nullFunction = function () { return undefined; };
        this.responseValidator = responseValidator || nullFunction;
        return this;
    };
    /** @return {ApiCallbackFunction} The response validator. */
    ApiSettings.prototype.getResponseValidator = function () {
        return this.responseValidator;
    };
    return ApiSettings;
}());
exports.ApiSettings = ApiSettings;
/**
 * Class used for polling an endpoint with exponential backoff.
 *
 * Example usage:
 * ```
 * const poller = new ExponentialBackoffPoller();
 * poller
 *     .poll(() => {
 *       return myRequestToPoll()
 *           .then((responseData: any) => {
 *             if (!isValid(responseData)) {
 *               // Continue polling.
 *               return null;
 *             }
 *
 *             // Polling complete. Resolve promise with final response data.
 *             return responseData;
 *           });
 *     })
 *     .then((responseData: any) => {
 *       console.log(`Final response: ${responseData}`);
 *     });
 * ```
 */
var ExponentialBackoffPoller = /** @class */ (function (_super) {
    __extends(ExponentialBackoffPoller, _super);
    function ExponentialBackoffPoller(initialPollingDelayMillis, maxPollingDelayMillis, masterTimeoutMillis) {
        if (initialPollingDelayMillis === void 0) { initialPollingDelayMillis = 1000; }
        if (maxPollingDelayMillis === void 0) { maxPollingDelayMillis = 10000; }
        if (masterTimeoutMillis === void 0) { masterTimeoutMillis = 60000; }
        var _this = _super.call(this) || this;
        _this.initialPollingDelayMillis = initialPollingDelayMillis;
        _this.maxPollingDelayMillis = maxPollingDelayMillis;
        _this.masterTimeoutMillis = masterTimeoutMillis;
        _this.numTries = 0;
        _this.completed = false;
        return _this;
    }
    /**
     * Poll the provided callback with exponential backoff.
     *
     * @param {() => Promise<T>} callback The callback to be called for each poll. If the
     *     callback resolves to a falsey value, polling will continue. Otherwise, the truthy
     *     resolution will be used to resolve the promise returned by this method.
     * @return {Promise<T>} A Promise which resolves to the truthy value returned by the provided
     *     callback when polling is complete.
     */
    ExponentialBackoffPoller.prototype.poll = function (callback) {
        var _this = this;
        if (this.pollCallback) {
            throw new Error('poll() can only be called once per instance of ExponentialBackoffPoller');
        }
        this.pollCallback = callback;
        this.on('poll', this.repoll);
        this.masterTimer = setTimeout(function () {
            if (_this.completed) {
                return;
            }
            _this.markCompleted();
            _this.reject(new Error('ExponentialBackoffPoller deadline exceeded - Master timeout reached'));
        }, this.masterTimeoutMillis);
        return new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
            _this.repoll();
        });
    };
    ExponentialBackoffPoller.prototype.repoll = function () {
        var _this = this;
        this.pollCallback()
            .then(function (result) {
            if (_this.completed) {
                return;
            }
            if (!result) {
                _this.repollTimer =
                    setTimeout(function () { return _this.emit('poll'); }, _this.getPollingDelayMillis());
                _this.numTries++;
                return;
            }
            _this.markCompleted();
            _this.resolve(result);
        })
            .catch(function (err) {
            if (_this.completed) {
                return;
            }
            _this.markCompleted();
            _this.reject(err);
        });
    };
    ExponentialBackoffPoller.prototype.getPollingDelayMillis = function () {
        var increasedPollingDelay = Math.pow(2, this.numTries) * this.initialPollingDelayMillis;
        return Math.min(increasedPollingDelay, this.maxPollingDelayMillis);
    };
    ExponentialBackoffPoller.prototype.markCompleted = function () {
        this.completed = true;
        if (this.masterTimer) {
            clearTimeout(this.masterTimer);
        }
        if (this.repollTimer) {
            clearTimeout(this.repollTimer);
        }
    };
    return ExponentialBackoffPoller;
}(events_1.EventEmitter));
exports.ExponentialBackoffPoller = ExponentialBackoffPoller;

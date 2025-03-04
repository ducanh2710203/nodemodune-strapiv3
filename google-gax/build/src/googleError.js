"use strict";
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleErrorDecoder = exports.GoogleError = void 0;
const status_1 = require("./status");
const protobuf = require("protobufjs");
class GoogleError extends Error {
    // Parse details field in google.rpc.status wire over gRPC medatadata.
    // Promote google.rpc.ErrorInfo if exist.
    static parseGRPCStatusDetails(err) {
        const decoder = new GoogleErrorDecoder();
        try {
            if (err.metadata && err.metadata.get('grpc-status-details-bin')) {
                const statusDetailsObj = decoder.decodeGRPCStatusDetails(err.metadata.get('grpc-status-details-bin'));
                if (statusDetailsObj &&
                    statusDetailsObj.details &&
                    statusDetailsObj.details.length > 0) {
                    err.statusDetails = statusDetailsObj.details;
                }
                if (statusDetailsObj && statusDetailsObj.errorInfo) {
                    err.reason = statusDetailsObj.errorInfo.reason;
                    err.domain = statusDetailsObj.errorInfo.domain;
                    err.errorInfoMetadata = statusDetailsObj.errorInfo.metadata;
                }
            }
        }
        catch (decodeErr) {
            // ignoring the error
        }
        return err;
    }
    // Parse http JSON error and promote google.rpc.ErrorInfo if exist.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static parseHttpError(json) {
        const error = Object.assign(new GoogleError(json['error']['message']), json.error);
        // Map Http Status Code to gRPC Status Code
        if (json['error']['code']) {
            error.code = status_1.rpcCodeFromHttpStatusCode(json['error']['code']);
        }
        // Keep consistency with gRPC statusDetails fields. gRPC details has been occupied before.
        // Rename "detials" to "statusDetails".
        error.statusDetails = json['error']['details'];
        delete error.details;
        // Promote the ErrorInfo fields as error's top-level.
        const errorInfo = !json['error']['details']
            ? undefined
            : json['error']['details'].find((item) => item['@type'] === 'type.googleapis.com/google.rpc.ErrorInfo');
        if (errorInfo) {
            error.reason = errorInfo.reason;
            error.domain = errorInfo.domain;
            // error.metadata has been occupied for gRPC metadata, so we use
            // errorInfoMetadat to represent ErrorInfo' metadata field. Keep
            // consistency with gRPC ErrorInfo metadata field name.
            error.errorInfoMetadata = errorInfo.metadata;
        }
        return error;
    }
}
exports.GoogleError = GoogleError;
class GoogleErrorDecoder {
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const errorProtoJson = require('../../protos/status.json');
        this.root = protobuf.Root.fromJSON(errorProtoJson);
        this.anyType = this.root.lookupType('google.protobuf.Any');
        this.statusType = this.root.lookupType('google.rpc.Status');
    }
    decodeProtobufAny(anyValue) {
        const match = anyValue.type_url.match(/^type.googleapis.com\/(.*)/);
        if (!match) {
            throw new Error(`Unknown type encoded in google.protobuf.any: ${anyValue.type_url}`);
        }
        const typeName = match[1];
        const type = this.root.lookupType(typeName);
        if (!type) {
            throw new Error(`Cannot lookup type ${typeName}`);
        }
        return type.decode(anyValue.value);
    }
    // Decodes gRPC-fallback error which is an instance of google.rpc.Status.
    decodeRpcStatus(buffer) {
        const uint8array = new Uint8Array(buffer);
        const status = this.statusType.decode(uint8array);
        // google.rpc.Status contains an array of google.protobuf.Any
        // which need a special treatment
        const details = [];
        let errorInfo;
        for (const detail of status.details) {
            try {
                const decodedDetail = this.decodeProtobufAny(detail);
                details.push(decodedDetail);
                if (detail.type_url === 'type.googleapis.com/google.rpc.ErrorInfo') {
                    errorInfo = decodedDetail;
                }
            }
            catch (err) {
                // cannot decode detail, likely because of the unknown type - just skip it
            }
        }
        const result = {
            code: status.code,
            message: status.message,
            statusDetails: details,
            reason: errorInfo === null || errorInfo === void 0 ? void 0 : errorInfo.reason,
            domain: errorInfo === null || errorInfo === void 0 ? void 0 : errorInfo.domain,
            errorInfoMetadata: errorInfo === null || errorInfo === void 0 ? void 0 : errorInfo.metadata,
        };
        return result;
    }
    // Construct an Error from a StatusObject.
    // Adapted from https://github.com/grpc/grpc-node/blob/main/packages/grpc-js/src/call.ts#L79
    callErrorFromStatus(status) {
        status.message = `${status.code} ${status_1.Status[status.code]}: ${status.message}`;
        return Object.assign(new GoogleError(status.message), status);
    }
    // Decodes gRPC-fallback error which is an instance of google.rpc.Status,
    // and puts it into the object similar to gRPC ServiceError object.
    decodeErrorFromBuffer(buffer) {
        return this.callErrorFromStatus(this.decodeRpcStatus(buffer));
    }
    // Decodes gRPC metadata error details which is an instance of google.rpc.Status.
    decodeGRPCStatusDetails(bufferArr) {
        const details = [];
        let errorInfo;
        bufferArr.forEach(buffer => {
            const uint8array = new Uint8Array(buffer);
            const rpcStatus = this.statusType.decode(uint8array);
            for (const detail of rpcStatus.details) {
                try {
                    const decodedDetail = this.decodeProtobufAny(detail);
                    details.push(decodedDetail);
                    if (detail.type_url === 'type.googleapis.com/google.rpc.ErrorInfo') {
                        errorInfo = decodedDetail;
                    }
                }
                catch (err) {
                    // cannot decode detail, likely because of the unknown type - just skip it
                }
            }
        });
        const result = {
            details,
            errorInfo,
        };
        return result;
    }
}
exports.GoogleErrorDecoder = GoogleErrorDecoder;
//# sourceMappingURL=googleError.js.map
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
import { JSONObject, JSONValue } from 'proto3-json-serializer';
import { Field } from 'protobufjs';
import { google } from '../protos/http';
export interface TranscodedRequest {
    httpMethod: 'get' | 'post' | 'put' | 'patch' | 'delete';
    url: string;
    queryString: string;
    data: string | {};
}
declare const httpOptionName = "(google.api.http)";
declare type allowedOptions = '(google.api.method_signature)';
export declare type ParsedOptionsType = Array<{
    [httpOptionName]?: google.api.IHttpRule;
} & {
    [option in allowedOptions]?: {} | string | number;
}>;
export declare function getField(request: JSONObject, field: string): JSONValue | undefined;
export declare function deepCopy(request: JSONObject): JSONObject;
export declare function deleteField(request: JSONObject, field: string): void;
export declare function buildQueryStringComponents(request: JSONObject, prefix?: string): string[];
export declare function encodeWithSlashes(str: string): string;
export declare function encodeWithoutSlashes(str: string): string;
export declare function applyPattern(pattern: string, fieldValue: string): string | undefined;
interface MatchResult {
    matchedFields: string[];
    url: string;
}
export declare function match(request: JSONObject, pattern: string): MatchResult | undefined;
export declare function flattenObject(request: JSONObject): JSONObject;
export declare function requestChangeCaseAndCleanup(request: JSONObject, caseChangeFunc: (key: string) => string): JSONObject;
export declare function isProto3OptionalField(field: Field): any;
export declare function isRequiredField(field: Field): boolean | undefined;
export declare function getFieldNameOnBehavior(fields: {
    [k: string]: Field;
} | undefined): {
    requiredFields: Set<string>;
    optionalFields: Set<string>;
};
export declare function transcode(request: JSONObject, parsedOptions: ParsedOptionsType, requestFields?: {
    [k: string]: Field;
}): TranscodedRequest | undefined;
export {};

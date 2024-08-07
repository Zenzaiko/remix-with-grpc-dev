// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file chat.proto (package chat, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * @generated from message chat.Req
 */
export class Req extends Message<Req> {
  /**
   * @generated from field: string user_name = 1;
   */
  userName = "";

  /**
   * @generated from field: string channel = 2;
   */
  channel = "";

  constructor(data?: PartialMessage<Req>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chat.Req";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Req {
    return new Req().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Req {
    return new Req().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Req {
    return new Req().fromJsonString(jsonString, options);
  }

  static equals(a: Req | PlainMessage<Req> | undefined, b: Req | PlainMessage<Req> | undefined): boolean {
    return proto3.util.equals(Req, a, b);
  }
}

/**
 * @generated from message chat.Msg
 */
export class Msg extends Message<Msg> {
  /**
   * @generated from field: string user_name = 1;
   */
  userName = "";

  /**
   * @generated from field: string content = 2;
   */
  content = "";

  /**
   * @generated from field: string channel = 3;
   */
  channel = "";

  /**
   * @generated from field: int64 timestamp = 4;
   */
  timestamp = protoInt64.zero;

  constructor(data?: PartialMessage<Msg>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chat.Msg";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "channel", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "timestamp", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Msg {
    return new Msg().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Msg {
    return new Msg().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Msg {
    return new Msg().fromJsonString(jsonString, options);
  }

  static equals(a: Msg | PlainMessage<Msg> | undefined, b: Msg | PlainMessage<Msg> | undefined): boolean {
    return proto3.util.equals(Msg, a, b);
  }
}

/**
 * @generated from message chat.Empty
 */
export class Empty extends Message<Empty> {
  constructor(data?: PartialMessage<Empty>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "chat.Empty";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Empty {
    return new Empty().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Empty {
    return new Empty().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Empty {
    return new Empty().fromJsonString(jsonString, options);
  }

  static equals(a: Empty | PlainMessage<Empty> | undefined, b: Empty | PlainMessage<Empty> | undefined): boolean {
    return proto3.util.equals(Empty, a, b);
  }
}


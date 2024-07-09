// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file greeting.proto (package greeting, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message greeting.Person
 */
export class Person extends Message<Person> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  constructor(data?: PartialMessage<Person>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "greeting.Person";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Person {
    return new Person().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Person {
    return new Person().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Person {
    return new Person().fromJsonString(jsonString, options);
  }

  static equals(a: Person | PlainMessage<Person> | undefined, b: Person | PlainMessage<Person> | undefined): boolean {
    return proto3.util.equals(Person, a, b);
  }
}

/**
 * @generated from message greeting.GreetingMessage
 */
export class GreetingMessage extends Message<GreetingMessage> {
  /**
   * @generated from field: string text = 1;
   */
  text = "";

  constructor(data?: PartialMessage<GreetingMessage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "greeting.GreetingMessage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GreetingMessage {
    return new GreetingMessage().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GreetingMessage {
    return new GreetingMessage().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GreetingMessage {
    return new GreetingMessage().fromJsonString(jsonString, options);
  }

  static equals(a: GreetingMessage | PlainMessage<GreetingMessage> | undefined, b: GreetingMessage | PlainMessage<GreetingMessage> | undefined): boolean {
    return proto3.util.equals(GreetingMessage, a, b);
  }
}


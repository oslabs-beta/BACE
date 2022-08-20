import * as Types from '../typebox';
export declare enum ValueErrorType {
    Array = 0,
    ArrayMinItems = 1,
    ArrayMaxItems = 2,
    ArrayUniqueItems = 3,
    Boolean = 4,
    Function = 5,
    Integer = 6,
    IntegerMultipleOf = 7,
    IntegerExclusiveMinimum = 8,
    IntegerExclusiveMaximum = 9,
    IntegerMinimum = 10,
    IntegerMaximum = 11,
    Literal = 12,
    Null = 13,
    Number = 14,
    NumberMultipleOf = 15,
    NumberExclusiveMinimum = 16,
    NumberExclusiveMaximum = 17,
    NumberMinumum = 18,
    NumberMaximum = 19,
    Object = 20,
    ObjectMinProperties = 21,
    ObjectMaxProperties = 22,
    ObjectAdditionalProperties = 23,
    Promise = 24,
    RecordKeyNumeric = 25,
    RecordKeyString = 26,
    String = 27,
    StringMinLength = 28,
    StringMaxLength = 29,
    StringPattern = 30,
    TupleZeroLength = 31,
    TupleLength = 32,
    Undefined = 33,
    Union = 34,
    Uint8Array = 35,
    Uint8ArrayMinByteLength = 36,
    Uint8ArrayMaxByteLength = 37,
    Void = 38
}
export interface ValueError {
    type: ValueErrorType;
    schema: Types.TSchema;
    path: string;
    value: unknown;
    message: string;
}
export declare class ValueErrorsUnknownTypeError extends Error {
    readonly schema: Types.TSchema;
    constructor(schema: Types.TSchema);
}
export declare namespace ValueErrors {
    function Errors<T extends Types.TSchema>(schema: T, references: Types.TSchema[], value: any): IterableIterator<ValueError>;
}

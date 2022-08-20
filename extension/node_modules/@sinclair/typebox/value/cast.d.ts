import * as Types from '../typebox';
export declare class ValueCastUnknownTypeError extends Error {
    readonly schema: Types.TSchema;
    constructor(schema: Types.TSchema);
}
export declare namespace ValueCast {
    function Visit(schema: Types.TSchema, references: Types.TSchema[], value: any): any;
    function Cast<T extends Types.TSchema, R extends Types.TSchema[]>(schema: T, references: [...R], value: any): Types.Static<T>;
}

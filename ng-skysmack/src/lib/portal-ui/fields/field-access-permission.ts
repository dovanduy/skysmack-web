/**
 * Skysmack API
 * Official API documentation for Skysmack
 *
 * OpenAPI spec version: 1.0.0
 * Contact: hej@itinstituttet.dk
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface FieldAccessPermission {
    access?: FieldAccessPermission.AccessEnum;
    includeRoles?: boolean;
    roles?: Array<number>;
    eTag?: string;
}
export namespace FieldAccessPermission {
    export type AccessEnum = 'none' | 'both' | 'authenticated' | 'anonymous';
    export const AccessEnum = {
        None: 'none' as AccessEnum,
        Both: 'both' as AccessEnum,
        Authenticated: 'authenticated' as AccessEnum,
        Anonymous: 'anonymous' as AccessEnum
    }
}

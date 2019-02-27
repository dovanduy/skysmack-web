export class FieldAccessPermission {
    access?: AccessTypes;
    includeRoles?: boolean;
    roles?: Array<number>;
    eTag?: string;
    constructor(values: Partial<FieldAccessPermission>) {
        Object.assign(this, values)
    }
}
export enum AccessTypes {
    none,
    both,
    authenticated,
    anonymous
}

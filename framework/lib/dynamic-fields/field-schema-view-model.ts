import { FieldValidator } from './field-validatior';
import { FieldAccessPermission } from './field-access-permission';
import { Identifiable } from '../models/identifiable';

export class FieldSchemaViewModel extends Identifiable<string> {
    public get identifier(): string {
        return this.key;
    }
    public set identifier(v: string) {
        this.key = v;
    }

    key: string;
    type: string;
    order?: number;
    validators?: Array<FieldValidator>;
    display?: string;
    readPermission?: FieldAccessPermission;
    writePermission?: FieldAccessPermission;
}

import { FieldValidator } from './field-validatior';
import { FieldAccessPermission } from './field-access-permission';

export class FieldSchemaViewModel {
    key: string;
    type: string;
    order?: number;
    validators?: Array<FieldValidator>;
    display?: string;
    readPermission?: FieldAccessPermission;
    writePermission?: FieldAccessPermission;
}

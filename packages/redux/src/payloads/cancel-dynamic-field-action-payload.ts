import { LocalObject } from '@skysmack/framework';
import { PackagePathPayload } from './package-path-payload';

export interface CancelDynamicFieldActionPayload<FieldSchemaViewModel> extends PackagePathPayload {
    field: LocalObject<FieldSchemaViewModel, string>;
    packagePath: string;
    prefix: string;
}
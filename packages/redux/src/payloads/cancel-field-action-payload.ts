import { LocalObject } from '@skysmack/framework';
import { PackagePathPayload } from './package-path-payload';

export interface CancelFieldActionPayload<FieldSchemaViewModel> extends PackagePathPayload {
    field: LocalObject<FieldSchemaViewModel, string>;
    packagePath: string;
}
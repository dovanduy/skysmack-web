import { LocalObject } from '@skysmack/framework';
import { PackagePathPayload } from './package-path-payload';

export interface CancelFieldActionPayload<FieldSchemaViewModel> extends PackagePathPayload {
    record: LocalObject<FieldSchemaViewModel, string>;
    packagePath: string;
}
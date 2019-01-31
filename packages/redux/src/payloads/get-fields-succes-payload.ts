import { PackagePathPayload } from './package-path-payload';
import { FieldSchemaViewModel } from '@skysmack/framework';

export interface GetFieldsSuccessPayload extends PackagePathPayload {
    value: FieldSchemaViewModel[];
}

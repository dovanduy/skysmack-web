import { PackagePathPayload } from './package-path-payload';
import { FieldSchemaViewModel } from '@skysmack/framework';

export interface GetSingleFieldSuccessPayload extends PackagePathPayload {
    value: FieldSchemaViewModel;
}

import { FieldValueProviderViewModel } from '@skysmack/framework';
import { PackagePathPayload } from './package-path-payload';

export interface GetAvailableFieldsSuccessPayload extends PackagePathPayload {
    availableFields: FieldValueProviderViewModel[];
}

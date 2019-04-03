import { FieldsConfig } from './fields-config';
import { Field } from '@skysmack/ng-ui';

export class AddField extends Field {

    public fieldsConfig: FieldsConfig<any, any, any>;

    constructor(values: Partial<AddField>) {
        super(values);
        Object.assign(this, values);
    }
}

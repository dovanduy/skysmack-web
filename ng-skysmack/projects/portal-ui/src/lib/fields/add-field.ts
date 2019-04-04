import { FieldsConfig } from './fields-config';
import { Field } from '@skysmack/ng-ui';
import { NgRecordStore } from '@skysmack/ng-redux';
import { RecordActionsBase } from '@skysmack/redux';

export class AddField extends Field {

    public fieldsConfig: FieldsConfig<any, any, any>;
    public actions: RecordActionsBase<any, any>;
    public store: NgRecordStore<any, any, any>;
    public dynamicFields: boolean;
    public titleTranslationString: string;

    constructor(values: Partial<AddField>) {
        super(values);
        Object.assign(this, values);
    }
}

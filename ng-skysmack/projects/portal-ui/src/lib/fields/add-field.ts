import { Field } from '@skysmack/ng-ui';
import { NgRecordStore } from '@skysmack/ng-redux';
import { RecordActionsBase } from '@skysmack/redux';
import { EntityFieldsConfig } from './entity-fields-config';

export class AddField extends Field {
    public fieldsConfig: EntityFieldsConfig<any, any>;
    public actions: RecordActionsBase<any, any>;
    public store: NgRecordStore<any, any, any>;
    public packagePath: string;

    constructor(values: Partial<AddField>) {
        super(values);
        Object.assign(this, values);
    }
}

import { Field } from '@skysmack/ng-dynamic-forms';
import { NgRecordStore } from '@skysmack/ng-framework';
import { RecordActionsBase } from '@skysmack/redux';
import { EntityFieldsConfig } from './entity-fields-config';

export class AddField extends Field {
    public fieldsConfig: EntityFieldsConfig<any, any>;
    public actions: RecordActionsBase<any, any>;
    public store: NgRecordStore<any, any, any>;
    public packagePath: string;
    public displaySelector: string;
    public addTitle: string;

    constructor(values: Partial<AddField>) {
        super(values);
        Object.assign(this, values);
    }
}

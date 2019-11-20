import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TemplatesAppState, Template, TEMPLATES_ADDITIONAL_PATHS, TEMPLATES_REDUX_KEY } from '@skysmack/packages-templates';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgTemplatesActions extends RecordActionsBase<TemplatesAppState, NgRedux<TemplatesAppState>> {
    constructor(protected store: NgRedux<TemplatesAppState>) { super(store, TEMPLATES_REDUX_KEY, TEMPLATES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Template, number>): StrIndex<string> {
        return {
            title: record.object.title
        };
    }
}

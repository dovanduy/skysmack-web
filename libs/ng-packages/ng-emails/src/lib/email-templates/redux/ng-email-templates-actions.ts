import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { EmailTemplatesAppState, EmailTemplate, EMAIL_TEMPLATES_REDUX_KEY, EMAIL_TEMPLATES_ADDITIONAL_PATHS } from '@skysmack/packages-emails';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgEmailTemplatesActions extends RecordActionsBase<EmailTemplatesAppState, NgRedux<EmailTemplatesAppState>> {
    constructor(protected store: NgRedux<EmailTemplatesAppState>) { super(store, EMAIL_TEMPLATES_REDUX_KEY, EMAIL_TEMPLATES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<EmailTemplate, number>): StrIndex<string> {
        return {
            subject: record.object.subject.toString()
        };
    }
}

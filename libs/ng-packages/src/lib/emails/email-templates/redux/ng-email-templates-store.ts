import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { EmailTemplate, EmailTemplatesAppState, EMAIL_TEMPLATES_REDUCER_KEY } from '@skysmack/packages-emails';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgEmailTemplatesStore extends NgRecordStore<EmailTemplatesAppState, EmailTemplate, number> {
    constructor(
        protected ngRedux: NgRedux<EmailTemplatesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, EMAIL_TEMPLATES_REDUCER_KEY); }
}

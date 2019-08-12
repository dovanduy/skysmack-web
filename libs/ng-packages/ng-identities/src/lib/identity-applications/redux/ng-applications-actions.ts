import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ApplicationsAppState, ApplicationsActions, Application } from '@skysmack/packages-identities';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgApplicationsActions extends ApplicationsActions {
    constructor(protected store: NgRedux<ApplicationsAppState>) { super(store); }

    public getMessageParams(record: LocalObject<Application, number>): StrIndex<string> {
        return {
            displayName: record.object.displayName
        };
    }
}

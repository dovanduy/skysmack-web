import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ApplicationsAppState, Application, APPLICATIONS_REDUX_KEY, APPLICATIONS_ADDITIONAL_PATHS } from '@skysmack/packages-identities';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgApplicationsActions extends RecordActionsBase<ApplicationsAppState, NgRedux<ApplicationsAppState>> {
    constructor(protected store: NgRedux<ApplicationsAppState>) { super(store, APPLICATIONS_REDUX_KEY, APPLICATIONS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Application, number>): StrIndex<string> {
        return {
            name: record.object.displayName
        };
    }
}

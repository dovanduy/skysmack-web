import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PersonsAppState, PASS_CODES_REDUX_KEY, PASS_CODES_ADDITIONAL_PATHS } from '@skysmack/packages-pass-codes';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Person } from '@skysmack/packages-pass-codes';

@Injectable({ providedIn: 'root' })
export class NgPersonsActions extends RecordActionsBase<PersonsAppState, NgRedux<PersonsAppState>> {
    constructor(protected store: NgRedux<PersonsAppState>) { super(store, PASS_CODES_REDUX_KEY, PASS_CODES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Person, number>): StrIndex<string> {
        return {
            displayName: record.object.displayName
        };
    }
}

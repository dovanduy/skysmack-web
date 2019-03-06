import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PersonsAppState } from '@skysmack/packages-persons';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Person } from '@skysmack/packages-persons';

@Injectable({ providedIn: 'root' })
export class NgPersonsActions extends RecordActionsBase<PersonsAppState, NgRedux<PersonsAppState>> {
    constructor(protected store: NgRedux<PersonsAppState>) { super(store, 'PERSONS_', []); }

    public getMessageParams(record: LocalObject<Person, number>): StrIndex<string> {
        return {
            email: record.object.email
        };
    }
}

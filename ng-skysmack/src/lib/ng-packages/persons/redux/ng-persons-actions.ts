import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PersonsAppState } from '@skysmack/packages-persons';

@Injectable({ providedIn: 'root' })
export class NgPersonsActions extends DocumentRecordActionsBase<PersonsAppState, NgRedux<PersonsAppState>> {
    constructor(protected store: NgRedux<PersonsAppState>) { super(store, 'PERSONS_'); }
}

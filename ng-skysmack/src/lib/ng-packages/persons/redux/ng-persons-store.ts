import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Person, PersonsAppState } from '@skysmack/packages-persons';
import { NgRecordReduxStore } from './../../../ng-redux/redux-stores/ng-record-redux-store';

@Injectable({ providedIn: 'root' })
export class NgPersonsStore extends NgRecordReduxStore<PersonsAppState, Person, number> {
    constructor(protected ngRedux: NgRedux<PersonsAppState>) { super(ngRedux, 'persons'); }
}

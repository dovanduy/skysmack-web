import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Person, PersonsAppState, PERSONS_AREA_KEY } from '@skysmack/packages-persons';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgPersonsStore extends NgRecordStore<PersonsAppState, Person, number> {
    constructor(protected ngRedux: NgRedux<PersonsAppState>) { super(ngRedux, PERSONS_AREA_KEY); }
}

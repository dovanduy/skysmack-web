import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Person, PersonsAppState, PERSONS_REDUCER_KEY } from '@skysmack/packages-persons';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgPersonsStore extends NgRecordStore<PersonsAppState, Person, number> {
    constructor(
        protected ngRedux: NgRedux<PersonsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PERSONS_REDUCER_KEY); }
}

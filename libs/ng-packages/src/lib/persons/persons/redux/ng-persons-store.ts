import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Person, PersonsAppState } from '@skysmack/packages-persons';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgPersonsStore extends NgRecordStore<PersonsAppState, Person, number> {
    constructor(
        protected ngRedux: NgRedux<PersonsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'persons'); }
}

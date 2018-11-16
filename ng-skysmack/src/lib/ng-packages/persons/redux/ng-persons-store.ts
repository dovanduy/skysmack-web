import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Person } from '@skysmack/packages-persons';
import { NgRecordReduxStore } from './../../../ng-redux/redux-stores/ng-record-redux-store';

@Injectable({ providedIn: 'root' })
export class NgPersonsStore extends NgRecordReduxStore<any, Person, number> {
    constructor(protected ngRedux: NgRedux<any>) { super(ngRedux, 'persons'); }
}

import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { Injectable } from '@angular/core';
import { Person } from '@skysmack/packages-persons';
import { NgRedux } from '@angular-redux/store';

@Injectable({ providedIn: 'root' })
export class PersonsRedux extends NgRecordReduxStore<any, Person, number> {
    public stateKey = 'persons';
    constructor(protected ngRedux: NgRedux<any>) { super(ngRedux); }
}

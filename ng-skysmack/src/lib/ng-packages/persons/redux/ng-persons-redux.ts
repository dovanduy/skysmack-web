import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Person } from '@skysmack/packages-persons';
import { NgRecordReduxStore } from 'lib/ng-redux';

@Injectable({
    providedIn: 'root',
})
export class NgPersonsRedux extends NgRecordReduxStore<any, Person, number> {
    public stateKey = 'persons';
    constructor(protected ngRedux: NgRedux<any>) { super(ngRedux); }

    public test() {
        this.ngRedux.dispatch({ type: 'TEST' });
    }
}

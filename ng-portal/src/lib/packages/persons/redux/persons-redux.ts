import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { Injectable } from '@angular/core';
import { Person } from '@skysmack/packages-persons';

@Injectable({ providedIn: 'root' })
export class PersonsRedux extends NgRecordReduxStore<any, Person, number> {
    public stateKey = 'persons';
}

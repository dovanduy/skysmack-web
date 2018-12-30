import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Person, PersonsAppState } from '@skysmack/packages-persons';
import { NgDocumentRecordReduxStore } from './../../../ng-redux/redux-stores/ng-document-record-redux-store';

@Injectable({ providedIn: 'root' })
export class NgPersonsStore extends NgDocumentRecordReduxStore<PersonsAppState, Person, number> {
    constructor(protected ngRedux: NgRedux<PersonsAppState>) { super(ngRedux, 'persons'); }
}

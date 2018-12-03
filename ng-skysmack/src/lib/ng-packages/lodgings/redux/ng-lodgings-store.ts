import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Lodging, LodgingsAppState } from '@skysmack/packages-lodgings';
import { NgDocumentRecordReduxStore } from '../../../ng-redux/redux-stores/ng-document-record-redux-store';

@Injectable({ providedIn: 'root' })
export class NgLodgingsStore extends NgDocumentRecordReduxStore<LodgingsAppState, Lodging, number> {
    constructor(protected ngRedux: NgRedux<LodgingsAppState>) { super(ngRedux, 'lodgings'); }
}

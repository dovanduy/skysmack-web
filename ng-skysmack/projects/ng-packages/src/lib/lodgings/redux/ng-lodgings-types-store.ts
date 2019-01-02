import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgDocumentRecordReduxStore } from '../../../ng-redux/redux-stores/ng-document-record-redux-store';
import { LodgingTypesAppState, LodgingType } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesStore extends NgDocumentRecordReduxStore<LodgingTypesAppState, LodgingType, number> {
    constructor(protected ngRedux: NgRedux<LodgingTypesAppState>) { super(ngRedux, 'lodgingTypes'); }
}

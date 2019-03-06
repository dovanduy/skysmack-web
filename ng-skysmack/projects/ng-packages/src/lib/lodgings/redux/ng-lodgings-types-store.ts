import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-redux';
import { LodgingTypesAppState, LodgingType } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesStore extends NgRecordStore<LodgingTypesAppState, LodgingType, number> {
    constructor(protected ngRedux: NgRedux<LodgingTypesAppState>) { super(ngRedux, 'lodgingTypes'); }
}

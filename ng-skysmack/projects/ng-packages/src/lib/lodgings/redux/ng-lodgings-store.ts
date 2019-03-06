import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Lodging, LodgingsAppState } from '@skysmack/packages-lodgings';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgLodgingsStore extends NgRecordStore<LodgingsAppState, Lodging, number> {
    constructor(protected ngRedux: NgRedux<LodgingsAppState>) { super(ngRedux, 'lodgings'); }
}

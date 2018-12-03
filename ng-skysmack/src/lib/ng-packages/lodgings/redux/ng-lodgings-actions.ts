import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingsAppState } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingsActions extends DocumentRecordActionsBase<LodgingsAppState, NgRedux<LodgingsAppState>> {
    constructor(protected store: NgRedux<LodgingsAppState>) { super(store, 'LODGINGS_', []); }
}

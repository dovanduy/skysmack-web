import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingsAppState, LodgingsAvailabilityActions } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingsAvailabilityActions extends LodgingsAvailabilityActions {
    constructor(protected store: NgRedux<LodgingsAppState>) { super(store); }
}

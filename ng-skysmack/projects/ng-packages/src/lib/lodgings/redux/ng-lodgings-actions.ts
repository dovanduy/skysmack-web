import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingsAppState, LodgingsActions } from '@skysmack/packages-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingsActions extends LodgingsActions {
    constructor(protected store: NgRedux<LodgingsAppState>) { super(store); }
}

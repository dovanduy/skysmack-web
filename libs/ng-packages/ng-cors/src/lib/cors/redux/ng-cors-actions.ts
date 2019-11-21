import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { CorsAppState, CorsActions } from '@skysmack/packages-cors';

@Injectable({ providedIn: 'root' })
export class NgCorsActions extends CorsActions {
    constructor(protected store: NgRedux<CorsAppState>) { super(store); }
}

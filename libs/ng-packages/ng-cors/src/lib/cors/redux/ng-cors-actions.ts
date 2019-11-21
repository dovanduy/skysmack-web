import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { CorsAppState, CORS_ADDITIONAL_PATHS, CORS_REDUX_KEY, CorsActions } from '@skysmack/packages-cors';

@Injectable({ providedIn: 'root' })
export class NgCorsActions extends CorsActions {
    constructor(protected store: NgRedux<CorsAppState>) { super(store); }
}

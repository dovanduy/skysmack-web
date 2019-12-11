import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { AccessPointsAppState } from '.';
import { ACCESS_POINTS_REDUX_KEY, ACCESS_POINTS_ADDITIONAL_PATHS } from '../constants/constants';
import { AccessPoint, } from '../models/access-point';

@Injectable({ providedIn: 'root' })
export class NgAccessPointsActions extends RecordActionsBase<AccessPointsAppState, NgRedux<AccessPointsAppState>> {
    constructor(protected store: NgRedux<AccessPointsAppState>) { super(store, ACCESS_POINTS_REDUX_KEY, ACCESS_POINTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<AccessPoint, string>): StrIndex<string> {
        return {
            id: ''
        };
    }
}

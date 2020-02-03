import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { AccessControllersAppState } from '.';
import { ACCESS_CONTROLLERS_REDUX_KEY, ACCESS_CONTROLLERS_ADDITIONAL_PATHS } from '../constants/constants';
import { AccessController, } from '../models/access-controller';

@Injectable({ providedIn: 'root' })
export class NgAccessControllersActions extends RecordActionsBase<AccessControllersAppState, NgRedux<AccessControllersAppState>> {
    constructor(protected store: NgRedux<AccessControllersAppState>) { super(store, ACCESS_CONTROLLERS_REDUX_KEY, ACCESS_CONTROLLERS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<AccessController, string>): StrIndex<string> {
        return {
            id: ''
        };
    }
}

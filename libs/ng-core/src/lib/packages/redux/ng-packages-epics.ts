import { ofType, ActionsObservable } from 'redux-observable';
import { ReduxAction, SettingsCommitMeta } from '@skysmack/redux';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgPackagesRequests } from './ng-packages-requests';
import { HttpErrorResponse, LocalObject, StrIndex, Package } from '@skysmack/framework';
import { NgPackagesNotifications } from '../ng-packages-notifications';
import { NgSkysmackActions } from '../../skysmack/redux/ng-skysmack-actions';
import { NgSkysmackRequests } from '../../skysmack/redux/ng-skysmack-requests';
import { NgSettingsActions, RecordEpicsBase } from '@skysmack/ng-framework';
import { PACKAGES_REDUX_KEY } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgPackagesEpics extends RecordEpicsBase<Package, string> {

    constructor(
        protected requests: NgPackagesRequests,
        protected notifications: NgPackagesNotifications,
        protected skysmackRequests: NgSkysmackRequests
    ) {
        super(requests, PACKAGES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            // Additional skysmack epics
            this.getPermissionsEpic,
            this.getAvailablePermissionsEpic,
            this.getSkysmackOnSettingsUpdateEpic
        ]);
    }

    // ADDITIONAL SKYSMACK EPICS
    // These are added here, since the ng-skysmack-epics.ts file only accepts one epic for some reason...
    public getPermissionsEpic = (action$: ActionsObservable<ReduxAction<string>>): Observable<ReduxAction<string[]> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgSkysmackActions.GET_PACKAGE_PERMISSIONS),
            mergeMap(action => this.skysmackRequests.getPermissions(action as any))
        );
    }

    public getAvailablePermissionsEpic = (action$: ActionsObservable<ReduxAction<string>>): Observable<ReduxAction<StrIndex<string>> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgSkysmackActions.GET_AVAILABLE_PACKAGE_PERMISSIONS),
            mergeMap(action => this.skysmackRequests.getAvailablePermissions(action as any))
        );
    }

    public getSkysmackOnSettingsUpdateEpic = (action$: ActionsObservable<ReduxAction<string>>) => {
        return action$.pipe(
            ofType(NgSettingsActions.UPDATE_SETTINGS_SUCCESS),
            mergeMap(action => {
                const castedAction = action as ReduxAction<any, SettingsCommitMeta<LocalObject<any, unknown>>>;
                if (castedAction.meta.stateKey === 'skysmack') {
                    return this.skysmackRequests.get();
                } else {
                    return of({ type: 'IGNORE_THIS_ACTION' });
                }
            })
        );
    }
}

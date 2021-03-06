import { ofType, ActionsObservable } from 'redux-observable';
import { ReduxAction, SettingsCommitMeta, GetAvailablePackagesSuccessPayload } from '@skysmack/redux';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgPackagesRequests } from './ng-packages-requests';
import { HttpErrorResponse, LocalObject, StrIndex, Package } from '@skysmack/framework';
import { NgPackagesNotifications } from '../ng-packages-notifications';
import { NgSettingsActions, RecordEpicsBase } from '@skysmack/ng-framework';
import { PACKAGES_REDUX_KEY } from '@skysmack/packages-skysmack-core';
import { NgPackagesActions } from './ng-packages-actions';
import { NgSkysmackRequests } from '@skysmack/ng-skysmack';

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
            this.getAvailablePackagesEpic,
            this.getSkysmackOnSettingsUpdateEpic
        ]);
    }

    // ADDITIONAL SKYSMACK EPICS
    // These are added here, since the ng-skysmack-epics.ts file only accepts one epic for some reason...
    public getAvailablePackagesEpic = (action$: ActionsObservable<ReduxAction<string>>): Observable<ReduxAction<GetAvailablePackagesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgPackagesActions.GET_AVAILABLE_PACKAGES),
            mergeMap((action) => this.requests.getAvailablePackages(action))
        );
    }

    public getSkysmackOnSettingsUpdateEpic = (action$: ActionsObservable<ReduxAction<string>>) => {
        return action$.pipe(
            ofType(NgSettingsActions.UPDATE_SETTINGS_SUCCESS),
            mergeMap(action => {
                const castedAction = action as ReduxAction<any, SettingsCommitMeta<LocalObject<any, unknown>>>;
                if (castedAction.meta.stateKey === 'skysmack') {
                    return this.skysmackRequests.get(action);
                } else {
                    return of({ type: 'IGNORE_THIS_ACTION' });
                }
            })
        );
    }
}

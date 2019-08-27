import { NgFileStorageRequests } from './ng-file-storage-requests';
import { Injectable } from '@angular/core';
import { NgFileStorageNotifications } from '../ng-file-storage-notifications';
import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@skysmack/framework';
import { FILE_STORAGE_REDUX_KEY } from 'libs/packages/file-storage/src';
import { NgFileStorageActions } from './ng-file-storage-actions';
import { mergeMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class NgFileStorageEpics {
    public epics: Epic[];

    constructor(protected requests: NgFileStorageRequests, protected notifications: NgFileStorageNotifications) {
        this.epics = [
            this.getSettingsEpic,
            this.updateSettingsEpic
        ];
    }

    public getSettingsEpic = (action$: ActionsObservable<ReduxAction<any>>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(FILE_STORAGE_REDUX_KEY + NgFileStorageActions.GET_SETTINGS),
            mergeMap(action => this.requests.getSettings(action))
        );
    }

    public updateSettingsEpic = (action$: ActionsObservable<ReduxAction<any>>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(FILE_STORAGE_REDUX_KEY + NgFileStorageActions.UPDATE_SETTINGS),
            mergeMap(action => this.requests.updateSettings(action))
        );
    }
}

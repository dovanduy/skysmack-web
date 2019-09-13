import { NgFileStorageRequests } from './ng-file-storage-requests';
import { Injectable } from '@angular/core';
import { NgFileStorageNotifications } from '../ng-file-storage-notifications';
import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@skysmack/framework';
import { NgFileStorageActions } from './ng-file-storage-actions';
import { mergeMap } from 'rxjs/operators';
import { FILE_STORAGE_REDUX_KEY, GetStorageItemsSuccessPayload, GetStorageItemsPayload } from '@skysmack/packages-file-storage';


@Injectable({ providedIn: 'root' })
export class NgFileStorageEpics {
    public epics: Epic[];

    constructor(protected requests: NgFileStorageRequests, protected notifications: NgFileStorageNotifications) {
        this.epics = [
            this.getStorageItemsEpic,
            this.getBucketsEpic,
            this.updateBucketsEpic
        ];
    }

    public getStorageItemsEpic = (action$: ActionsObservable<ReduxAction<GetStorageItemsPayload>>): Observable<ReduxAction<GetStorageItemsSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(FILE_STORAGE_REDUX_KEY + NgFileStorageActions.GET_STORAGE_ITEMS),
            mergeMap(action => this.requests.getStorageItems(action)),
        );
    }

    public getBucketsEpic = (action$: ActionsObservable<ReduxAction<any>>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(FILE_STORAGE_REDUX_KEY + NgFileStorageActions.GET_BUCKET),
            mergeMap(action => this.requests.getBuckets(action))
        );
    }

    public updateBucketsEpic = (action$: ActionsObservable<ReduxAction<any>>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(FILE_STORAGE_REDUX_KEY + NgFileStorageActions.UPDATE_BUCKET),
            mergeMap(action => this.requests.updateBuckets(action))
        );
    }
}

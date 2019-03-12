import { ActionsObservable, ofType, Epic } from 'redux-observable';
import { ReduxAction, CommitMeta, ReduxOfflineMeta, QueueActions, SettingsActions, GetSettingsPayload } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse, LocalObject, HttpResponse, QueueItem } from '@skysmack/framework';
import { Injectable } from '@angular/core';
import { NgSettingsRequests } from '../requests/ng-settings-requests';
import { NgSettingsNotifications } from '../notifications/ng-settings-notifications';

@Injectable({ providedIn: 'root' })
export class NgSettingsEpics {
    public epics: Epic[];

    constructor(protected requests: NgSettingsRequests, protected notifications: NgSettingsNotifications) {
        this.epics = [
            this.getEpic,
            this.snackBarGetFailureEpic,
            this.snackBarUpdateSuccessEpic,
            this.snackBarGetFailureEpic,
            this.standardActionEpic,
            this.successActionEpic,
            this.failureActionEpic
        ];
    }

    public getEpic = (action$: ActionsObservable<ReduxAction<GetSettingsPayload>>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(SettingsActions.GET_SETTINGS),
            mergeMap(action => this.requests.get(action))
        );
    }

    //#region Notifications
    public snackBarGetFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, unknown>>>>): Observable<ReduxAction> => {
        return action$.pipe(
            ofType(SettingsActions.GET_SETTINGS_FAILURE),
            map((action) => {
                this.notifications.getError(action);
                return { type: 'NOTIFICATION' };
            })
        );
    }

    public snackBarUpdateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<any, unknown>>>>): Observable<ReduxAction> => {
        return action$.pipe(
            ofType(SettingsActions.UPDATE_SETTINGS_SUCCESS),
            map(action => {
                this.notifications.updateSuccess(action);
                return { type: 'NOTIFICATION' };
            })
        );
    }

    public snackBarUpdateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, unknown>>>>): Observable<ReduxAction> => {
        return action$.pipe(
            ofType(SettingsActions.UPDATE_SETTINGS_FAILURE),
            map(action => {
                this.notifications.updateError(action);
                return { type: 'NOTIFICATION' };
            })
        );
    }
    //#endregion

    //#region Queue
    public standardActionEpic = (action$: ActionsObservable<ReduxAction<any, ReduxOfflineMeta<any, HttpResponse, LocalObject<any, unknown>>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(SettingsActions.UPDATE_SETTINGS),
            map(action => ({
                type: QueueActions.SET_QUEUE_ITEMS,
                payload: action.meta.offline.commit.meta.queueItems
            }))
        );
    }

    public successActionEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, unknown>>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(SettingsActions.UPDATE_SETTINGS_SUCCESS),
            map(action => ({
                type: QueueActions.REMOVE_QUEUE_ITEMS,
                payload: [new QueueItem({
                    message: ``,
                    packagePath: action.meta.stateKey,
                    localObject: action.meta.value,
                })]
            }))
        );
    }

    public failureActionEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, unknown>>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(SettingsActions.UPDATE_SETTINGS_FAILURE),
            map(action => ({
                type: QueueActions.SET_QUEUE_ITEMS,
                payload: action.meta.queueItems.map(queueItems => {
                    queueItems.message = `IDENTITIES_SETTINGS.QUEUE.ERROR`;
                    queueItems.localObject.error = true;
                    queueItems.error = action.payload;
                    return queueItems;
                })
            }))
        );
    }

    // TODO: Do we need this?
    // public cancelRecordActionEpic = (action$: ActionsObservable<ReduxAction<CancelActionPayload<TRecord, TKey>>>): Observable<ReduxAction<QueueItem[]>> => {
    //     return action$.pipe(
    //         ofType(SettingsActions.CANCEL_RECORD_ACTION),
    //         map(action => ({
    //             type: QueueActions.REMOVE_QUEUE_ITEMS,
    //             payload: [
    //                 new QueueItem({
    //                     message: ``,
    //                     packagePath: action.payload.packagePath,
    //                     localObject: action.payload.record
    //                 })
    //             ]
    //         }))
    //     );
    // }
    //#endregion
}

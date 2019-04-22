import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { ReduxAction, PackagePathPayload, GetAvailablePackagesSuccessPayload, CommitMeta, RollbackMeta, GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload, ReduxOfflineMeta, QueueActions, CancelActionPayload } from '@skysmack/redux';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgPackagesRequests } from './ng-packages-requests';
import { GetPackageSuccessPayload } from '@skysmack/packages-skysmack-core';
import { NgPackagesActions } from './ng-packages-actions';
import { HttpErrorResponse, LocalObject, Package, HttpResponse, QueueItem, StrIndex } from '@skysmack/framework';
import { NgPackagesNotifications } from '../ng-packages-notifications';
import { NgSkysmackActions } from '../../skysmack/redux/ng-skysmack-actions';
import { NgSkysmackRequests } from '../../skysmack/redux/ng-skysmack-requests';

@Injectable({ providedIn: 'root' })
export class NgPackagesEpics {
    public epics: Epic[];

    constructor(
        protected requests: NgPackagesRequests,
        protected notifications: NgPackagesNotifications,
        protected skysmackRequests: NgSkysmackRequests,
    ) {
        this.epics = [
            this.getPagedEpic,
            this.getSingleEpic,
            this.getAvailablePackagesEpic,
            this.snackBarGetPackageFailureEpic,
            this.snackBarGetSingleFailureEpic,
            this.snackBarCreateSuccessEpic,
            this.snackBarUpdateSuccessEpic,
            this.snackBarRemoveSuccessEpic,
            this.snackBarCreateFailureEpic,
            this.snackBarUpdateFailureEpic,
            this.snackBarRemoveFailureEpic,
            this.standardActionEpic,
            this.successActionEpic,
            this.failureActionEpic,
            this.cancelActionEpic,
            this.getPermissionsEpic,
            this.getAvailablePermissionsEpic
        ];
    }

    public getPagedEpic = (action$: ActionsObservable<ReduxAction<GetPagedEntitiesPayload>>): Observable<ReduxAction<GetPagedEntitiesSuccessPayload<any, string>> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgPackagesActions.PACKAGES_GET_PAGED),
            mergeMap(action => this.requests.getPaged(action))
        );
    }

    public getSingleEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>): Observable<ReduxAction<GetPackageSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgPackagesActions.GET_SINGLE_PACKAGE),
            mergeMap(action => this.requests.getSingle(action))
        );
    }

    public getAvailablePackagesEpic = (action$: ActionsObservable<ReduxAction>): Observable<ReduxAction<GetAvailablePackagesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgPackagesActions.GET_AVAILABLE_PACKAGES),
            mergeMap(() => this.requests.getAvailablePackages())
        );
    }

    public snackBarGetPackageFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<Package, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgPackagesActions.PACKAGES_GET_PAGED_FAILURE),
        map((action) => {
            this.notifications.getPagedError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarGetSingleFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Package, string>>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgPackagesActions.GET_SINGLE_PACKAGE_FAILURE),
        map((action) => {
            this.notifications.getSingleError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarCreateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<Package, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgPackagesActions.ADD_PACKAGE_SUCCESS),
        map((action) => {
            this.notifications.addSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarCreateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Package, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgPackagesActions.ADD_PACKAGE_FAILURE),
        map((action) => {
            this.notifications.addError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarUpdateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<Package, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgPackagesActions.UPDATE_PACKAGE_SUCCESS),
        map(action => {
            this.notifications.updateSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarUpdateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Package, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgPackagesActions.UPDATE_PACKAGE_FAILURE),
        map(action => {
            this.notifications.updateError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarRemoveSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<Package, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgPackagesActions.DELETE_PACKAGE_SUCCESS),
        map((action) => {
            this.notifications.removeSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarRemoveFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Package, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgPackagesActions.DELETE_PACKAGE_FAILURE),
        map((action) => {
            this.notifications.removeError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    //#region Queue
    public standardActionEpic = (action$: ActionsObservable<ReduxAction<any, ReduxOfflineMeta<Package[], HttpResponse, LocalObject<Package, string>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                NgPackagesActions.ADD_PACKAGE,
                NgPackagesActions.UPDATE_PACKAGE,
                NgPackagesActions.DELETE_PACKAGE,
            ),
            map(action => ({
                type: QueueActions.SET_QUEUE_ITEMS,
                payload: action.meta.offline.commit.meta.queueItems
            }))
        );
    }

    public successActionEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Package, string>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                NgPackagesActions.ADD_PACKAGE_SUCCESS,
                NgPackagesActions.UPDATE_PACKAGE_SUCCESS,
                NgPackagesActions.DELETE_PACKAGE_SUCCESS,
            ),
            map(action => ({
                type: QueueActions.REMOVE_QUEUE_ITEMS,
                payload: action.meta.value.map(record => {
                    return new QueueItem({
                        message: ``,
                        packagePath: action.meta.stateKey,
                        localObject: record,
                    });
                })
            }))
        );
    }

    public failureActionEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<Package, string>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                NgPackagesActions.ADD_PACKAGE_FAILURE,
                NgPackagesActions.UPDATE_PACKAGE_FAILURE,
                NgPackagesActions.DELETE_PACKAGE_FAILURE,
            ),
            map(action => ({
                type: QueueActions.SET_QUEUE_ITEMS,
                payload: action.meta.queueItems.map(queueItems => {
                    queueItems.message = `PACKAGES.ERROR`;
                    queueItems.localObject.error = true;
                    queueItems.error = action.payload;
                    return queueItems;
                })
            }))
        );
    }

    public cancelActionEpic = (action$: ActionsObservable<ReduxAction<{ _package: LocalObject<Package, string> }>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(NgPackagesActions.CANCEL_PACKAGE_ACTION),
            map(action => ({
                type: QueueActions.REMOVE_QUEUE_ITEMS,
                payload: [
                    new QueueItem({
                        message: ``,
                        packagePath: '',
                        localObject: action.payload._package
                    })
                ]
            }))
        );
    }
    //#endregion

    // ADDITIONAL SKYSMACK EPICS
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
}

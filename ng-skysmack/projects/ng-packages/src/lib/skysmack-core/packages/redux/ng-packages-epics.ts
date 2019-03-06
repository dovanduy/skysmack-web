import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { ReduxAction, PackagePathPayload, GetAvailablePackagesSuccessPayload, CommitMeta, RollbackMeta, GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload } from '@skysmack/redux';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgPackagesRequests } from './ng-packages-requests';
import { GetPackagesSuccessPayload, GetPackageSuccessPayload } from '@skysmack/packages-skysmack-core';
import { NgPackagesActions } from './ng-packages-actions';
import { HttpErrorResponse, LocalObject, Package } from '@skysmack/framework';
import { NgPackagesNotifications } from '../ng-packages-notifications';

@Injectable({ providedIn: 'root' })
export class NgPackagesEpics {
    public epics: Epic[];

    constructor(protected requests: NgPackagesRequests, protected notifications: NgPackagesNotifications) {
        this.epics = [
            this.getPagedEpic,
            this.getEpic,
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
        ];
    }

    public getPagedEpic = (action$: ActionsObservable<ReduxAction<GetPagedEntitiesPayload>>): Observable<ReduxAction<GetPagedEntitiesSuccessPayload<any, string>> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgPackagesActions.PACKAGES_GET_PAGED),
            mergeMap(action => this.requests.getPaged(action))
        );
    }

    public getEpic = (action$: ActionsObservable<ReduxAction>): Observable<ReduxAction<GetPackagesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgPackagesActions.GET_PACKAGES),
            mergeMap(() => this.requests.get())
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
        ofType(NgPackagesActions.GET_PACKAGES_FAILURE),
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
}

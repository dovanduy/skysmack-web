import { Injectable } from '@angular/core';
import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@skysmack/framework';
import { mergeMap, map } from 'rxjs/operators';
import { NgAssignmentsRequests } from './ng-assignments-requests';
import { getReadDependencies, getDependencies, GetDependenciesOptions } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgAssignmentTypesActions } from '../../assignment-types/redux/ng-assignment-types-actions';
import { NgAssignmentTypesStore } from '../../assignment-types/redux/ng-assignment-types-store';
import { AssignmentsActions } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsEpics {
    public epics: Epic[];
    constructor(
        private requests: NgAssignmentsRequests,
        private skysmackStore: NgSkysmackStore,
        private assignmentTypesStore: NgAssignmentTypesStore,
        private assignmentTypesActions: NgAssignmentTypesActions
    ) {
        this.epics = [
            this.getEpic,
            this.getDeps
        ];
    }

    public getEpic = (action$: ActionsObservable<ReduxAction<{ packagePath: string, from: Date, due: Date }>>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(AssignmentsActions.ASSIGNMENTS_GET),
            mergeMap(action => this.requests.get(action)),
        );
    }

    public getDeps = (action$: ActionsObservable<any>): any => action$.pipe(
        ofType(AssignmentsActions.ASSIGNMENTS_GET_SUCCESS),
        map((action: ReduxAction<any>) => getDependencies({
            action,
            relationIdSelector: 'assignmentType',
            rsqlIdSelector: 'assignmentTypeId',
            skysmackStore: this.skysmackStore,
            store: this.assignmentTypesStore,
            actions: this.assignmentTypesActions,
            dependencyIndexes: []
        } as GetDependenciesOptions)),
        map(() => ({ type: 'ASSIGNMENT_DEPENDENCIES_REQUESTED' }))
    );
}
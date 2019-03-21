import { RecordEpicsBase, NgRecordStore } from '@skysmack/ng-redux';
import { Assignment, AssignmentType } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgAssignmentsRequests } from './ng-assignments-requests';
import { NgAssignmentsNotifications } from '../ng-assignments-notifications';
import { ActionsObservable, ofType } from 'redux-observable';
import { map, take } from 'rxjs/operators';
import { RSQLFilterBuilder, PagedQuery, hasValue, LocalObject, HttpResponse, HttpSuccessResponse } from '@skysmack/framework';
import { GetPagedEntitiesSuccessPayload, ReduxAction, GetSingleEntitySuccessPayload, RecordActionsBase, CommitMeta } from '@skysmack/redux';
import { NgAssignmentsActions } from './ng-assignments-actions';
import { NgAssignmentTypesActions } from './ng-assignment-types-actions';
import { NgAssignmentTypesStore } from './ng-assignment-types-store';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsEpics extends RecordEpicsBase<Assignment, number> {
    constructor(
        protected requests: NgAssignmentsRequests,
        protected notifications: NgAssignmentsNotifications,
        protected assignmentTypesActions: NgAssignmentTypesActions,
        protected assignmentTypesStore: NgAssignmentTypesStore
    ) {
        super(requests, 'ASSIGNMENTS_', notifications);
        this.epics = this.epics.concat([
            this.getDependencies,
            this.getSingleDependency,
            this.getCreateUpdateDependencies
        ]);
    }

    public getDependencies = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(this.prefix + NgAssignmentsActions.GET_PAGED_SUCCESS),
        map((action: ReduxAction<GetPagedEntitiesSuccessPayload<Assignment, number>>) => genGetDeps({
            action,
            relationIdSelector: 'assignmentTypeId',
            relationSelector: 'assignmentType',
            store: this.assignmentTypesStore,
            actions: this.assignmentTypesActions
        } as GenGetDepsOptions)),
        map(() => ({ type: 'RETRIVED_DEPENDENCIES_GET_PAGED_SUCCESS' }))
    )

    public getSingleDependency = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(this.prefix + NgAssignmentsActions.GET_SINGLE_SUCCESS),
        map((action: ReduxAction<GetSingleEntitySuccessPayload<Assignment, number>>) => genGetDep({
            action,
            relationIdSelector: 'assignmentTypeId',
            relationSelector: 'assignmentType',
            store: this.assignmentTypesStore,
            actions: this.assignmentTypesActions
        } as GenGetDepOptions)),
        map(() => ({ type: 'RETRIVED_DEPENDENCIES_GET_SINGLE_SUCCESS' }))
    )

    public getCreateUpdateDependencies = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(
            this.prefix + NgAssignmentsActions.ADD_SUCCESS,
            this.prefix + NgAssignmentsActions.UPDATE_SUCCESS
        ),
        map((action: ReduxAction<HttpSuccessResponse<AssignmentType[]>, CommitMeta<any>>) => genGetCreateUpdateDeps({
            action,
            relationIdSelector: 'assignmentTypeId',
            relationSelector: 'assignmentType',
            store: this.assignmentTypesStore,
            actions: this.assignmentTypesActions
        } as GenGetCreateUpdateDepsOptions)),
        map(() => ({ type: 'RETRIVED_DEPENDENCIES_CREATE_UPDATE_SUCCESS' }))
    )
}

interface GenGetCreateUpdateDepsOptions {
    action: ReduxAction<HttpSuccessResponse<any>, CommitMeta<any>>;
    relationIdSelector: string;
    relationSelector: string;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
}
function genGetCreateUpdateDeps(options: GenGetCreateUpdateDepsOptions) {
    // Get ids from the relation id prop.
    const entities = options.action.payload.body;
    const depIds: number[] = Array.from(new Set(entities.map(record => record[options.relationIdSelector]).filter(x => x)));

    if (depIds && depIds.length > 0) {
        // Prepare query to get relevant deps
        const rsqlFilter = new RSQLFilterBuilder();
        rsqlFilter.column('id').in(depIds);
        const query = new PagedQuery({ rsqlFilter });

        // Get deps
        const packagePath = options.action.meta.stateKey;
        options.actions.getPaged(packagePath, query);

        // Match deps
        options.store.get(packagePath).pipe(
            hasValue(),
            map((deps: LocalObject<AssignmentType, number>[]) => {
                entities.forEach(entity => {
                    entity[options.relationSelector] = deps.find(dep => dep.object.id === entity[options.relationIdSelector]);
                });
            }),
            take(1)
        ).subscribe();
    }
}

interface GenGetDepsOptions {
    action: ReduxAction<{ entities: any[], packagePath: string }>;
    relationIdSelector: string;
    relationSelector: string;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
}
function genGetDeps(options: GenGetDepsOptions) {
    // Get ids from the relation id prop.
    const entities = options.action.payload.entities;
    const depIds: number[] = Array.from(new Set(entities.map(record => record[options.relationIdSelector]).filter(x => x)));

    if (depIds && depIds.length > 0) {
        // Prepare query to get relevant deps
        const rsqlFilter = new RSQLFilterBuilder();
        rsqlFilter.column('id').in(depIds);
        const query = new PagedQuery({ rsqlFilter });

        // Get deps
        const packagePath = options.action.payload.packagePath;
        options.actions.getPaged(packagePath, query);

        // Match deps
        options.store.get(packagePath).pipe(
            hasValue(),
            map((deps: LocalObject<AssignmentType, number>[]) => {
                entities.forEach(entity => {
                    entity[options.relationSelector] = deps.find(dep => dep.object.id === entity[options.relationIdSelector]);
                });
            }),
            take(1)
        ).subscribe();
    }
}

interface GenGetDepOptions {
    action: ReduxAction<{ entity: any, packagePath: string }>;
    relationIdSelector: string;
    relationSelector: string;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
}

function genGetDep(options: GenGetDepOptions) {
    const entity = options.action.payload.entity;

    // Get dep
    const packagePath = options.action.payload.packagePath;
    options.actions.getSingle<number>(packagePath, entity[options.relationIdSelector]);

    // Match dep
    options.store.getSingle(packagePath, entity[options.relationIdSelector]).pipe(
        map(dep => {
            entity[options.relationSelector] = dep;
        }),
        take(1)
    ).subscribe();
}

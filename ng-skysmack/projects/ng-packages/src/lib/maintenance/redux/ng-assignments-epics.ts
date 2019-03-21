import { RecordEpicsBase, NgRecordStore } from '@skysmack/ng-redux';
import { Assignment, AssignmentType } from '@skysmack/packages-maintenance';
import { Injectable } from '@angular/core';
import { NgAssignmentsRequests } from './ng-assignments-requests';
import { NgAssignmentsNotifications } from '../ng-assignments-notifications';
import { ActionsObservable, ofType } from 'redux-observable';
import { map, take } from 'rxjs/operators';
import { RSQLFilterBuilder, PagedQuery, hasValue, LocalObject } from '@skysmack/framework';
import { GetPagedEntitiesSuccessPayload, ReduxAction, GetSingleEntitySuccessPayload, RecordActionsBase } from '@skysmack/redux';
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
            this.getDeps,
            this.getSingleDep
        ]);
    }

    //#region old get deps
    // TODO(GET_DEPS): Make configurable operators for below + make it work with multiple deps.
    // public getDeps = (action$: ActionsObservable<any>) => action$.pipe(
    //     ofType(this.prefix + NgAssignmentsActions.GET_PAGED_SUCCESS),
    //     map((action: ReduxAction<GetPagedEntitiesSuccessPayload<Assignment, number>>) => {
    //         // Get ids from the relation id prop.
    //         const entities = action.payload.entities;
    //         const depIds: number[] = Array.from(new Set(entities.map(record => record.assignmentTypeId).filter(x => x)));

    //         if (depIds && depIds.length > 0) {
    //             // Prepare query to get relevant deps
    //             const rsqlFilter = new RSQLFilterBuilder();
    //             rsqlFilter.column('id').in(depIds);
    //             const query = new PagedQuery({ rsqlFilter });

    //             // Get deps
    //             const packagePath = action.payload.packagePath;
    //             this.assignmentTypesActions.getPaged(packagePath, query);

    //             // Match deps
    //             this.assignmentTypesStore.get(packagePath).pipe(
    //                 hasValue(),
    //                 map((deps: LocalObject<AssignmentType, number>[]) => {
    //                     entities.forEach(entity => {
    //                         entity.assignmentType = deps.find(dep => dep.object.id === entity.assignmentTypeId);
    //                     });
    //                 }),
    //                 take(1)
    //             ).subscribe();
    //         }
    //     }),
    //     map(() => ({ type: 'RETRIEVED_ASSIGNMENT_TYPES_BY_IDS' }))
    // )
    // public getSingleDep = (action$: ActionsObservable<any>) => action$.pipe(
    //     ofType(this.prefix + NgAssignmentsActions.GET_SINGLE_SUCCESS),
    //     map((action: ReduxAction<GetSingleEntitySuccessPayload<Assignment, number>>) => {
    //         const entity = action.payload.entity;

    //         // Get dep
    //         const packagePath = action.payload.packagePath;
    //         this.assignmentTypesActions.getSingle<number>(packagePath, entity.id);

    //         // Match dep
    //         this.assignmentTypesStore.getSingle(packagePath, entity.assignmentTypeId).pipe(
    //             map(dep => {
    //                 entity.assignmentType = dep;
    //             }),
    //             take(1)
    //         ).subscribe();
    //     }),
    //     map(() => ({ type: 'RETRIEVED_ASSIGNMENT_TYPE_BY_ID' }))
    // )
    //#endregion

    public getDeps = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(this.prefix + NgAssignmentsActions.GET_PAGED_SUCCESS),
        map((action: ReduxAction<GetPagedEntitiesSuccessPayload<Assignment, number>>) => genGetDeps({
            action,
            relationIdSelector: 'assignmentTypeId',
            relationSelector: 'assignmentType',
            store: this.assignmentTypesStore,
            actions: this.assignmentTypesActions
        } as GenGetDepsOptions)),
        map(() => ({ type: 'RETRIEVED_ASSIGNMENT_TYPES_BY_IDS' }))
    )

    public getDeps2 = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(this.prefix + NgAssignmentsActions.GET_PAGED_SUCCESS),
        map((action: ReduxAction<GetPagedEntitiesSuccessPayload<Assignment, number>>) => genGetDeps({
            action,
            relationIdSelector: 'assignmentTypeId',
            relationSelector: 'assignmentType',
            store: this.assignmentTypesStore,
            actions: this.assignmentTypesActions
        } as GenGetDepsOptions)),
        map(() => ({ type: 'RETRIEVED_ASSIGNMENT_TYPES_BY_IDS' }))
    )

    public getSingleDep = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(this.prefix + NgAssignmentsActions.GET_SINGLE_SUCCESS),
        map((action: ReduxAction<GetSingleEntitySuccessPayload<Assignment, number>>) => genGetDep({
            action,
            relationIdSelector: 'assignmentTypeId',
            relationSelector: 'assignmentType',
            store: this.assignmentTypesStore,
            actions: this.assignmentTypesActions
        } as GenGetDepOptions)),
        map(() => ({ type: 'RETRIEVED_ASSIGNMENT_TYPE_BY_ID' }))
    )
}

interface GenGetDepsOptions {
    action: ReduxAction<{ entities: any[], packagePath: string }>;
    relationIdSelector: string;
    relationSelector: string;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
}

interface GenGetDepOptions {
    action: ReduxAction<{ entity: any, packagePath: string }>;
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

function genGetDep(options: GenGetDepOptions) {
    const entity = options.action.payload.entity;

    // Get dep
    const packagePath = options.action.payload.packagePath;
    options.actions.getSingle<number>(packagePath, entity.id);

    // Match dep
    options.store.getSingle(packagePath, entity[options.relationIdSelector]).pipe(
        map(dep => {
            entity[options.relationSelector] = dep;
        }),
        take(1)
    ).subscribe();
}

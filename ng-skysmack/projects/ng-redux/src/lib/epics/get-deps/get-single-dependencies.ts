import { map, take } from 'rxjs/operators';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase, ReduxAction, GetSingleEntitySuccessPayload } from '@skysmack/redux';

export interface GetSingleDependencyOptions {
    action: ReduxAction<GetSingleEntitySuccessPayload<any, any>>;
    relationIdSelector: string;
    relationSelector: string;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
}

export function getSingleDependency(options: GetSingleDependencyOptions) {
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

import { map, take } from 'rxjs/operators';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase, ReduxAction, GetSingleEntitySuccessPayload } from '@skysmack/redux';
import { SkysmackStore } from '../../stores/skysmack-store';

export interface GetSingleDependencyOptions {
    action: ReduxAction<GetSingleEntitySuccessPayload<any, any>>;
    relationIdSelector: string;
    relationSelector: string;
    skysmackStore: SkysmackStore;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
    packageDependencyIndex?: number;
}

export function getSingleDependency(options: GetSingleDependencyOptions) {
    const entity = options.action.payload.entity;

    // Get dep
    const packagePath = options.action.payload.packagePath;

    if (options.packageDependencyIndex || options.packageDependencyIndex === 0) {
        options.skysmackStore.getCurrentPackage(packagePath).pipe(
            map(_package => {
                return options.actions.getSingle<number>(_package._package.dependencies[options.packageDependencyIndex], entity[options.relationIdSelector]);
            }),
            take(1),
        ).subscribe();
    } else {
        options.actions.getSingle<number>(packagePath, entity[options.relationIdSelector]);
    }

    // Match dep
    options.store.getSingle(packagePath, entity[options.relationIdSelector]).pipe(
        map(dep => {
            entity[options.relationSelector] = dep;
        }),
        take(1)
    ).subscribe();
}

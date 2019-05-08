import { map, take } from 'rxjs/operators';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase } from '@skysmack/redux';
import { SkysmackStore } from '../../stores/skysmack-store';

export interface GetSingleDependencyOptions {
    entity: any;
    packagePath: string;
    relationIdSelector: string;
    relationSelector: string;
    skysmackStore: SkysmackStore;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
    packageDependencyIndex?: number;
}

export function getSingleDependency(options: GetSingleDependencyOptions): void {
    const entity = options.entity;
    const packagePath = options.packagePath;
    const entityId = entity[options.relationIdSelector];

    if (options.packageDependencyIndex || options.packageDependencyIndex === 0 && entityId) {
        options.skysmackStore.getCurrentPackage(packagePath).pipe(
            map(_package => options.actions.getSingle<number>(_package._package.dependencies[options.packageDependencyIndex], entityId)),
            take(1)
        ).subscribe();
    } else if (entityId) {
        options.actions.getSingle<number>(packagePath, entityId);
    }
}
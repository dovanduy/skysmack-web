import { map, take } from 'rxjs/operators';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase } from '@skysmack/redux';
import { SkysmackStore } from '../../stores/skysmack-store';
import { getPackageDendencyAsStream } from '../../helpers/ng-helpers';
import { getProperty } from '@skysmack/framework';

export interface GetSingleDependencyOptions {
    entity: any;
    packagePath: string;
    relationIdSelector: string;
    skysmackStore: SkysmackStore;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
    dependencyIndexes: number[];
}

export function getSingleDependency(options: GetSingleDependencyOptions): void {
    const entity = options.entity;
    const entityId = getProperty(entity, options.relationIdSelector);
    const packagePath = options.packagePath;
    options.dependencyIndexes = options.dependencyIndexes ? options.dependencyIndexes : [];

    if (entityId) {
        getPackageDendencyAsStream(options.skysmackStore, packagePath, options.dependencyIndexes).pipe(
            map(targetPackage => options.actions.getSingle<number>(targetPackage.object.path, entityId)),
            take(1)
        ).subscribe();
    }
}

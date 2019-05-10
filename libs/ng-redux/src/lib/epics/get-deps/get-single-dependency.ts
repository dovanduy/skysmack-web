import { map, take, switchMap } from 'rxjs/operators';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase } from '@skysmack/redux';
import { SkysmackStore } from '../../stores/skysmack-store';
import { getNParentPackageDependency } from '../../helpers/ng-helpers';

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
    const entityId = entity[options.relationIdSelector];
    const packagePath = options.packagePath;
    options.dependencyIndexes = options.dependencyIndexes ? options.dependencyIndexes : [];

    options.skysmackStore.getCurrentPackage(packagePath).pipe(
        switchMap(_package => options.skysmackStore.getPackages().pipe(
            map(packages => getNParentPackageDependency(packages, _package._package, options.dependencyIndexes)),
            map(targetPackage => options.actions.getSingle<number>(targetPackage.object.path, entityId)),
            take(1)
        )),
        take(1)
    ).subscribe();
}

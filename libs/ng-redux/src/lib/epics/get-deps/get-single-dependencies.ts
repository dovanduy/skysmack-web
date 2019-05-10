import { map, take, switchMap } from 'rxjs/operators';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase } from '@skysmack/redux';
import { SkysmackStore } from '../../stores/skysmack-store';
import { RSQLFilterBuilder, PagedQuery } from '@skysmack/framework';
import { getNParentPackageDependency } from '../../helpers/ng-helpers';

export interface GetSingleDependenciesOptions {
    entity: any;
    packagePath: string;
    relationIdSelector: string;
    skysmackStore: SkysmackStore;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
    dependencyIndexes: number[];
}

export function getSingleDependencies(options: GetSingleDependenciesOptions): void {
    const entity = options.entity;
    const packagePath = options.packagePath;

    const rsqlFilter = new RSQLFilterBuilder();
    rsqlFilter.column(options.relationIdSelector).equalTo(entity.id);
    const query = new PagedQuery({ rsqlFilter });

    options.skysmackStore.getCurrentPackage(packagePath).pipe(
        switchMap(_package => options.skysmackStore.getPackages().pipe(
            map(packages => getNParentPackageDependency(packages, _package._package, options.dependencyIndexes)),
            map(targetPackage => options.actions.getPaged(targetPackage.object.path, query)),
            take(1)
        )),
        take(1)
    ).subscribe();
}

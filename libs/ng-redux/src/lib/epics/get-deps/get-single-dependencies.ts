import { map, take } from 'rxjs/operators';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase } from '@skysmack/redux';
import { SkysmackStore } from '../../stores/skysmack-store';
import { RSQLFilterBuilder, PagedQuery } from '@skysmack/framework';
import { getPackageDendencyAsStream } from '../../helpers/ng-helpers';

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

    getPackageDendencyAsStream(options.skysmackStore, packagePath, options.dependencyIndexes).pipe(
        map(targetPackage => options.actions.getPaged(targetPackage.object.path, query)),
        take(1)
    ).subscribe();
}

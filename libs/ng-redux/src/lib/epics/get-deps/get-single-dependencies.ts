import { map, take } from 'rxjs/operators';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase } from '@skysmack/redux';
import { SkysmackStore } from '../../stores/skysmack-store';
import { RSQLFilterBuilder, PagedQuery } from '@skysmack/framework';

export interface GetSingleDependenciesOptions {
    entity: any;
    packagePath: string;
    relationIdSelector: string;
    relationSelector: string;
    skysmackStore: SkysmackStore;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
    packageDependencyIndex?: number;
}

export function getSingleDependencies(options: GetSingleDependenciesOptions): void {
    const entity = options.entity;
    const packagePath = options.packagePath;

    const rsqlFilter = new RSQLFilterBuilder();
    rsqlFilter.column(options.relationIdSelector).equalTo(entity.id);
    const query = new PagedQuery({ rsqlFilter });

    if (options.packageDependencyIndex || options.packageDependencyIndex === 0) {
        options.skysmackStore.getCurrentPackage(packagePath).pipe(
            map(_package => options.actions.getPaged(_package._package.dependencies[options.packageDependencyIndex], query)),
            take(1)
        ).subscribe();
    } else {
        options.actions.getPaged(packagePath, query);
    }
}

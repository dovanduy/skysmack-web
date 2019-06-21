import { RSQLFilterBuilder, PagedQuery, getProperty } from '@skysmack/framework';
import { map, take } from 'rxjs/operators';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase, ReduxAction, GetPagedEntitiesSuccessPayload } from '@skysmack/redux';
import { SkysmackStore } from '../../stores/skysmack-store';
import { getPackageDendencyAsStream } from '../../helpers/ng-helpers';

export interface GetDependenciesOptions {
    action: ReduxAction<GetPagedEntitiesSuccessPayload<any, any>>;
    relationIdSelector: string;
    rsqlIdSelector: string;
    skysmackStore: SkysmackStore;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
    dependencyIndexes?: number[];
}

export function getDependencies(options: GetDependenciesOptions): void {
    const entities = options.action.payload.entities;
    const depIds: number[] = Array.from(new Set(entities.map(record => getProperty(record, options.relationIdSelector)).filter(x => x)));

    if (depIds && depIds.length > 0) {
        const rsqlFilter = new RSQLFilterBuilder();
        rsqlFilter.column(options.rsqlIdSelector).in(depIds);
        const query = new PagedQuery({ rsqlFilter });

        const packagePath = options.action.payload.packagePath;
        options.dependencyIndexes = options.dependencyIndexes ? options.dependencyIndexes : [];
        getPackageDendencyAsStream(options.skysmackStore, packagePath, options.dependencyIndexes).pipe(
            map(targetPackage => options.actions.getPaged(targetPackage.object.path, query)),
            take(1)
        ).subscribe();
    }
}

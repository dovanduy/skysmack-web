import { RSQLFilterBuilder, PagedQuery } from '@skysmack/framework';
import { map, take } from 'rxjs/operators';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase, ReduxAction, GetPagedEntitiesSuccessPayload } from '@skysmack/redux';
import { SkysmackStore } from '../../stores/skysmack-store';

export interface GetDependenciesOptions {
    action: ReduxAction<GetPagedEntitiesSuccessPayload<any, any>>;
    relationIdSelector: string;
    relationSelector: string;
    rsqlIdSelector: string;
    skysmackStore: SkysmackStore;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
    packageDependencyIndex?: number;
}

export function getDependencies(options: GetDependenciesOptions): void {
    const entities = options.action.payload.entities;
    const depIds: number[] = Array.from(new Set(entities.map(record => record[options.relationIdSelector]).filter(x => x)));

    if (depIds && depIds.length > 0) {
        const rsqlFilter = new RSQLFilterBuilder();
        rsqlFilter.column(options.rsqlIdSelector).in(depIds);
        const query = new PagedQuery({ rsqlFilter });

        const packagePath = options.action.payload.packagePath;

        if (options.packageDependencyIndex || options.packageDependencyIndex === 0) {
            options.skysmackStore.getCurrentPackage(packagePath).pipe(
                map(_package => {
                    return options.actions.getPaged(_package._package.dependencies[options.packageDependencyIndex], query);
                }),
                take(1),
            ).subscribe();
        } else {
            options.actions.getPaged(packagePath, query);
        }
    }
}

import { RSQLFilterBuilder, PagedQuery, hasValue, LocalObject, HttpSuccessResponse } from '@skysmack/framework';
import { map, take } from 'rxjs/operators';
import { AssignmentType } from '@skysmack/packages-maintenance';
import { NgRecordStore } from '../../stores/ng-record-store';
import { RecordActionsBase, ReduxAction, CommitMeta } from '@skysmack/redux';

export interface GetCreateUpdateDependenciesOptions {
    action: ReduxAction<HttpSuccessResponse<any>, CommitMeta<any>>;
    relationIdSelector: string;
    relationSelector: string;
    rsqlIdSelector: string;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
}

export function getCreateUpdateDependencies(options: GetCreateUpdateDependenciesOptions) {
    // Get ids from the relation id prop.
    const entities = options.action.payload.body;
    const depIds: number[] = Array.from(new Set(entities.map(record => record[options.relationIdSelector]).filter(x => x)));

    if (depIds && depIds.length > 0) {
        // Prepare query to get relevant deps
        const rsqlFilter = new RSQLFilterBuilder();
        rsqlFilter.column(options.rsqlIdSelector).in(depIds);
        const query = new PagedQuery({ rsqlFilter });

        // Get deps
        const packagePath = options.action.meta.stateKey;
        options.actions.getPaged(packagePath, query);

        // Match deps
        options.store.get(packagePath).pipe(
            hasValue(),
            map((deps: LocalObject<AssignmentType, number>[]) => {
                entities.forEach(entity => {
                    entity[options.relationSelector] = deps.find(dep => dep.object.id === entity[options.relationIdSelector]);
                });
            }),
            take(1)
        ).subscribe();
    }
}

import { ReduxAction } from './../../action-types/redux-action';
import { Effect } from './../../models/effect';
import { CommitMeta } from './commit-meta';
import { RollbackMeta } from './rollback-meta';

export class OfflineMeta<TRequestBody, TResponse, TValue> {
    constructor(
        public effect: Effect<TRequestBody>,
        public commit: ReduxAction<TResponse, CommitMeta<TValue>>,
        public rollback: ReduxAction<TResponse, RollbackMeta<TValue>>
    ) { }
}

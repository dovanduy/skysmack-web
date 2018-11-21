import { EffectMeta } from './effect-meta';
import { ReduxAction } from './../../action-types/redux-action';
import { RollbackMeta } from './rollback-meta';
import { Record } from '@skysmack/framework';
import { CommitMeta } from './commit-meta';

export class OfflineMeta<TBody, TResponse extends Record<TKey>, TKey> {
    constructor(
        public effect: EffectMeta<TBody>,
        public commit: ReduxAction<TResponse, CommitMeta<TResponse, TKey>>,
        public rollback: ReduxAction<TResponse, RollbackMeta<TResponse, TKey>>
    ) { }
}

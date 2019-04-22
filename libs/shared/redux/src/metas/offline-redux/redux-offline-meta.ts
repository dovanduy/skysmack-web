import { OfflineMeta } from './offline-meta';

export class ReduxOfflineMeta<TBody, TResponse, TObject> {
    constructor(
        public offline: OfflineMeta<TBody, TResponse, TObject>
    ) { }
}

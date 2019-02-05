import { QueueItem } from '@skysmack/framework';

export class RollbackMeta<TValue = any> {
    constructor(
        public stateKey: string,
        public value: TValue,
        public queueItems: QueueItem[]
    ) { }
}

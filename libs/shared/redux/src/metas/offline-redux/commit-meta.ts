import { QueueItem } from '@skysmack/framework';

export class CommitMeta<TValue>  {
    constructor(
        public stateKey: string,
        public value: TValue,
        public queueItems: QueueItem[]
    ) { }
}

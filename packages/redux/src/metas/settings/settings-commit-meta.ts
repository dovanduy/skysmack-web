import { QueueItem } from '@skysmack/framework';
import { CommitMeta } from '../offline-redux';

export class SettingsCommitMeta<TValue> extends CommitMeta<TValue>  {
    constructor(
        public stateKey: string,
        public value: TValue,
        public queueItems: QueueItem[],
        public settingsKey: string
    ) {
        super(stateKey, value, queueItems)
    }
}

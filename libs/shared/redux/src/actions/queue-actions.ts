import { Store } from 'redux';
import { ReduxAction } from './../action-types';
import { QueueItem } from '@skysmack/framework';

export class QueueActions<TStore extends Store> {
    public static SET_QUEUE_ITEMS = 'SET_QUEUE_ITEMS';
    public static REMOVE_QUEUE_ITEMS = 'REMOVE_QUEUE_ITEMS';

    constructor(
        protected store: TStore,
    ) { }

    public setQueueItems = (queueItems: QueueItem[]): void => {
        this.store.dispatch(Object.assign({}, new ReduxAction<QueueItem[]>({
            type: QueueActions.SET_QUEUE_ITEMS,
            payload: queueItems
        })));
    }

    public removeQueueItems = (queueItems: QueueItem[]): void => {
        this.store.dispatch(Object.assign({}, new ReduxAction<QueueItem[]>({
            type: QueueActions.REMOVE_QUEUE_ITEMS,
            payload: queueItems
        })));
    }
}
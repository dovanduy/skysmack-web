import { ReduxAction } from '../action-types/redux-action';
import { QueueItem } from '@skysmack/framework';
import { sharedReducer } from './shared-reducer';
import { AppState } from '../states/app-state';
import { QueueActions } from '../actions';

export class QueuesAppState extends AppState {
    public queue: QueueState;
}

export class QueueState {
    public items: QueueItem[] = [];
}

export function queueReducer(state = new QueueState(), action: ReduxAction): QueueState {
    state = sharedReducer(state, action, new QueueState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        case QueueActions.ADD_QUEUE_ITEMS: {
            const castedAction = action as ReduxAction<QueueItem[]>;
            newState.items = newState.items.concat(castedAction.payload);
            return newState;
        }
        case QueueActions.REMOVE_QUEUE_ITEMS: {
            const castedAction = action as ReduxAction<QueueItem[]>;
            return newState;
        }
        default:
            return state;
    }
}

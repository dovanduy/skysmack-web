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
        case QueueActions.SET_QUEUE_ITEMS: {
            const castedAction = action as ReduxAction<QueueItem[]>;

            // Remove existing items, if any
            // https://stackoverflow.com/questions/19957348/javascript-arrays-remove-all-elements-contained-in-another-array - see answer 3
            for (let itemIndex = newState.items.length - 1; itemIndex >= 0; itemIndex--) {
                for (let incomingItemIndex = 0; incomingItemIndex < castedAction.payload.length; incomingItemIndex++) {
                    if (newState.items[itemIndex] && (newState.items[itemIndex].localObject.localId === castedAction.payload[incomingItemIndex].localObject.localId)) {
                        newState.items.splice(itemIndex, 1);
                    }
                }
            }

            // Add new items
            newState.items = newState.items.concat(castedAction.payload);

            return newState;
        }
        case QueueActions.REMOVE_QUEUE_ITEMS: {
            const castedAction = action as ReduxAction<QueueItem[]>;

            newState.items = newState.items.filter(item => {
                let keep = true;
                castedAction.payload.forEach(incomingItem => {
                    if (incomingItem.localObject.localId === item.localObject.localId) {
                        keep = false;
                    }
                });
                return keep;
            });

            return newState;
        }
        default:
            return state;
    }
}

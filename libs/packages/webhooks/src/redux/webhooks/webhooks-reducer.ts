import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { Webhook } from '../../models/webhook';
import { sharedReducer } from '@skysmack/redux';
import { WEBHOOKS_REDUX_KEY, WEBHOOKS_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access webhooks via the GLOBAL state. E.g. state.webhooks (where webhooks is the reducer name.)
 */
export class WebhooksAppState extends AppState {
    public webhooks: WebhooksState;
}

export class WebhooksState implements RecordState<Webhook, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Webhook, number>>> = {};
}

export function webhooksReducer(state = new WebhooksState(), action: ReduxAction, prefix: string = WEBHOOKS_REDUX_KEY): WebhooksState {
    state = sharedReducer(state, action, new WebhooksState(), WEBHOOKS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<WebhooksState, Webhook, number>(state, action, prefix)
            };
    }
}

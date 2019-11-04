import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { Channel } from '../models/channel';
import { SITE_MINDER_CHANNELS_REDUCER_KEY, SITE_MINDER_CHANNELS_REDUX_KEY } from '../constants/constants';

/**
 * This is to be used when you want to access persons via the GLOBAL state. E.g. state.persons (where persons is the reducer name.)
 */
export class SiteMinderChannelsAppState extends AppState {
    public siteMinderChannels: SiteMinderChannelsState;
}

export class SiteMinderChannelsState implements RecordState<Channel, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Channel, number>>> = {};
}

export function siteMinderChannelsReducer(state = new SiteMinderChannelsState(), action: ReduxAction, prefix: string = SITE_MINDER_CHANNELS_REDUX_KEY): SiteMinderChannelsState {
    state = sharedReducer(state, action, new SiteMinderChannelsState(), SITE_MINDER_CHANNELS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<SiteMinderChannelsState, Channel, number>(state, action, prefix)
            };
    }
}

import { AppState, ReduxAction } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { SITE_MINDER_CHANNEL_MANAGER_REDUCER_KEY } from '../constants/constants';

/**
 * This is to be used when you want to access siteminder via the GLOBAL state. E.g. state.siteminder (where siteminder is the reducer name.)
 */
export class SiteMinderChannelManagerAppState extends AppState {
    public siteMinderChannelManager: SiteMinderChannelManagerState;
}

export class SiteMinderChannelManagerState {
}

export function siteMinderChannelManagerReducer(state = new SiteMinderChannelManagerState(), action: ReduxAction): SiteMinderChannelManagerState {
    state = sharedReducer(state, action, new SiteMinderChannelManagerState(), SITE_MINDER_CHANNEL_MANAGER_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state
            };
    }
}

import { AppState, ReduxAction } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { SITE_MINDER_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access siteminder via the GLOBAL state. E.g. state.siteminder (where siteminder is the reducer name.)
 */
export class SiteMinderAppState extends AppState {
    public siteMinder: SiteMinderState;
}

export class SiteMinderState {
}

export function siteMinderReducer(state = new SiteMinderState(), action: ReduxAction): SiteMinderState {
    state = sharedReducer(state, action, new SiteMinderState(), SITE_MINDER_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
            };
    }
}

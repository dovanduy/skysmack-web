import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SiteMinderChannelsAppState, SITE_MINDER_CHANNELS_REDUX_KEY, SITE_MINDER_CHANNELS_ADDITIONAL_PATHS, Channel } from '@skysmack/packages-siteminder';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelsActions extends RecordActionsBase<SiteMinderChannelsAppState, NgRedux<SiteMinderChannelsAppState>> {
    constructor(protected store: NgRedux<SiteMinderChannelsAppState>) { super(store, SITE_MINDER_CHANNELS_REDUX_KEY, SITE_MINDER_CHANNELS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Channel, number>): StrIndex<string> {
        return {
            displayName: record.object.name
        };
    }
}

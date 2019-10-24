import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SiteMinderChannelManagerAppState, SiteMinderChannelManagerActions } from '@skysmack/packages-siteminder';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelManagerActions extends SiteMinderChannelManagerActions {
    constructor(protected store: NgRedux<SiteMinderChannelManagerAppState>) {
        super(store);
    }
}

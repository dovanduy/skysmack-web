import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { SiteMinderChannelManagerAppState } from '@skysmack/packages-siteminder';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelManagerStore {
    constructor(
        protected ngRedux: NgRedux<SiteMinderChannelManagerAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { }
}

import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { SiteMinderAppState } from '@skysmack/packages-siteminder';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderStore {
    constructor(
        protected ngRedux: NgRedux<SiteMinderAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { }
}

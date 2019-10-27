import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SiteMinderAppState, SiteMinderActions } from '@skysmack/packages-siteminder';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderActions extends SiteMinderActions {
    constructor(protected store: NgRedux<SiteMinderAppState>) {
        super(store);
    }
}

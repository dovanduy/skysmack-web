import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SiteMinderChannelManagerAppState } from '@skysmack/packages-siteminder';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelManagerActions {
    constructor(protected store: NgRedux<SiteMinderChannelManagerAppState>) { }
}

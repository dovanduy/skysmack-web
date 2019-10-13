import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SiteMinderAppState } from '@skysmack/packages-siteminder';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderActions {
    constructor(protected store: NgRedux<SiteMinderAppState>) { }
}

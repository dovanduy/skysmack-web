import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Template, TemplatesAppState, TEMPLATES_REDUCER_KEY } from '@skysmack/packages-templates';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgTemplatesStore extends NgRecordStore<TemplatesAppState, Template, number> {
    constructor(
        protected ngRedux: NgRedux<TemplatesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, TEMPLATES_REDUCER_KEY); }
}

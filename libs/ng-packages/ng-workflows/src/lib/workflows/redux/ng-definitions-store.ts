import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Definition, DefinitionsAppState, DEFINITIONS_REDUCER_KEY } from '@skysmack/packages-workflows';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgDefinitionsStore extends NgRecordStore<DefinitionsAppState, Definition, number> {
    constructor(
        protected ngRedux: NgRedux<DefinitionsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, DEFINITIONS_REDUCER_KEY); }
}

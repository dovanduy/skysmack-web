import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Terminal, TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgTerminalsStore extends NgRecordStore<TerminalsAppState, Terminal, number> {
    constructor(
        protected ngRedux: NgRedux<TerminalsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'terminals'); }
}

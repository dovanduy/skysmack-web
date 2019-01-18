import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Terminal, TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgTerminalsStore extends NgDocumentRecordReduxStore<TerminalsAppState, Terminal, number> {
    constructor(protected ngRedux: NgRedux<TerminalsAppState>) { super(ngRedux, 'terminals'); }
}
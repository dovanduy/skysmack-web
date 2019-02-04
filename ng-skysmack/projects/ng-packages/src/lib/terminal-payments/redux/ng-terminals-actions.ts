import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { LocalObject, NumIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgTerminalsActions extends DocumentRecordActionsBase<TerminalsAppState, NgRedux<TerminalsAppState>> {
    constructor(protected store: NgRedux<TerminalsAppState>) { super(store, 'TERMINALS_', ['terminals']); }

    protected getMessageParams(record: LocalObject<any, number>): NumIndex<string> {
        return {};
    }
}

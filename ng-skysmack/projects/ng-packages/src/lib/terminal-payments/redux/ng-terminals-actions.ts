import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TerminalsAppState, Terminal } from '@skysmack/packages-terminal-payments';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgTerminalsActions extends RecordActionsBase<TerminalsAppState, NgRedux<TerminalsAppState>> {
    constructor(protected store: NgRedux<TerminalsAppState>) { super(store, 'TERMINALS_', ['terminals']); }

    public getMessageParams(record: LocalObject<Terminal, number>): StrIndex<string> {
        return {
            id: 'Object'
        };
    }
}

import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TerminalsAppState, Terminal, TERMINALS_ADDITIONAL_PATHS, TERMINALS_REDUX_KEY } from '@skysmack/packages-terminal-payments';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgTerminalsActions extends RecordActionsBase<TerminalsAppState, NgRedux<TerminalsAppState>> {
    constructor(protected store: NgRedux<TerminalsAppState>) { super(store, TERMINALS_REDUX_KEY, TERMINALS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Terminal, string>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}

import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DefinitionsAppState, Definition, DEFINITIONS_ADDITIONAL_PATHS, DEFINITIONS_REDUX_KEY } from '@skysmack/packages-workflows';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgDefinitionsActions extends RecordActionsBase<DefinitionsAppState, NgRedux<DefinitionsAppState>> {
    constructor(protected store: NgRedux<DefinitionsAppState>) { super(store, DEFINITIONS_REDUX_KEY, DEFINITIONS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Definition, number>): StrIndex<string> {
        return {
            url: record.object.url
        };
    }
}

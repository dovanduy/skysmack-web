import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingsAppState, Lodging } from '@skysmack/packages-lodgings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingsActions extends DocumentRecordActionsBase<LodgingsAppState, NgRedux<LodgingsAppState>> {
    constructor(protected store: NgRedux<LodgingsAppState>) { super(store, 'LODGINGS_', []); }

    protected getMessageParams(record: LocalObject<Lodging, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}

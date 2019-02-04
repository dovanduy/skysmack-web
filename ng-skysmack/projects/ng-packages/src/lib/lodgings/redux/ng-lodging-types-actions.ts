import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingTypesAppState } from '@skysmack/packages-lodgings';
import { LocalObject, NumIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesActions extends DocumentRecordActionsBase<LodgingTypesAppState, NgRedux<LodgingTypesAppState>> {
    constructor(protected store: NgRedux<LodgingTypesAppState>) { super(store, 'LODGING_TYPES_', ['types']); }

    protected getMessageParams(record: LocalObject<any, number>): NumIndex<string> {
        return {};
    }
}

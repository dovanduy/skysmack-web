import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingTypesAppState, LodgingType } from '@skysmack/packages-lodgings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesActions extends DocumentRecordActionsBase<LodgingTypesAppState, NgRedux<LodgingTypesAppState>> {
    constructor(protected store: NgRedux<LodgingTypesAppState>) { super(store, 'LODGING_TYPES_', ['types']); }

    public getMessageParams(record: LocalObject<LodgingType, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}

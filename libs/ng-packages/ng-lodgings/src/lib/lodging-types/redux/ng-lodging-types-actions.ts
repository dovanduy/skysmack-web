import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingTypesAppState, LodgingType, LodgingTypesActions } from '@skysmack/packages-lodgings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesActions extends LodgingTypesActions {
    constructor(protected store: NgRedux<LodgingTypesAppState>) { super(store); }

    public getMessageParams(record: LocalObject<LodgingType, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}

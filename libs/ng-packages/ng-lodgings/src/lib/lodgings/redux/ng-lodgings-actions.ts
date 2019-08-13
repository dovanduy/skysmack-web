import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingsAppState, LodgingsActions, Lodging } from '@skysmack/packages-lodgings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingsActions extends LodgingsActions {
    constructor(protected store: NgRedux<LodgingsAppState>) { super(store); }

    public getMessageParams(record: LocalObject<Lodging, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}

import { FieldActions, FieldState } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex, FieldSchemaViewModel } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgFieldActions extends FieldActions<FieldState, NgRedux<FieldState>> {
    constructor(protected store: NgRedux<FieldState>) { super(store); }

    public getMessageParams(record: LocalObject<FieldSchemaViewModel, string>): StrIndex<string> {
        return {
            displayName: record.object.display
        };
    }
}

import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgPersonsActions extends RecordActionsBase<NgRedux<any>> {
    constructor(protected store: NgRedux<any>) { super(store, 'PERSONS_'); }
}

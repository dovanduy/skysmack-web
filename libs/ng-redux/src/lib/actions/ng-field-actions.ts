import { FieldActions, FieldState } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgFieldActions extends FieldActions<FieldState, NgRedux<FieldState>> {
    constructor(protected store: NgRedux<FieldState>) { super(store); }
}

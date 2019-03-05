import { FieldActions, FieldState } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Inject } from '@angular/core';

@Inject({ provideIn: 'root' })
export class NgFieldActions extends FieldActions<FieldState, NgRedux<FieldState>> {
    constructor(protected store: NgRedux<FieldState>) { super(store); }
}

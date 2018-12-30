import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PackagesAppState, PackagesActions } from '@skysmack/packages';

@Injectable({ providedIn: 'root' })
export class NgPackagesActions extends PackagesActions<PackagesAppState, NgRedux<PackagesAppState>> {
    constructor(protected store: NgRedux<PackagesAppState>) {
        super(store);
    }
}

import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PackagesAppState, PackagesActions } from '@skysmack/packages-skysmack-core';

@Injectable({ providedIn: 'root' })
export class NgPackagesActions extends PackagesActions {
    constructor(protected store: NgRedux<PackagesAppState>) {
        super(store);
    }
}

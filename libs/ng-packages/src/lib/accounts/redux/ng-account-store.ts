import { Injectable } from '@angular/core';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';
import { NgRedux } from '@angular-redux/store';

@Injectable({ providedIn: 'root' })
export class NgAccountStore  /*implements EntityStore<Package, string>*/ {

    constructor(
        protected store: NgRedux<PackagesAppState>,
    ) { }
}

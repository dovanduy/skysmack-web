import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PackagesAppState } from '@skysmack/packages';

@Injectable({ providedIn: 'root' })
export class NgPackagesActions {
    constructor(protected store: NgRedux<PackagesAppState>) { }
}

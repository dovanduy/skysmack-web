import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PackagesAppState, PackagesActions } from '@skysmack/packages-skysmack-core';
import { Package, StrIndex, LocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgPackagesActions extends PackagesActions {
    constructor(protected store: NgRedux<PackagesAppState>) {
        super(store);
    }

    public getMessageParams(record: LocalObject<Package, string>): StrIndex<string> {
        return {
            displayName: record.object.name
        };
    }
}

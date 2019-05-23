import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { SkysmackAppState } from '@skysmack/packages-skysmack-core';
import { SkysmackStore } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgSkysmackStore extends SkysmackStore {
    constructor(protected ngRedux: NgRedux<SkysmackAppState>) {
        super(ngRedux);
    }
}

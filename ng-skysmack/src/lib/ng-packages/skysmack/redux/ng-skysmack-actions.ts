import { SkysmackActions } from '@skysmack/packages-skysmack';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

@Injectable({ providedIn: 'root' })
export class NgSkysmackActions extends SkysmackActions {
    constructor(protected ngRedux: NgRedux<any>) {
        super(ngRedux);
    }
}

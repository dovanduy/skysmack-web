import { SkysmackActions } from '@skysmack/packages-skysmack-core';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { PersonsAppState } from '@skysmack/packages-persons';

@Injectable({ providedIn: 'root' })
export class NgSkysmackActions extends SkysmackActions {
    constructor(protected ngRedux: NgRedux<PersonsAppState>) {
        super(ngRedux);
    }
}

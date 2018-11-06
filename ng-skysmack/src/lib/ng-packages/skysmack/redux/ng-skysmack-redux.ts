import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

@Injectable({
    providedIn: 'root',
})
export class NgSkysmackRedux {
    public stateKey = 'skysmack';
    constructor(protected ngRedux: NgRedux<any>) { }
}

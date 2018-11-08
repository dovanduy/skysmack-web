import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UIActions } from './ui-actions';


@Injectable({ providedIn: 'root' })
export class UIRedux {

    constructor(
        protected ngRedux: NgRedux<any>,
        protected actions: UIActions
    ) { }

    public getOnlineStatus(): Observable<boolean> {
        return this.ngRedux.select((state: any) => state.offline.online);
    }

    public getMenu(): Observable<any> {
        return this.ngRedux.select((state: any) => state.ui.menu);
    }

    // public toggleMenuFor(targetMenuKey: string): void {
    //     this.ngRedux.dispatch(this.actions.toggleMenuFor(targetMenuKey));
    // }

    // public setPackageDrawerStatus(status): void {
    //     this.ngRedux.dispatch(this.actions.setPackageDrawerStatus(status));
    // }
}

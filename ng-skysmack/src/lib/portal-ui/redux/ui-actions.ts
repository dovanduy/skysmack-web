import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class UIActions {
    public static TOGGLE_MENU_FOR = 'TOGGLE_MENU_FOR';
    public static SET_PACKAGE_DRAWER_STATUS = 'SET_PACKAGE_DRAWER_STATUS';

    constructor() { }

    // public toggleMenuFor(targetMeny: string): PayloadAction<string> {
    //     return {
    //         type: UIActions.TOGGLE_MENU_FOR,
    //         payload: targetMeny
    //     };
    // }

    // public setPackageDrawerStatus(status: boolean): PayloadAction<boolean> {
    //     return {
    //         type: UIActions.SET_PACKAGE_DRAWER_STATUS,
    //         payload: status
    //     };
    // }
}

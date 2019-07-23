import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { SidebarMenu } from './../../../models/sidebar-menu/sidebar-menu';
import { MenuItem } from '@skysmack/framework';
import { BehaviorSubject } from 'rxjs';

// https://medium.com/@webdev_aaron/fab-speed-dial-with-angular-5-2-angular-material-be696fc14967
@Component({
    selector: 'ss-speed-dial-fab',
    templateUrl: './speed-dial-fab.component.html',
    styleUrls: ['./speed-dial-fab.component.scss'],
    animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {
    @Input() public sidebarMenu: SidebarMenu;
    public menuItems$: BehaviorSubject<MenuItem[]>;;
    public buttons$: BehaviorSubject<MenuItem[]>;
    public fabTogglerState = 'inactive';

    @Output() public menuItemActionEvent = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
        this.menuItems$ = this.sidebarMenu.speedDialMenuItems$;
    }

    showItems() {
        this.fabTogglerState = 'active';
        this.buttons$.next(this.menuItems$.getValue());
    }

    hideItems() {
        this.fabTogglerState = 'inactive';
        this.buttons$.next([]);
    }

    onToggleFab() {
        this.buttons$.getValue().length ? this.hideItems() : this.showItems();
    }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { SidebarMenu } from './../../../models/sidebar-menu/sidebar-menu';
import { MenuItem } from '@skysmack/framework';

// https://medium.com/@webdev_aaron/fab-speed-dial-with-angular-5-2-angular-material-be696fc14967
@Component({
    selector: 'ss-speed-dial-fab',
    templateUrl: './speed-dial-fab.component.html',
    styleUrls: ['./speed-dial-fab.component.scss'],
    animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {
    @Input() public sidebarMenu: SidebarMenu;
    public menuItems: MenuItem[] = [];
    public buttons = [];
    public fabTogglerState = 'inactive';

    @Output() public menuItemActionEvent = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
        this.menuItems = this.sidebarMenu.speedDialMenuItems;
    }

    showItems() {
        this.fabTogglerState = 'active';
        this.buttons = this.menuItems;
    }

    hideItems() {
        this.fabTogglerState = 'inactive';
        this.buttons = [];
    }

    onToggleFab() {
        this.buttons.length ? this.hideItems() : this.showItems();
    }
}

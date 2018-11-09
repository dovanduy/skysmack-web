import { Component, Input, OnInit } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { SidebarMenu } from './../../../models/sidebar-menu/sidebar-menu';

// https://medium.com/@webdev_aaron/fab-speed-dial-with-angular-5-2-angular-material-be696fc14967
@Component({
    selector: 'ss-speed-dial-fab',
    templateUrl: './speed-dial-fab.component.html',
    styleUrls: ['./speed-dial-fab.component.scss'],
    animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {
    @Input() public sidebarMenu: SidebarMenu;
    fabButtons = [];
    buttons = [];
    fabTogglerState = 'inactive';

    constructor() { }

    ngOnInit(): void {
        if (this.sidebarMenu) {
            this.fabButtons = this.sidebarMenu.speedDialMenu;
        }
    }

    showItems() {
        this.fabTogglerState = 'active';
        this.buttons = this.fabButtons;
    }

    hideItems() {
        this.fabTogglerState = 'inactive';
        this.buttons = [];
    }

    onToggleFab() {
        this.buttons.length ? this.hideItems() : this.showItems();
    }
}

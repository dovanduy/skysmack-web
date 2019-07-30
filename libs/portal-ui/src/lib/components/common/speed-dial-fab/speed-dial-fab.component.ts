import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { SidebarMenu } from './../../../models/sidebar-menu/sidebar-menu';
import { MenuItem, MenuAreaItems } from '@skysmack/framework';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgMenuProviders } from '../../../navigation/ng-menu-providers';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

// https://medium.com/@webdev_aaron/fab-speed-dial-with-angular-5-2-angular-material-be696fc14967
@Component({
    selector: 'ss-speed-dial-fab',
    templateUrl: './speed-dial-fab.component.html',
    styleUrls: ['./speed-dial-fab.component.scss'],
    animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {
    @Input() public sidebarMenu: SidebarMenu;
    @Input() public componentKey: string;
    public menuItems$: BehaviorSubject<MenuItem[]>;;
    public buttons$: BehaviorSubject<MenuItem[]>;
    public fabTogglerState = 'inactive';

    @Output() public menuItemActionEvent = new EventEmitter<any>();

    public menuAreaItems$: Observable<MenuAreaItems[]>;

    constructor(
        public router: Router,
        public ngMenuProviders: NgMenuProviders) { }

    ngOnInit(): void {
        this.menuItems$ = this.sidebarMenu.speedDialMenuItems$;

        const packagePath = this.router.url.split('/')[1];
        this.menuAreaItems$ = this.ngMenuProviders.getMenuAreaItems(packagePath, this.componentKey).pipe(
            map(menuAreaItems => {
                return menuAreaItems.filter(menuAreaItem => menuAreaItem && menuAreaItem.providedIn && menuAreaItem.providedIn.includes('speedDial'));
            })
        );
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

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { MenuItem, SPEEDDIAL } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgMenuProviders } from '../../../navigation/ng-menu-providers';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

// https://medium.com/@webdev_aaron/fab-speed-dial-with-angular-5-2-angular-material-be696fc14967
@Component({
    selector: 'ss-speed-dial-fab',
    templateUrl: './speed-dial-fab.component.html',
    styleUrls: ['./speed-dial-fab.component.scss'],
    animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {
    @Input() public componentKey: string;
    public menuItems$: Observable<MenuItem[]>;;
    public fabTogglerState = 'inactive';

    @Output() public menuItemActionEvent = new EventEmitter<any>();

    constructor(
        public router: Router,
        public ngMenuProviders: NgMenuProviders) { }

    ngOnInit(): void {

        const packagePath = this.router.url.split('/')[1];
        this.menuItems$ = this.ngMenuProviders.getMenuAreaItems(packagePath, this.componentKey).pipe(
            map(menuAreaItems => {                
                return menuAreaItems.filter(area => area && area.items && area.items.length > 0).map(area => area.items.filter(item => {
                    return  item.providedIn.includes(SPEEDDIAL); })).reduce((a,b) => a.concat(b),[]);                
            })
        );
    }

    onToggleFab() {
        if (this.fabTogglerState === 'active') {
            this.fabTogglerState = 'inactive';
        } else {
            this.fabTogglerState = 'active';
        }
    }
}

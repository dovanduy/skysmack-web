import { Injectable } from '@angular/core';
import { StrIndex } from '@skysmack/framework';
import { BehaviorSubject } from 'rxjs';
import { MenuItemActionProvider } from './menu-item-action-provider';

@Injectable({ providedIn: 'root' })
export class MenuItemActionProviders {
    public providers: StrIndex<MenuItemActionProvider[]> = {};
    public providers$: BehaviorSubject<StrIndex<MenuItemActionProvider[]>> = new BehaviorSubject({});
    private register = {};

    public add(type: string, menuActionProvider: MenuItemActionProvider) {
        const registered = this.register[menuActionProvider.id];
        if (!registered) {
            if (!this.providers[type]) {
                this.providers[type] = [];
                this.providers$.next(this.providers);
            }
            this.providers[type].push(menuActionProvider);
            this.providers$.next(this.providers);
            this.register[menuActionProvider.id] = menuActionProvider.id;
        }
    }
}

import { Injectable } from '@angular/core';
import { MenuProvider, MenuArea, MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgCommercialUsersMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'COMMERCIAL_USERS.INDEX.';

    constructor(
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of(this.getUiMenuAreas());
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return of(this.getUiMenuItems());
    };

    private getUiMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    }

    private getUiMenuItems = (): MenuItem[] => {
        return [
            new MenuItem({
                url: '/users',
                displayName: this.translationPrefix + 'USERS',
                area: 'manage',
                order: 1,
                icon: 'add',
                providedIn: ['top']
            })
        ];
    }
}
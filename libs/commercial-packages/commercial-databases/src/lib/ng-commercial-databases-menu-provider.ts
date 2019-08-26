import { Injectable } from '@angular/core';
import { MenuProvider, MenuArea, MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgCommercialDatabasesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'COMMERCIAL_DATABASES.INDEX.';

    constructor(
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return of(this.getDatabasesMenuAreas());
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return of(this.getDatabasesMenuItems());
    };

    private getDatabasesMenuAreas = (): MenuArea[] => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    }

    private getDatabasesMenuItems = (): MenuItem[] => {
        return [
            new MenuItem({
                url: '/databases',
                displayName: this.translationPrefix + 'DATABASES',
                area: 'manage',
                order: 1,
                icon: 'add',
                providedIn: ['top']
            })
        ];
    }
}
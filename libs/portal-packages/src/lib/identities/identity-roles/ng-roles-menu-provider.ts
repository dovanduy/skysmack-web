import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { setBackButton, getMenuEntries } from '@skysmack/ng-framework';
import { IdentitiesTypeId } from '@skysmack/package-types';
import { RolesIndexComponent } from './components/roles-index/roles-index.component';

@Injectable({ providedIn: 'root' })
export class NgRolesMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'ROLES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, IdentitiesTypeId, componentKey, RolesIndexComponent.COMPONENT_KEY, this.getRolesMenuAreas(), this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, IdentitiesTypeId, componentKey, RolesIndexComponent.COMPONENT_KEY, this.getRolesMenuItems(), this.store);
    };

    public getRolesMenuAreas() {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    };

    public getRolesMenuItems() {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    //??
                ],
                providedIn: ['sidebar', 'speedDial']
            })
        ];
        //.pipe(setBackButton({ customPath: '/identities' }));
    };
}
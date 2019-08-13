import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { PackagesPermissions } from '@skysmack/ng-packages';
import { getMenuEntries } from '@skysmack/ng-framework';
import { PackagesTypeId } from '@skysmack/package-types';
import { PackagesIndexComponent } from './components/packages-index/packages-index.component';

@Injectable({ providedIn: 'root' })
export class NgPackagesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'PACKAGES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, PackagesTypeId, componentKey, PackagesIndexComponent.COMPONENT_KEY, this.getPackagesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, PackagesTypeId, componentKey, PackagesIndexComponent.COMPONENT_KEY, this.getPackagesMenuItems, this.store);
    };


    public getPackagesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ];
    };

    public getPackagesMenuItems = () => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    PackagesPermissions.addPackages
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            })
        ];
    };
}
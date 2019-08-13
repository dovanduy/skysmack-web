import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { IdentitiesTypeId } from '@skysmack/package-types';
import { ApplicationsIndexComponent } from './components/applications-index/applications-index.component';

@Injectable({ providedIn: 'root' })
export class NgApplicationsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'APPLICATIONS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, IdentitiesTypeId, componentKey, ApplicationsIndexComponent.COMPONENT_KEY, this.getApplicationsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, IdentitiesTypeId, componentKey, ApplicationsIndexComponent.COMPONENT_KEY, this.getApplicationsMenuItems, this.store);
    };

    public getApplicationsMenuAreas = () => {
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

    public getApplicationsMenuItems = (packagePath: string): MenuItem[] => {
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
                providedIn: ['sidebar', SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
}
import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { LodgingsPermissions } from '@skysmack/packages-lodgings';
import { getMenuEntries } from '@skysmack/ng-framework';
import { LodgingsTypeId } from '@skysmack/package-types';
import { LodgingsIndexComponent } from './components/lodgings-index/lodgings-index.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'LODGINGS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, LodgingsTypeId, componentKey, LodgingsIndexComponent.COMPONENT_KEY, this.getLodgingsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, LodgingsTypeId, componentKey, LodgingsIndexComponent.COMPONENT_KEY, this.getLodgingsMenuItems, this.store);
    };

    private getLodgingsMenuAreas = () => {
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
            }),
        ];
    };

    private getLodgingsMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    LodgingsPermissions.addLodgings
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'types',
                displayName: this.translationPrefix + 'TYPES',
                area: 'manage',
                order: 1,
                icon: 'description',
                permissions: [
                    LodgingsPermissions.findLodgingTypes
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.translationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    LodgingsPermissions.findLodgingFields
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: '/' + packagePath + '/availability',
                displayName: this.translationPrefix + 'AVAILABILITY',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            })
        ];
    };
}
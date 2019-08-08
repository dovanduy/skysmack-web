import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { LodgingsPermissions } from '@skysmack/packages-lodgings';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { LodgingsTypeId } from '@skysmack/package-types';
import { LodgingTypesIndexComponent } from './components/lodging-types-index/lodging-types-index.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'LODGING_TYPES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, LodgingsTypeId, componentKey, LodgingTypesIndexComponent.COMPONENT_KEY, this.getLodgingTypesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, LodgingsTypeId, componentKey, LodgingTypesIndexComponent.COMPONENT_KEY, this.getLodgingTypesMenuItems, this.store);
    };


    public getLodgingTypesMenuAreas= () => {
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

    public getLodgingTypesMenuItems = (packagePath: string): MenuItem[] => {
            return [
                new MenuItem({
                    url: 'create',
                    displayName: this.translationPrefix + 'CREATE',
                    area: 'actions',
                    order: 1,
                    icon: 'add',
                    permissions: [
                        LodgingsPermissions.addLodgingTypes
                    ],
                    providedIn: ['sidebar', 'speedDial']
                }),
                new MenuItem({
                    url: 'fields',
                    displayName: this.translationPrefix + 'FIELDS',
                    area: 'manage',
                    order: 2,
                    icon: 'short_text',
                    permissions: [
                        LodgingsPermissions.addLodgingTypeFields
                    ],
                    providedIn: ['sidebar']
                }),
                new MenuItem({
                    url: '/' + packagePath + '/types/availability',
                    displayName: this.translationPrefix + 'AVAILABILITY',
                    area: 'manage',
                    order: 3,
                    icon: 'group_add',
                    permissions: [
                    ],
                    providedIn: ['sidebar']
                }),
                setBackButton(packagePath)
            ];
    };
}
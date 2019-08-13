import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { LodgingsPermissions } from '@skysmack/packages-lodgings';
import { getMenuEntries, getCombinedMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { LodgingsTypeId } from '@skysmack/package-types';
import { LodgingsIndexComponent } from './components/lodgings-index/lodgings-index.component';
import { LodgingTypesIndexComponent } from '../lodging-types/components/lodging-types-index/lodging-types-index.component';
import { LodgingsAvailabilityComponent } from './components/lodgings-availability/lodgings-availability.component';
import { LodgingTypesAvailabilityComponent } from '../lodging-types/components/lodging-types-availability/lodging-types-availability.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public LodgingTranslationPrefix = 'LODGINGS.INDEX.';
    public LodgingTypesTranslationPrefix = 'LODGING_TYPES.INDEX.';
    public LodgingAvailabilityTranslationPrefix = 'LODGINGS.INDEX.';
    public LodgingTypesAvailabilityTranslationPrefix = 'LODGINGS.INDEX.';



    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, LodgingsTypeId, componentKey, LodgingsIndexComponent.COMPONENT_KEY, this.getLodgingsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, LodgingsTypeId, componentKey, LodgingTypesIndexComponent.COMPONENT_KEY, this.getLodgingTypesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, LodgingsTypeId, componentKey, LodgingsAvailabilityComponent.COMPONENT_KEY, this.getLodgingsavailabilityMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, LodgingsTypeId, componentKey, LodgingTypesAvailabilityComponent.COMPONENT_KEY, this.getLodgingTypesavailabilityMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(packagePath, LodgingsTypeId, componentKey, LodgingsIndexComponent.COMPONENT_KEY, this.getLodgingsMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, LodgingsTypeId, componentKey, LodgingTypesIndexComponent.COMPONENT_KEY, this.getLodgingTypesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, LodgingsTypeId, componentKey, LodgingsAvailabilityComponent.COMPONENT_KEY, this.getLodgingsavailabilityMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, LodgingsTypeId, componentKey, LodgingTypesAvailabilityComponent.COMPONENT_KEY, this.getLodgingTypesavailabilityMenuItems, this.store)
        );
    };

    private getLodgingsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.LodgingTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.LodgingTranslationPrefix,
                order: 2
            }),
        ];
    };

    private getLodgingTypesMenuAreas= () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.LodgingTypesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.LodgingTypesTranslationPrefix,
                order: 2
            })
        ];
    };

    private getLodgingsavailabilityMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.LodgingAvailabilityTranslationPrefix,
                order: 2
            })
        ];
    };

    private getLodgingTypesavailabilityMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.LodgingTypesAvailabilityTranslationPrefix,
                order: 2
            })
        ];
    };

    private getLodgingsMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.LodgingTranslationPrefix + 'CREATE',
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
                displayName: this.LodgingTranslationPrefix + 'TYPES',
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
                displayName: this.LodgingTranslationPrefix + 'FIELDS',
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
                displayName: this.LodgingTranslationPrefix + 'AVAILABILITY',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            })
        ];
    };

    private getLodgingTypesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.LodgingTypesTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    LodgingsPermissions.addLodgingTypes
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'fields',
                displayName: this.LodgingTypesTranslationPrefix + 'FIELDS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                    LodgingsPermissions.addLodgingTypeFields
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: '/' + packagePath + '/types/availability',
                displayName: this.LodgingTypesTranslationPrefix + 'AVAILABILITY',
                area: 'manage',
                order: 3,
                icon: 'group_add',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            setBackButton(packagePath)
        ];
    };

    private getLodgingsavailabilityMenuItems = (packagePath: string): MenuItem[] => {
        return [
            setBackButton(packagePath)
        ]
    };

    private getLodgingTypesavailabilityMenuItems = (packagePath: string) => {
        return [
            setBackButton('/' + packagePath + '/types')
        ];
    };
}